<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('commissions', function (Blueprint $table) {
            $table->string('type')->default('free_package')->after('amount');
            $table->string('note')->nullable()->after('type');
            // Make subscription_id nullable for admin-booked provisions
            $table->foreignId('referral_id')->nullable()->constrained('users')->nullOnDelete()->after('user_id');
        });
        // Make subscription_id nullable
        Schema::table('commissions', function (Blueprint $table) {
            $table->foreignId('subscription_id')->nullable()->change();
        });
    }
    public function down(): void {
        Schema::table('commissions', function (Blueprint $table) {
            $table->dropColumn(['type', 'note', 'referral_id']);
        });
    }
};
