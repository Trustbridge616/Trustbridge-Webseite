<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Subscription;
use App\Models\Order;
use App\Models\Plan;
use App\Models\Category;
use App\Models\Commission;
use App\Models\MlmSetting;

class AdminController extends Controller
{
    public function plans()
    {
        $plans = Plan::all();
        return Inertia::render('Admin/Plans', ['plans' => $plans]);
    }

    public function storePlan(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'tier' => 'required|integer|in:1,2,3',
            'duration_months' => 'required|integer',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'stripe_price_id' => 'nullable|string',
        ]);

        Plan::updateOrCreate(
            ['id' => $request->id],
            $request->only('name', 'tier', 'duration_months', 'price', 'description', 'stripe_price_id')
        );

        return back()->with('success', 'Plan gespeichert.');
    }

    public function deletePlan(Plan $plan)
    {
        $plan->delete();
        return back()->with('success', 'Plan gelöscht.');
    }

    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_subscriptions' => Subscription::count(),
            'active_subscriptions' => Subscription::where('status', 'active')->count(),
            'total_revenue' => Order::where('status', 'paid')->orWhere('status', 'shipped')->orWhere('status', 'delivered')->sum('amount'),
        ];

        $recent_subscriptions = Subscription::with('user', 'category')->latest()->take(8)->get();
        $recent_orders = Order::with('user')->latest()->take(8)->get();

        // Chart Data (Last 30 days revenue)
        $chart_data = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $revenue = Order::whereDate('created_at', $date)
                ->whereIn('status', ['paid', 'shipped', 'delivered'])
                ->sum('amount');
            
            $chart_data[] = [
                'date' => now()->subDays($i)->format('d.m.'),
                'revenue' => $revenue
            ];
        }

        return Inertia::render('Admin/Index', [
            'stats' => $stats,
            'recent_subscriptions' => $recent_subscriptions,
            'recent_orders' => $recent_orders,
            'chart_data' => $chart_data,
        ]);
    }

    public function users()
    {
        $users = User::withCount('subscriptions')
            ->with('subscriptions')
            ->latest()
            ->get();

        return Inertia::render('Admin/Users', ['users' => $users]);
    }

    public function updateUser(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'credit_balance' => 'numeric|min:0',
            'is_admin' => 'boolean',
            'street' => 'nullable|string|max:255',
            'house_number' => 'nullable|string|max:20',
            'zip' => 'nullable|string|max:10',
            'city' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
        ]);

        $user->update($request->only('name', 'email', 'credit_balance', 'is_admin', 'street', 'house_number', 'zip', 'city', 'country'));
        return back()->with('success', 'Nutzer aktualisiert.');
    }

    public function deleteUser(User $user)
    {
        $user->delete();
        return back()->with('success', 'Nutzer gelöscht.');
    }

    public function addBonus(Request $request, User $user)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'note' => 'nullable|string|max:255',
        ]);

        $amountInCents = intval($request->amount * 100);
        $note = $request->note ?: 'Manueller Bonus vom Admin';

        // 1. If user is a Stripe Customer, apply the balance as a credit (negative amount)
        if ($user->hasStripeId()) {
            try {
                $user->applyBalance(-$amountInCents, $note);
            } catch (\Exception $e) {
                return back()->withErrors(['error' => 'Stripe Fehler: ' . $e->getMessage()]);
            }
        }

        // 2. Update local tracking (add to existing)
        $user->increment('credit_balance', $request->amount);

        // 3. Optional: Create a Commission record as an audit trail
        \App\Models\Commission::create([
            'user_id' => $user->id,
            'referral_id' => $user->id,
            'type' => 'manual_bonus',
            'amount' => $request->amount,
            'note' => $note
        ]);

        return back()->with('success', number_format($request->amount, 2, ',', '.') . ' € Bonus erfolgreich gebucht.');
    }

    public function orders()
    {
        $orders = Order::with('user', 'category')->latest()->get();
        return Inertia::render('Admin/Orders', ['orders' => $orders]);
    }

    public function updateOrderStatus(\Illuminate\Http\Request $request, Order $order)
    {
        $request->validate(['status' => 'required|in:pending,shipped,delivered,cancelled']);
        $order->update(['status' => $request->status]);
        return back()->with('success', 'Status aktualisiert.');
    }

    public function updateOrderTracking(\Illuminate\Http\Request $request, Order $order)
    {
        $oldTracking = $order->tracking_id;
        $order->update([
            'tracking_id' => $request->tracking_id,
            'status' => 'shipped'
        ]);

        // Send Email if tracking ID was added and is new
        if ($request->tracking_id && $request->tracking_id !== $oldTracking) {
            $user = $order->user;
            if ($user) {
                \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\TrackingMail($user, $order));
            }
        }

        return back()->with('success', 'Tracking aktualisiert und Kunde benachrichtigt.');
    }

    public function exportOrders()
    {
        $orders = Order::with('user', 'category')->where('status', 'pending')->get();
        
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=dhl_export_" . date('Y-m-d') . ".csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = ['Order_ID', 'Name', 'Street', 'House_No', 'Zip', 'City', 'Country', 'Category', 'Boxes'];

        $callback = function() use($orders, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns, ';');

            foreach ($orders as $order) {
                $user = $order->user;
                $plan = $order->plan;
                $boxes = $plan ? $plan->tier : 1;

                fputcsv($file, [
                    $order->id,
                    $user->name,
                    $user->street ?? 'FEHLT',
                    $user->house_number ?? '',
                    $user->zip ?? '',
                    $user->city ?? '',
                    $user->country ?? 'Deutschland',
                    $order->category?->name ?? 'Mixed',
                    $boxes
                ], ';');
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function subscriptions()
    {
        $subscriptions = Subscription::with('user', 'category')->latest()->paginate(50);
        return Inertia::render('Admin/Subscriptions', ['subscriptions' => $subscriptions]);
    }

    public function updateSubStatus(\Illuminate\Http\Request $request, Subscription $subscription)
    {
        $request->validate(['status' => 'required|in:active,cancelled,pending']);
        $subscription->update(['status' => $request->status, 'cancelled_at' => $request->status === 'cancelled' ? now() : null]);
        return back()->with('success', 'Abo-Status aktualisiert.');
    }

    public function mlm()
    {
        $referrals = User::with('sponsor', 'subscriptions')->whereNotNull('sponsor_id')->latest()->get();
        $commissions = \App\Models\Commission::with('user')->latest()->get();
        $users = User::select('id', 'name', 'email')->orderBy('name')->get();

        return Inertia::render('Admin/Mlm', [
            'referrals' => $referrals,
            'commissions' => $commissions,
            'users' => $users,
        ]);
    }

    public function bookProvision(\Illuminate\Http\Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'amount' => 'integer|min:1|max:10',
        ]);

        $count = $request->amount ?? 1;
        for ($i = 0; $i < $count; $i++) {
            \App\Models\Commission::create([
                'user_id' => $request->user_id,
                'referral_id' => $request->user_id,
                'type' => 'free_package',
                'amount' => 0,
                'note' => $request->note ?? 'Testprovision vom Admin',
            ]);
        }

        return back()->with('success', "{$count} Provision(en) erfolgreich eingebucht.");
    }

    // ── KATEGORIEN ─────────────────────────────────────────────────────────

    public function categories()
    {
        $categories = Category::withCount(['subscriptions', 'orders'])
            ->orderBy('sort_order')
            ->get();
        return Inertia::render('Admin/Categories', ['categories' => $categories]);
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:100',
            'description' => 'nullable|string',
            'base_price'  => 'required|numeric|min:0',
            'sort_order'  => 'integer|min:0',
            'is_active'   => 'boolean',
        ]);

        $data = $request->only('name', 'description', 'base_price', 'sort_order', 'is_active', 'image_url');
        $data['slug'] = Str::slug($request->name);

        if ($request->id) {
            $cat = Category::findOrFail($request->id);
            $cat->update($data);
        } else {
            Category::create($data);
        }

        return back()->with('success', 'Kategorie gespeichert.');
    }

    public function deleteCategory(Category $category)
    {
        $category->delete();
        return back()->with('success', 'Kategorie gelöscht.');
    }

    // ── MLM SETTINGS ───────────────────────────────────────────────────────

    public function mlmSettings()
    {
        $settings = MlmSetting::orderBy('key')->get();
        $referrals  = User::with('sponsor', 'subscriptions')->whereNotNull('sponsor_id')->latest()->get();
        $commissions = Commission::with('user')->latest()->get();
        $users = User::select('id', 'name', 'email')->orderBy('name')->get();

        return Inertia::render('Admin/Mlm', [
            'settings'    => $settings,
            'referrals'   => $referrals,
            'commissions' => $commissions,
            'users'       => $users,
        ]);
    }

    public function saveMlmSettings(Request $request)
    {
        $request->validate([
            'settings'        => 'required|array',
            'settings.*.key'  => 'required|string',
            'settings.*.value'=> 'nullable',
        ]);

        foreach ($request->settings as $s) {
            MlmSetting::set($s['key'], $s['value']);
        }

        return back()->with('success', 'MLM-Einstellungen gespeichert.');
    }
}

