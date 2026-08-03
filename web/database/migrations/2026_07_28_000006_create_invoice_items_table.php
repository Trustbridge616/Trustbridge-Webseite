<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('position')->default(1);
            $table->string('title_en');
            $table->string('title_de')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_de')->nullable();
            // Menge × 1000 als Integer (1000 = "1"), vermeidet decimal-Treiberdifferenzen MySQL/sqlite
            $table->unsignedBigInteger('quantity_milli')->default(1000);
            $table->string('unit')->default('month');
            $table->unsignedBigInteger('unit_price_cents');
            $table->unsignedBigInteger('line_total_cents');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
    }
};
