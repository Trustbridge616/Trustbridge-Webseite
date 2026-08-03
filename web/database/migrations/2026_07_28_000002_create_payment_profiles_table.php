<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_profile_id')->constrained()->restrictOnDelete();
            $table->string('label');
            $table->string('provider')->default('airwallex');
            $table->string('beneficiary');
            $table->string('iban');
            $table->string('bic');
            $table->string('bank_name');
            $table->string('bank_country');
            $table->string('currency', 3)->default('EUR');
            $table->string('reference_hint')->default('Invoice number');
            $table->boolean('is_default')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_profiles');
    }
};
