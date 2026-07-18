<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showRegister(Request $request)
    {
        return Inertia::render('Auth/Register', [
            'sponsor_id' => $request->query('ref')
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $sponsor_id = $request->input('sponsor_id');
        if ($sponsor_id && !User::find($sponsor_id)) {
            $sponsor_id = null;
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'sponsor_id' => $sponsor_id,
            'credit_balance' => 0
        ]);

        Auth::login($user);
        return redirect()->route('dashboard');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();

            $user = Auth::user();
            if ($user->is_admin ?? false) {
                return redirect()->route('admin.index');
            }
            if ($user->is_logistics ?? false) {
                return redirect()->route('logistics.index');
            }
            return redirect()->route('dashboard');
        }

        return back()->withErrors([
            'email' => 'Die eingegebene E-Mail-Adresse oder das Passwort ist falsch.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
