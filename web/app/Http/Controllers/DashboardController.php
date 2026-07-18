<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\Commission;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $user->load([
            'subscriptions.category', 
            'referrals' => fn($q) => $q->withCount('subscriptions')
        ]);
        $orders = \App\Models\Order::where('user_id', $user->id)->with('category')->latest()->get();
        $categories = \App\Models\Category::all();

        return Inertia::render('Dashboard/Index', [
            'user' => $user,
            'orders' => $orders,
            'categories' => $categories
        ]);
    }

    public function updateCategory(\Illuminate\Http\Request $request, \App\Models\Subscription $subscription)
    {
        // Ensure user owns the subscription
        if ($subscription->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate(['category_id' => 'required|exists:categories,id']);
        
        $subscription->update(['category_id' => $request->category_id]);

        return back()->with('success', 'Paket-Kategorie erfolgreich geändert.');
    }

    public function abo()
    {
        $user = Auth::user()->load('subscriptions.category');
        return Inertia::render('Dashboard/Abo', ['user' => $user]);
    }

    public function bestellungen()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->latest()->get();
        return Inertia::render('Dashboard/Bestellungen', ['orders' => $orders, 'user' => $user]);
    }

    public function rechnungen()
    {
        $user = Auth::user();
        $invoices = [];
        try {
            if ($user->hasStripeId()) {
                $invoices = $user->invoices()->map(fn($inv) => [
                    'id' => $inv->id, 'date' => $inv->date()->toFormattedDateString(),
                    'total' => $inv->total(), 'url' => $inv->hosted_invoice_url,
                ]);
            }
        } catch (\Exception $e) {}
        return Inertia::render('Dashboard/Rechnungen', ['invoices' => $invoices, 'user' => $user]);
    }

    public function profil()
    {
        $user = Auth::user();
        return Inertia::render('Dashboard/Profil', ['user' => $user]);
    }

    public function partner()
    {
        $user = Auth::user()->load('referrals.subscriptions');
        $commissions = Commission::where('user_id', $user->id)->with('referral')->latest()->get();
        
        // Gratis-Pakete: Anzahl verdient
        $freePackagesEarned = $commissions->where('type', 'free_package')->count();
        $freePackagesUsed = Order::where('user_id', $user->id)->where('is_free', true)->count();

        return Inertia::render('Dashboard/Partner', [
            'user' => $user,
            'commissions' => $commissions,
            'free_packages_earned' => $freePackagesEarned,
            'free_packages_used' => $freePackagesUsed,
        ]);
    }

    public function updateProfil(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'street' => 'nullable|string|max:255',
            'house_number' => 'nullable|string|max:20',
            'zip' => 'nullable|string|max:10',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
        ]);

        $user->update($request->only('name', 'email', 'street', 'house_number', 'zip', 'city', 'country'));
        
        return back()->with('success', 'Profil aktualisiert.');
    }

    public function cancelAbo(Request $request, $id)
    {
        $sub = \App\Models\Subscription::where('user_id', Auth::id())->findOrFail($id);
        
        // Cancel in Stripe (at end of period)
        $sub->cancel(); 

        // Update our local custom status if needed, 
        // though Cashier handles 'ends_at' automatically.
        $sub->update(['status' => 'cancelled']);

        return back()->with('success', 'Abo wurde erfolgreich zum Ende der Laufzeit gekündigt.');
    }

    public function orderFreePackage(Request $request)
    {
        $user = Auth::user();
        // Prüfen ob Gratis-Pakete verfügbar
        $earned = Commission::where('user_id', $user->id)->where('type', 'free_package')->count();
        $used = Order::where('user_id', $user->id)->where('is_free', true)->count();

        if ($used >= $earned) {
            return back()->withErrors(['error' => 'Keine Gratis-Pakete verfügbar.']);
        }

        Order::create([
            'user_id' => $user->id,
            'amount' => 0,
            'status' => 'pending',
            'is_free' => true,
            'category_id' => $request->category_id ?? null,
        ]);

        return back()->with('success', 'Gratis-Paket bestellt! Wir bereiten deine Sendung vor.');
    }
}
