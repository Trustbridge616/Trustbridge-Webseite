<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Cashier\Http\Controllers\WebhookController as CashierController;
use App\Models\User;
use App\Models\Order;
use App\Models\Plan;
use Illuminate\Support\Facades\Log;
use App\Mail\WelcomeMail;
use App\Mail\OrderPaidMail;
use Illuminate\Support\Facades\Mail;

class StripeWebhookController extends CashierController
{
    /**
     * Handle checkout session completed.
     * We use this to save the initial category_id to the subscription.
     */
    protected function handleCheckoutSessionCompleted(array $payload)
    {
        $session = $payload['data']['object'];
        $categoryId = $session['metadata']['category_id'] ?? null;
        $planId = $session['metadata']['plan_id'] ?? null;
        $stripeSubscriptionId = $session['subscription'] ?? null;

        Log::info("Webhook checkout.session.completed received for Sub: {$stripeSubscriptionId}");

        if ($stripeSubscriptionId) {
            $subscription = \App\Models\Subscription::where('stripe_id', $stripeSubscriptionId)->first();
            
            if (!$subscription) {
                Log::warning("Subscription {$stripeSubscriptionId} not found in DB yet. Waiting for customer.subscription.created...");
                // In some cases, checkout.session.completed arrives before the subscription is in our DB.
                // We could retry or just let customer.subscription.created handle basic setup.
                // But usually metadata is only in the session.
                return $this->successMethod();
            }

            try {
                // Find plan
                $plan = Plan::find($planId);
                if (!$plan && isset($session['subscription_details']['metadata']['price_id'])) {
                    $plan = Plan::where('stripe_price_id', $session['subscription_details']['metadata']['price_id'])->first();
                }
                
                // Get Stripe Subscription for next billing date
                $stripeSub = $this->stripe->subscriptions->retrieve($stripeSubscriptionId);
                
                $nextBillingTimestamp = $stripeSub->current_period_end ?? ($stripeSub->trial_end ?? now()->addMonth()->timestamp);
                $nextBillingDate = \Carbon\Carbon::createFromTimestamp($nextBillingTimestamp);

                $subscription->update([
                    'category_id' => $categoryId,
                    'plan_id' => $plan?->id ?? $planId,
                    'duration_months' => $plan?->duration_months ?? 1,
                    'amount' => $plan?->price ?? ($session['amount_total'] / 100),
                    'status' => 'active',
                    'next_billing_date' => $nextBillingDate
                ]);

                Log::info("Subscription {$stripeSubscriptionId} updated: Plan " . ($plan?->id ?? 'N/A') . ", Category {$categoryId}, Next Billing: {$nextBillingDate}");
                
                // Send Welcome Mail
                $user = User::where('stripe_id', $session['customer'])->first();
                $category = \App\Models\Category::find($categoryId);
                if ($user) {
                    try {
                        Mail::to($user->email)->send(new WelcomeMail($user, $subscription, $category));
                        Log::info("Welcome mail sent to {$user->email}");
                    } catch (\Exception $e) {
                        Log::error("Failed to send welcome mail: " . $e->getMessage());
                    }
                }
            } catch (\Exception $e) {
                Log::error("Error processing checkout.session.completed: " . $e->getMessage());
            }
        }

        return $this->successMethod();
    }

    /**
     * Handle invoice payment succeeded.
     * This is where we create the physical order for shipping.
     */
    protected function handleInvoicePaymentSucceeded(array $payload)
    {
        $invoice = $payload['data']['object'];
        $stripeCustomer = $invoice['customer'];
        $stripeSubscriptionId = $invoice['subscription'] ?? null;
        
        $user = User::where('stripe_id', $stripeCustomer)->first();

        Log::info("Webhook invoice.payment_succeeded received for User: " . ($user->id ?? 'Unknown') . ", Sub: {$stripeSubscriptionId}");

        if ($user) {
            $amount = $invoice['amount_paid'] / 100;
            
            // Try to find the category and plan from the subscription
            $categoryId = null;
            $planId = null;
            $boxes = 1;
            
            if ($stripeSubscriptionId) {
                $sub = \App\Models\Subscription::where('stripe_id', $stripeSubscriptionId)->first();
                
                try {
                    // Sync next billing date from stripe
                    $stripeSub = $this->stripe->subscriptions->retrieve($stripeSubscriptionId);
                    $nextBillingTimestamp = $stripeSub->current_period_end ?? ($stripeSub->trial_end ?? now()->addMonth()->timestamp);
                    $nextBillingDate = \Carbon\Carbon::createFromTimestamp($nextBillingTimestamp);

                    if ($sub) {
                        $sub->update([
                            'next_billing_date' => $nextBillingDate
                        ]);
                        $categoryId = $sub->category_id;
                        $planId = $sub->plan_id;
                        
                        if ($planId) {
                            $plan = Plan::find($planId);
                            $boxes = $plan?->tier ?? 1;
                        }
                    }
                } catch (\Exception $e) {
                    Log::error("Failed to sync next_billing_date in invoice.payment_succeeded: " . $e->getMessage());
                }
            }

            // Handle Referral Logic (Only on first payment / subscription creation)
            $billingReason = $invoice['billing_reason'] ?? '';
            if ($billingReason === 'subscription_create') {
                try {
                    $commissionService = new \App\Services\CommissionService();
                    $commissionService->distribute($user, $amount);
                } catch (\Exception $e) {
                    Log::error("Failed to distribute commission: " . $e->getMessage());
                }
            }

            // Create the order for the monthly package
            try {
                $order = Order::create([
                    'user_id' => $user->id,
                    'category_id' => $categoryId,
                    'plan_id' => $planId,
                    'amount' => $amount,
                    'status' => 'paid',
                    'type' => 'subscription_package',
                    'note' => "Automatisches Paket aus Abo ({$boxes} Boxen)"
                ]);

                // Send confirmation mail
                try {
                    Mail::to($user->email)->send(new OrderPaidMail($user, $order));
                } catch (\Exception $e) {
                    Log::error("Failed to send order paid mail: " . $e->getMessage());
                }

                Log::info("Order #{$order->id} created with {$boxes} boxes for user {$user->id}");
            } catch (\Exception $e) {
                Log::error("Failed to create order in invoice.payment_succeeded: " . $e->getMessage());
            }
        }

        return $this->successMethod();
    }

    /**
     * Handle subscription deleted (cancelled).
     */
    protected function handleCustomerSubscriptionDeleted(array $payload)
    {
        $stripeCustomer = $payload['data']['object']['customer'];
        $user = User::where('stripe_id', $stripeCustomer)->first();

        if ($user) {
            Log::info("Subscription for user {$user->id} was cancelled in Stripe.");
        }

        return parent::handleCustomerSubscriptionDeleted($payload);
    }
}
