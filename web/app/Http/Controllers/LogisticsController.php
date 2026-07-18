<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class LogisticsController extends Controller
{
    public function __construct()
    {
        // Simple middleware check in constructor or via route group
    }

    public function index()
    {
        if (!Auth::user()->is_logistics && !Auth::user()->is_admin) {
            abort(403, 'Unauthorized access.');
        }

        // Get orders that need to be packed (pending, paid)
        $orders = Order::with(['user', 'category'])
            ->whereIn('status', ['paid', 'pending'])
            ->orderBy('created_at', 'asc')
            ->get();

        // Also get recently shipped orders to show history
        $recentShipped = Order::with(['user', 'category'])
            ->whereIn('status', ['shipped', 'delivered'])
            ->orderBy('updated_at', 'desc')
            ->take(20)
            ->get();

        return Inertia::render('Logistics/Dashboard', [
            'orders' => $orders,
            'recentShipped' => $recentShipped
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        if (!Auth::user()->is_logistics && !Auth::user()->is_admin) {
            abort(403);
        }

        $request->validate([
            'tracking_id' => 'required|string|max:255',
        ]);

        $order->update([
            'status' => 'shipped',
            'tracking_id' => $request->tracking_id,
        ]);

        return back()->with('success', 'Bestellung als versendet markiert.');
    }

    public function printPacklist(Order $order)
    {
        if (!Auth::user()->is_logistics && !Auth::user()->is_admin) {
            abort(403);
        }

        $order->load(['user', 'category']);

        // A simple HTML view for printing the packlist
        return view('logistics.packlist', compact('order'));
    }
}
