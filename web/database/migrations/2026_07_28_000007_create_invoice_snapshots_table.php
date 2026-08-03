<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoice_snapshots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->unique()->constrained()->restrictOnDelete();
            $table->json('data');
            $table->string('hash', 64);
            $table->timestamp('created_at')->useCurrent();
            // bewusst kein updated_at — Tabelle ist append-only
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoice_snapshots');
    }
};
