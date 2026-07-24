<?php

use App\Http\Controllers\FrontendController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/categories', [FrontendController::class, 'categories'])->name('categories.index');
Route::get('/categories/{category}', [FrontendController::class, 'categoryShow'])->name('categories.show');
Route::post('/checkout/{category}', [FrontendController::class, 'checkout'])->name('checkout');
Route::get('/checkout/success/{order}', [FrontendController::class, 'stripeSuccess'])->name('stripe.success');

// Öffentliche Seiten
Route::get('/about', fn() => Inertia::render('About'))->name('about');
Route::get('/how-it-works', fn() => Inertia::render('HowItWorks'))->name('how-it-works');
Route::get('/unsere-ware', fn() => Inertia::render('UnsereWare'))->name('unsere-ware');
Route::get('/prizes', [FrontendController::class, 'prizes'])->name('prizes');
Route::get('/faq', fn() => Inertia::render('Faq'))->name('faq');
Route::get('/partner', fn() => Inertia::render('Partner'))->name('partner');
Route::get('/kontakt', fn() => Inertia::render('Kontakt'))->name('kontakt');

// Interner Builder (noindex)
Route::get('/builder/instagram', fn() => Inertia::render('Builder/InstagramGrundfoto'))->name('builder.instagram');
Route::post('/builder/ai', [\App\Http\Controllers\BuilderAiController::class, 'generate'])->name('builder.ai');
Route::get('/builder/backgrounds', function () {
    $dir = public_path('assets/trustbridge/builder/backgrounds');
    if (!is_dir($dir)) {
        return response()->json([]);
    }
    $files = collect(scandir($dir))
        ->filter(fn($f) => preg_match('/\.(jpe?g|png|webp)$/i', $f))
        ->sort()
        ->values()
        ->map(function ($f) {
            $base = pathinfo($f, PATHINFO_FILENAME);
            // Optionaler vertikaler Fokus im Dateinamen: "wald-1~20.jpg" => 0.20
            // (0 = Oberkante des Motivs bleibt erhalten, 100 = Unterkante,
            //  ohne Angabe 0.5 = mittiger Cover-Zuschnitt)
            $focus = 0.5;
            if (preg_match('/^(.*)~(\d{1,3})$/', $base, $m)) {
                $base = $m[1];
                $focus = min(100, max(0, (int) $m[2])) / 100;
            }
            return [
                'src'   => '/assets/trustbridge/builder/backgrounds/' . $f,
                'name'  => ucwords(str_replace(['-', '_'], ' ', $base)),
                'focus' => $focus,
            ];
        });
    return response()->json($files);
})->name('builder.backgrounds');

// Legal
Route::get('/impressum', fn() => Inertia::render('Legal/Impressum'))->name('impressum');
Route::get('/datenschutz', fn() => Inertia::render('Legal/Datenschutz'))->name('datenschutz');
Route::get('/agb', fn() => Inertia::render('Legal/Agb'))->name('agb');
Route::get('/widerruf', fn() => Inertia::render('Legal/Widerruf'))->name('widerruf');

