<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::first();
if (!$user) {
    $user = \App\Models\User::create([
        'name' => 'Admin User',
        'email' => 'admin@test.com',
        'password' => \Illuminate\Support\Facades\Hash::make('password123'),
        'is_admin' => true // assuming there might be an is_admin flag
    ]);
}
echo "User ID: " . $user->id . "\n";
echo "Email: " . $user->email . "\n";
echo "Password: password123\n";
