<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Subscription;
use App\Models\Payment;
use App\Services\PaypalService;
use Illuminate\Support\Facades\Log;

class RenewSubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscriptions:renew';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prüft auf fällige Abos und erneuert diese. Verrechnet dabei Affiliate-Guthaben.';

    /**
     * Execute the console command.
     */
    public function handle(PaypalService $paypalService)
    {
        $dueSubscriptions = Subscription::where('status', 'active')
            ->whereNotNull('next_billing_date')
            ->where('next_billing_date', '<=', now())
            ->with('user', 'category')
            ->get();

        $this->info("Gefundene fällige Abos: " . $dueSubscriptions->count());

        foreach ($dueSubscriptions as $sub) {
            $user = $sub->user;
            $category = $sub->category;
            
            // Rabatt berechnen wie im Frontend
            $discount = 1.0;
            if ($sub->duration_months == 3) $discount = 0.9;
            if ($sub->duration_months == 6) $discount = 0.8;
            if ($sub->duration_months == 12) $discount = 0.7;
            
            $baseAmount = round($category->base_price * $discount, 2);
            $amountToCharge = $baseAmount;

            // Affiliate Guthaben verrechnen
            $creditUsed = 0;
            if ($user->credit_balance > 0) {
                if ($user->credit_balance >= $amountToCharge) {
                    $creditUsed = $amountToCharge;
                    $amountToCharge = 0;
                } else {
                    $creditUsed = $user->credit_balance;
                    $amountToCharge -= $user->credit_balance;
                }
            }

            // PayPal Zahlung einleiten (falls noch ein Restbetrag bleibt)
            if ($amountToCharge > 0) {
                $account = $paypalService->getActiveAccount();
                if (!$account) {
                    Log::error("Abo {$sub->id} konnte nicht erneuert werden: Kein PayPal Account aktiv.");
                    continue;
                }

                // Hier würde der echte Call zu PayPal passieren. Wir mocken es wieder:
                Payment::create([
                    'subscription_id' => $sub->id,
                    'paypal_account_id' => $account->id,
                    'transaction_id' => 'RENEWAL_' . uniqid(),
                    'amount' => $amountToCharge,
                    'status' => 'completed'
                ]);
            } else {
                Log::info("Abo {$sub->id} vollständig mit Guthaben bezahlt.");
            }

            // Guthaben abziehen falls genutzt
            if ($creditUsed > 0) {
                $user->decrement('credit_balance', $creditUsed);
                Log::info("{$creditUsed}€ Guthaben für Abo {$sub->id} verwendet.");
            }

            // Abo Laufzeit verlängern
            $sub->update([
                'next_billing_date' => now()->addMonths($sub->duration_months)
            ]);

            $this->info("Abo {$sub->id} von User {$user->id} erfolgreich erneuert. (Geladen: {$amountToCharge}€, Guthaben genutzt: {$creditUsed}€)");
        }
    }
}