Route::get('/register', [\App\Http\Controllers\AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->name('logout');

Route::get('/login', function() {
    return Inertia::render('Auth/Login');
})->name('login');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login.post');

Route::get('/login-dev', function(\Illuminate\Http\Request $request) {
    $id = $request->input('id', 2);
    \Illuminate\Support\Facades\Auth::loginUsingId($id);
    return redirect()->route('dashboard');
});

// Stripe Checkout
Route::post('/stripe/checkout', [\App\Http\Controllers\StripeController::class, 'checkout'])->name('stripe.checkout')->middleware('auth');
Route::post('/stripe/webhook', [\App\Http\Controllers\StripeWebhookController::class, 'handleWebhook'])->name('stripe.webhook');
Route::get('/stripe/portal', [\App\Http\Controllers\StripeController::class, 'portal'])->name('stripe.portal')->middleware('auth');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::patch('/subscriptions/{subscription}/category', [DashboardController::class, 'updateCategory'])->name('subscriptions.updateCategory');
    Route::get('/dashboard/abo', [DashboardController::class, 'abo'])->name('dashboard.abo');
    Route::get('/dashboard/bestellungen', [DashboardController::class, 'bestellungen'])->name('dashboard.bestellungen');
    Route::get('/dashboard/rechnungen', [DashboardController::class, 'rechnungen'])->name('dashboard.rechnungen');
    Route::get('/dashboard/profil', [DashboardController::class, 'profil'])->name('dashboard.profil');
    Route::post('/dashboard/profil', [DashboardController::class, 'updateProfil'])->name('dashboard.profil.update');
    Route::get('/dashboard/partner', [DashboardController::class, 'partner'])->name('dashboard.partner');
    Route::post('/dashboard/partner/cancel-abo/{id}', [DashboardController::class, 'cancelAbo'])->name('dashboard.abo.cancel');
    Route::post('/dashboard/partner/free-package', [DashboardController::class, 'orderFreePackage'])->name('dashboard.free-package');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [\App\Http\Controllers\AdminController::class, 'index'])->name('index');
        Route::get('/users', [\App\Http\Controllers\AdminController::class, 'users'])->name('users');
        Route::put('/users/{user}', [\App\Http\Controllers\AdminController::class, 'updateUser'])->name('users.update');
        Route::post('/users/{user}/bonus', [\App\Http\Controllers\AdminController::class, 'addBonus'])->name('users.bonus');
        Route::delete('/users/{user}', [\App\Http\Controllers\AdminController::class, 'deleteUser'])->name('users.delete');
        Route::get('/orders', [\App\Http\Controllers\AdminController::class, 'orders'])->name('orders');
        Route::get('/orders/export', [\App\Http\Controllers\AdminController::class, 'exportOrders'])->name('orders.export');
        Route::patch('/orders/{order}/status', [\App\Http\Controllers\AdminController::class, 'updateOrderStatus'])->name('orders.status');
        Route::patch('/orders/{order}/tracking', [\App\Http\Controllers\AdminController::class, 'updateOrderTracking'])->name('orders.tracking');
        Route::get('/subscriptions', [\App\Http\Controllers\AdminController::class, 'subscriptions'])->name('subscriptions');
        Route::patch('/subscriptions/{subscription}/status', [\App\Http\Controllers\AdminController::class, 'updateSubStatus'])->name('subscriptions.status');
        Route::get('/mlm', [\App\Http\Controllers\AdminController::class, 'mlm'])->name('mlm');
        Route::post('/mlm/provision', [\App\Http\Controllers\AdminController::class, 'bookProvision'])->name('mlm.provision');
        
        Route::get('/plans', [\App\Http\Controllers\AdminController::class, 'plans'])->name('plans');
        Route::post('/plans', [\App\Http\Controllers\AdminController::class, 'storePlan'])->name('plans.store');
        Route::delete('/plans/{plan}', [\App\Http\Controllers\AdminController::class, 'deletePlan'])->name('plans.delete');

        // Categories
        Route::get('/categories', [\App\Http\Controllers\AdminController::class, 'categories'])->name('categories');
        Route::post('/categories', [\App\Http\Controllers\AdminController::class, 'storeCategory'])->name('categories.store');
        Route::delete('/categories/{category}', [\App\Http\Controllers\AdminController::class, 'deleteCategory'])->name('categories.delete');

        // MLM Settings
        Route::get('/mlm', [\App\Http\Controllers\AdminController::class, 'mlmSettings'])->name('mlm');
        Route::post('/mlm/provision', [\App\Http\Controllers\AdminController::class, 'bookProvision'])->name('mlm.provision');
        Route::post('/mlm/settings', [\App\Http\Controllers\AdminController::class, 'saveMlmSettings'])->name('mlm.settings');
    });
    Route::prefix('logistics')->name('logistics.')->group(function () {
        Route::get('/', [\App\Http\Controllers\LogisticsController::class, 'index'])->name('index');
        Route::patch('/orders/{order}/status', [\App\Http\Controllers\LogisticsController::class, 'updateStatus'])->name('orders.status');
        Route::get('/orders/{order}/packlist', [\App\Http\Controllers\LogisticsController::class, 'printPacklist'])->name('orders.packlist');
    });
});

Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index']);

Route::get('/seed-orders', function () {
    $user = \App\Models\User::first() ?? \App\Models\User::factory()->create();
    \App\Models\Order::create(['user_id' => $user->id, 'amount' => 55.99, 'status' => 'paid', 'category_id' => 1, 'is_free' => false]);
    \App\Models\Order::create(['user_id' => $user->id, 'amount' => 0, 'status' => 'paid', 'category_id' => 2, 'is_free' => true]);
    \App\Models\Order::create(['user_id' => $user->id, 'amount' => 99.99, 'status' => 'pending', 'category_id' => 3, 'is_free' => false]);
    return 'Orders seeded';
});
