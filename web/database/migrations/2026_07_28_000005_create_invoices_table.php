<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->nullable()->unique();
            $table->string('status')->default('draft')->index();
            $table->foreignId('customer_id')->constrained()->restrictOnDelete();
            $table->foreignId('company_profile_id')->constrained()->restrictOnDelete();
            $table->foreignId('payment_profile_id')->constrained()->restrictOnDelete();
            $table->string('tax_profile')->default('reverse_charge_german_b2b');
            $table->string('currency', 3)->default('EUR');
            $table->string('language', 4)->default('both');
            $table->date('issue_date')->nullable();
            $table->date('due_date')->nullable()->index();
            $table->unsignedSmallInteger('payment_terms_days')->default(7);
            $table->date('service_period_start')->nullable();
            $table->date('service_period_end')->nullable();
            $table->unsignedBigInteger('subtotal_cents')->default(0);
            $table->unsignedBigInteger('total_cents')->default(0);
            $table->text('notes')->nullable();
            $table->string('pdf_path')->nullable();
            $table->foreignId('duplicated_from_id')->nullable()->constrained('invoices')->nullOnDelete();
            $table->timestamp('issued_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->string('cancellation_reason')->nullable();
            // Airwallex V2 (vorbereitet, in V1 ungenutzt)
            $table->string('airwallex_deposit_id')->nullable()->index();
            $table->string('airwallex_transaction_reference')->nullable();
            $table->string('payment_match_status')->default('unmatched');
            $table->timestamp('payment_matched_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'due_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
