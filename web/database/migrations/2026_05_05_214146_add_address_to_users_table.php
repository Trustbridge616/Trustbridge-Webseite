<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('street')->nullable()->after('email');
            $table->string('house_number')->nullable()->after('street');
            $table->string('zip')->nullable()->after('house_number');
            $table->string('city')->nullable()->after('zip');
            $table->string('country')->nullable()->default('Deutschland')->after('city');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['street', 'house_number', 'zip', 'city', 'country']);
        });
    }
};
