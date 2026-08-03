<?php

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BuilderAiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\LogisticsController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\SocialDocumentController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\StripeWebhookController;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/categories', [FrontendController::class, 'categories'])->name('categories.index');
Route::get('/categories/{category}', [FrontendController::class, 'categoryShow'])->name('categories.show');
Route::post('/checkout/{category}', [FrontendController::class, 'checkout'])->name('checkout');
Route::get('/checkout/success/{order}', [FrontendController::class, 'stripeSuccess'])->name('stripe.success');

// Öffentliche Seiten
Route::get('/about', fn () => Inertia::render('About'))->name('about');
Route::get('/how-it-works', fn () => Inertia::render('HowItWorks'))->name('how-it-works');
Route::get('/unsere-ware', fn () => Inertia::render('UnsereWare'))->name('unsere-ware');
Route::get('/prizes', [FrontendController::class, 'prizes'])->name('prizes');
Route::get('/faq', fn () => Inertia::render('Faq'))->name('faq');
Route::get('/partner', fn () => Inertia::render('Partner'))->name('partner');
Route::get('/kontakt', fn () => Inertia::render('Kontakt'))->name('kontakt');

// Fitness-Coaching-Landingpage (Kundenprojekt Alexander Tischler, eigenständiges Design)
Route::get('/alextischler.de', fn () => Inertia::render('AlexTischler'))->name('alextischler');
// Kundenbereich (Demo: Login + Dashboard mit Testdaten, Auth rein clientseitig)
Route::get('/alextischler.de/login', fn () => Inertia::render('AlexTischler/Login'))->name('alextischler.login');
Route::get('/alextischler.de/dashboard', fn () => Inertia::render('AlexTischler/Dashboard'))->name('alextischler.dashboard');
// Alter Link nicht brechen
Route::redirect('/airwallex', '/alextischler.de');

// Interner Builder (noindex)
Route::get('/builder/instagram', fn () => Inertia::render('Builder/InstagramGrundfoto'))->name('builder.instagram');

// Social Media Studio — Master-Content → alle Plattformen
Route::get('/social', fn () => Inertia::render('Builder/Social', ['tab' => 'master']))->name('social');
Route::get('/social/{tab}', function (string $tab) {
    $allowed = ['master', 'instagram', 'tiktok', 'facebook', 'alle', 'publishing'];
    abort_unless(in_array($tab, $allowed, true), 404);

    return Inertia::render('Builder/Social', ['tab' => $tab]);
})->where('tab', '[a-z]+')->name('social.tab');
// Bestehende Links nicht brechen
Route::redirect('/instagram', '/social/instagram');
Route::redirect('/social/export', '/social/alle');
Route::redirect('/builder/social', '/social');

// Social-API: Dokumente + Publishing-Vorbereitung (CSRF über Web-Session)
Route::prefix('api/social')->name('social.api.')->group(function () {
    Route::post('/documents', [SocialDocumentController::class, 'store'])->name('documents.store');
    Route::get('/documents/{id}', [SocialDocumentController::class, 'show'])->name('documents.show');
    Route::patch('/documents/{id}', [SocialDocumentController::class, 'update'])->name('documents.update');
    Route::post('/documents/{id}/render', [SocialDocumentController::class, 'render'])->name('documents.render');
    Route::get('/documents/{id}/render-status', [SocialDocumentController::class, 'renderStatus'])->name('documents.render-status');
    Route::post('/documents/{id}/publish', [SocialDocumentController::class, 'publish'])->name('documents.publish');
    Route::post('/documents/{id}/schedule', [SocialDocumentController::class, 'schedule'])->name('documents.schedule');
    Route::get('/documents/{id}/publish-status', [SocialDocumentController::class, 'publishStatus'])->name('documents.publish-status');
    Route::get('/connections', [SocialDocumentController::class, 'connections'])->name('connections');
});
Route::post('/builder/ai', [BuilderAiController::class, 'generate'])->name('builder.ai');
Route::get('/builder/backgrounds', function () {
    $dir = public_path('assets/trustbridge/builder/backgrounds');
    if (! is_dir($dir)) {
        return response()->json([]);
    }
    $files = collect(scandir($dir))
        ->filter(fn ($f) => preg_match('/\.(jpe?g|png|webp)$/i', $f))
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
                'src' => '/assets/trustbridge/builder/backgrounds/'.$f,
                'name' => ucwords(str_replace(['-', '_'], ' ', $base)),
                'focus' => $focus,
            ];
        });

    return response()->json($files);
})->name('builder.backgrounds');

// Legal
Route::get('/impressum', fn () => Inertia::render('Legal/Impressum'))->name('impressum');
Route::get('/datenschutz', fn () => Inertia::render('Legal/Datenschutz'))->name('datenschutz');
Route::get('/agb', fn () => Inertia::render('Legal/Agb'))->name('agb');
Route::get('/widerruf', fn () => Inertia::render('Legal/Widerruf'))->name('widerruf');

Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');

// Debug-Login nur in der lokalen Umgebung (in Produktion wäre das ein Auth-Bypass)
if (app()->environment('local')) {
    Route::get('/login-dev', function (Request $request) {
        $id = $request->input('id', 2);
        Auth::loginUsingId($id);

        return redirect()->route('dashboard');
    });
}

