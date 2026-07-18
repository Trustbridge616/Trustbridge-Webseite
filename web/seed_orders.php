<?php
$user = App\Models\User::first();
App\Models\Order::create(['user_id' => $user->id, 'amount' => 55.99, 'status' => 'paid', 'category_id' => 1, 'is_free' => false]);
App\Models\Order::create(['user_id' => $user->id, 'amount' => 0, 'status' => 'paid', 'category_id' => 2, 'is_free' => true]);
App\Models\Order::create(['user_id' => $user->id, 'amount' => 99.99, 'status' => 'pending', 'category_id' => 3, 'is_free' => false]);
echo "Orders created.";
