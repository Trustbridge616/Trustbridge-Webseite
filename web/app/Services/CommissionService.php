<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Commission;
use App\Models\User;
use App\Models\MlmSetting;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CommissionService
{
    /**
     * Verteilt Provisionen für eine erfolgreiche Zahlung.
     */
    public function distribute(User $user, $paymentAmount)
    {
        if (MlmSetting::get('mlm_active') != 1) {
            return;
        }

        $maxLevels = (int) MlmSetting::get('mlm_levels', 1);
        $payoutType = MlmSetting::get('commission_payout_type', 'credit');
        
        $currentUser = $user;
        $level = 1;

        while ($currentUser->sponsor_id && $level <= $maxLevels) {
            $sponsor = User::find($currentUser->sponsor_id);
            if (!$sponsor) break;

            if ($payoutType === 'credit') {
                // Prozentuale Vergütung basierend auf dem Level
                $percent = (float) MlmSetting::get("commission_level_{$level}_percent", 0);
                if ($percent > 0) {
                    $commissionAmount = round($paymentAmount * ($percent / 100), 2);
                    
                    if ($commissionAmount > 0) {
                        DB::beginTransaction();
                        try {
                            Commission::create([
                                'user_id' => $sponsor->id,
                                'referred_user_id' => $user->id,
                                'type' => 'credit',
                                'amount' => $commissionAmount,
                                'note' => "{$percent}% Provision (Level {$level}) für {$user->name}"
                            ]);

                            // Stripe Balance updaten (in Cent)
                            if ($sponsor->stripe_id) {
                                $sponsor->applyBalance(-($commissionAmount * 100), "Provision (Level {$level}) für {$user->name}");
                            }
                            
                            DB::commit();
                            Log::info("{$commissionAmount}€ an {$sponsor->id} (Level {$level}) gebucht.");
                        } catch (\Exception $e) {
                            DB::rollBack();
                            Log::error("MLM Fehler Level {$level}: " . $e->getMessage());
                        }
                    }
                }
            } else if ($payoutType === 'free_package') {
                // Gratis-Paket System (nur für Direktsponsor Level 1 relevant in diesem Modell)
                if ($level === 1) {
                    $threshold = (int) MlmSetting::get('referral_free_package_threshold', 3);
                    
                    // Zähle bisherige erfolgreiche Empfehlungen
                    $referralCount = User::where('sponsor_id', $sponsor->id)
                        ->whereHas('subscriptions')
                        ->count();

                    // Wenn Schwelle erreicht und wir wollen ein Paket buchen
                    if ($referralCount > 0 && $referralCount % $threshold === 0) {
                        DB::beginTransaction();
                        try {
                            Commission::create([
                                'user_id' => $sponsor->id,
                                'referred_user_id' => $user->id,
                                'type' => 'free_package',
                                'amount' => 1,
                                'note' => "Gratis-Paket erreicht ({$threshold}. Empfehlung) durch {$user->name}"
                            ]);

                            // Stripe Balance um 1 Paketwert reduzieren (hier statisch angenommen oder via Settings holbar)
                            if ($sponsor->stripe_id) {
                                $sponsor->applyBalance(-3999, "Gratis-Paket Prämie für {$user->name}");
                            }
                            DB::commit();
                            Log::info("Gratis-Paket an {$sponsor->id} gebucht.");
                        } catch (\Exception $e) {
                            DB::rollBack();
                            Log::error("MLM Gratis-Paket Fehler: " . $e->getMessage());
                        }
                    }
                }
            }

            $currentUser = $sponsor;
            $level++;
        }
    }
}
