<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StripeController extends Controller
{
    public function checkout(Request $request)
    {
        $planId = $request->input('plan_id');
        $categoryId = $request->input('category_id');
        $plan = Plan::findOrFail($planId);

        if (!$plan->stripe_price_id) {
            return back()->with('error', 'Dieser Plan ist noch nicht mit Stripe verknüpft.');
        }

        $checkout = $request->user()
            ->newSubscription('default', $plan->stripe_price_id)
            ->checkout([
                'success_url' => route('dashboard', ['checkout' => 'success']),
                'cancel_url' => route('prizes', ['checkout' => 'cancel']),
                'metadata' => [
                    'category_id' => $categoryId,
                    'plan_id' => $planId,
                ],
            ]);

        return Inertia::location($checkout->url);
    }

    public function portal(Request $request)
    {
        $url = $request->user()->billingPortalUrl(route('dashboard.abo'));
        return \Inertia\Inertia::location($url);
    }
}
