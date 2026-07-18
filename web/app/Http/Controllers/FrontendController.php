<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Subscription;
use App\Models\Payment;
use App\Models\PaypalAccount;
use App\Services\PaypalService;
use App\Services\CommissionService;
use Illuminate\Support\Facades\Log;

class FrontendController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome');
    }

    public function prizes()
    {
        $plans = \App\Models\Plan::all();
        $categories = Category::where('is_active', true)->orderBy('sort_order')->get();
        return Inertia::render('Prizes', [
            'plans' => $plans,
            'categories' => $categories
        ]);
    }

    public function categories()
    {
        $categories = Category::where('is_active', true)->orderBy('sort_order')->get();
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function categoryShow(Category $category)
    {
        return Inertia::render('Categories/Show', [
            'category' => $category
        ]);
    }

    public function checkout(Request $request, Category $category, \App\Services\DhlService $dhl)
    {
        $duration = $request->input('duration', 1);
        $plan = \App\Models\Plan::where('duration_months', $duration)->first();
        
        if (!$plan) {
            return back()->withErrors(['error' => 'Plan nicht gefunden.']);
        }

        // Mock-User erstellen falls nicht eingeloggt
        $user = auth()->user() ?? \App\Models\User::find(2);

        $order = \App\Models\Order::create([
            'user_id' => $user->id,
            'amount' => $plan->price,
            'status' => 'pending'
        ]);

        $checkout = $user->newSubscription('default', $plan->stripe_price_id)
            ->checkout([
                'success_url' => route('stripe.success', ['order' => $order->id]) . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('home'),
            ]);

        return Inertia::location($checkout->url);
    }

    public function stripeSuccess(Request $request, \App\Models\Order $order, \App\Services\DhlService $dhl)
    {
        $sessionId = $request->get('session_id');
        if (!$sessionId) {
            return redirect()->route('home');
        }

        if ($order->status === 'pending') {
            $dhlData = $dhl->createShipment(['order_id' => $order->id]);
            
            $order->update([
                'status' => 'paid',
                'tracking_id' => $dhlData['tracking_id']
            ]);

            $subscription = \Laravel\Cashier\Subscription::where('user_id', $order->user_id)->latest()->first();
            if ($subscription) {
                $order->update(['subscription_id' => $subscription->id]);
            }
        }

        return redirect()->route('dashboard')->with('success', 'Abo erfolgreich abgeschlossen! DHL Tracking: ' . $order->tracking_id);
    }
}