// Stripe Checkout
Route::post('/stripe/checkout', [StripeController::class, 'checkout'])->name('stripe.checkout')->middleware('auth');
Route::post('/stripe/webhook', [StripeWebhookController::class, 'handleWebhook'])->name('stripe.webhook');
Route::get('/stripe/portal', [StripeController::class, 'portal'])->name('stripe.portal')->middleware('auth');

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

    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/', [AdminController::class, 'index'])->name('index');
        Route::get('/users', [AdminController::class, 'users'])->name('users');
        Route::put('/users/{user}', [AdminController::class, 'updateUser'])->name('users.update');
        Route::post('/users/{user}/bonus', [AdminController::class, 'addBonus'])->name('users.bonus');
        Route::delete('/users/{user}', [AdminController::class, 'deleteUser'])->name('users.delete');
        Route::get('/orders', [AdminController::class, 'orders'])->name('orders');
        Route::get('/orders/export', [AdminController::class, 'exportOrders'])->name('orders.export');
        Route::patch('/orders/{order}/status', [AdminController::class, 'updateOrderStatus'])->name('orders.status');
        Route::patch('/orders/{order}/tracking', [AdminController::class, 'updateOrderTracking'])->name('orders.tracking');
        Route::get('/subscriptions', [AdminController::class, 'subscriptions'])->name('subscriptions');
        Route::patch('/subscriptions/{subscription}/status', [AdminController::class, 'updateSubStatus'])->name('subscriptions.status');
        Route::get('/mlm', [AdminController::class, 'mlm'])->name('mlm');
        Route::post('/mlm/provision', [AdminController::class, 'bookProvision'])->name('mlm.provision');

        Route::get('/plans', [AdminController::class, 'plans'])->name('plans');
        Route::post('/plans', [AdminController::class, 'storePlan'])->name('plans.store');
        Route::delete('/plans/{plan}', [AdminController::class, 'deletePlan'])->name('plans.delete');

        // Categories
        Route::get('/categories', [AdminController::class, 'categories'])->name('categories');
        Route::post('/categories', [AdminController::class, 'storeCategory'])->name('categories.store');
        Route::delete('/categories/{category}', [AdminController::class, 'deleteCategory'])->name('categories.delete');

        // MLM Settings
        Route::get('/mlm', [AdminController::class, 'mlmSettings'])->name('mlm');
        Route::post('/mlm/provision', [AdminController::class, 'bookProvision'])->name('mlm.provision');
        Route::post('/mlm/settings', [AdminController::class, 'saveMlmSettings'])->name('mlm.settings');

        // Rechnungsbereich (Invoice Center)
        Route::prefix('rechnungen')->name('invoices.')->group(function () {
            Route::get('/kunden', [CustomerController::class, 'index'])->name('customers.index');
            Route::post('/kunden', [CustomerController::class, 'store'])->name('customers.store');
            Route::put('/kunden/{customer}', [CustomerController::class, 'update'])->name('customers.update');
            Route::delete('/kunden/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');

            Route::get('/', [InvoiceController::class, 'index'])->name('index');
            Route::get('/neu', [InvoiceController::class, 'create'])->name('create');
            Route::post('/', [InvoiceController::class, 'store'])->name('store');
            Route::get('/{invoice}', [InvoiceController::class, 'show'])->whereNumber('invoice')->name('show');
            Route::get('/{invoice}/bearbeiten', [InvoiceController::class, 'edit'])->whereNumber('invoice')->name('edit');
            Route::put('/{invoice}', [InvoiceController::class, 'update'])->whereNumber('invoice')->name('update');
            Route::delete('/{invoice}', [InvoiceController::class, 'destroy'])->whereNumber('invoice')->name('destroy');
            Route::post('/{invoice}/ausstellen', [InvoiceController::class, 'issue'])->whereNumber('invoice')->name('issue');
            Route::post('/{invoice}/versendet', [InvoiceController::class, 'markSent'])->whereNumber('invoice')->name('sent');
            Route::post('/{invoice}/bezahlt', [InvoiceController::class, 'markPaid'])->whereNumber('invoice')->name('paid');
            Route::post('/{invoice}/stornieren', [InvoiceController::class, 'cancel'])->whereNumber('invoice')->name('cancel');
            Route::post('/{invoice}/duplizieren', [InvoiceController::class, 'duplicate'])->whereNumber('invoice')->name('duplicate');
            Route::get('/{invoice}/pdf', [InvoiceController::class, 'pdf'])->whereNumber('invoice')->name('pdf');
            Route::get('/{invoice}/entwurf-pdf', [InvoiceController::class, 'draftPdf'])->whereNumber('invoice')->name('draft-pdf');
        });
    });
    Route::prefix('logistics')->name('logistics.')->group(function () {
        Route::get('/', [LogisticsController::class, 'index'])->name('index');
        Route::patch('/orders/{order}/status', [LogisticsController::class, 'updateStatus'])->name('orders.status');
        Route::get('/orders/{order}/packlist', [LogisticsController::class, 'printPacklist'])->name('orders.packlist');
    });
});

Route::get('/sitemap.xml', [SitemapController::class, 'index']);

if (app()->environment('local')) {
    Route::get('/seed-orders', function () {
        $user = User::first() ?? User::factory()->create();
        Order::create(['user_id' => $user->id, 'amount' => 55.99, 'status' => 'paid', 'category_id' => 1, 'is_free' => false]);
        Order::create(['user_id' => $user->id, 'amount' => 0, 'status' => 'paid', 'category_id' => 2, 'is_free' => true]);
        Order::create(['user_id' => $user->id, 'amount' => 99.99, 'status' => 'pending', 'category_id' => 3, 'is_free' => false]);

        return 'Orders seeded';
    });
}
