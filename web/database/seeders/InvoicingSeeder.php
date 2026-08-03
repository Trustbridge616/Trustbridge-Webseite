<?php

namespace Database\Seeders;

use App\Models\CompanyProfile;
use App\Models\PaymentProfile;
use Illuminate\Database\Seeder;

/**
 * Übernimmt die serverseitigen Rechnungs-Stammdaten aus
 * database/seeders/data/trustbridge-invoice-seed.json in die Datenbank.
 *
 * Idempotent: mehrfaches Ausführen legt keine Duplikate an
 * (natürlicher Schlüssel: legal_name bzw. IBAN).
 */
class InvoicingSeeder extends Seeder
{
    public function run(): void
    {
        $seed = json_decode(
            file_get_contents(database_path('seeders/data/trustbridge-invoice-seed.json')),
            true,
            512,
            JSON_THROW_ON_ERROR
        );

        $issuer = $seed['issuer'];
        $address = $issuer['registered_address'];

        $company = CompanyProfile::updateOrCreate(
            ['legal_name' => $issuer['legal_name']],
            [
                'name' => $issuer['trading_name'],
                'sender_line' => "{$issuer['trading_name']} — a brand/project of {$issuer['legal_name']}",
                'address_line1' => $address['line1'],
                'address_line2' => $address['line2'] ?? null,
                'city' => $address['city'],
                'region' => $address['region'] ?? null,
                'country' => $address['country'],
                'brn' => $issuer['business_registration_number_ubi'],
                'company_no' => $issuer['company_registration_number'],
                'website' => $issuer['website'],
                'email' => $issuer['email'],
                // interne Steuernummern/RIN/Director werden bewusst NICHT gespeichert
                'internal_meta' => null,
                'is_default' => true,
            ]
        );

        $payment = $seed['payment_profile'];

        PaymentProfile::updateOrCreate(
            ['iban' => $payment['iban']],
            [
                'company_profile_id' => $company->id,
                'label' => "{$payment['provider']} {$payment['currency']}",
                'provider' => strtolower($payment['provider']),
                'beneficiary' => $payment['beneficiary_name'],
                'bic' => $payment['swift_bic'],
                'bank_name' => $payment['bank_name'],
                'bank_country' => $payment['bank_location'],
                'currency' => $payment['currency'],
                'reference_hint' => $payment['payment_reference_rule'],
                'is_default' => true,
                'is_active' => true,
            ]
        );
    }
}
