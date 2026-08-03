<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('customer_number')->unique();
            $table->string('legal_name')->index();
            $table->string('contact_name')->nullable();
            $table->string('email');
            $table->string('address_line1');
            $table->string('address_line2')->nullable();
            $table->string('zip')->nullable();
            $table->string('city');
            $table->string('country', 2);
            $table->string('vat_id')->nullable();
            $table->boolean('is_business')->default(true);
            $table->unsignedSmallInteger('default_payment_terms_days')->default(7);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
