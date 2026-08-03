<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class AdminAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public static function protectedRoutes(): array
    {
        return [
            ['/admin/rechnungen'],
            ['/admin/rechnungen/neu'],
            ['/admin/rechnungen/kunden'],
            // Bestandsrouten — waren vor diesem Feature komplett ungeschützt:
            ['/admin'],
            ['/admin/users'],
            ['/admin/orders'],
        ];
    }

    #[DataProvider('protectedRoutes')]
    public function test_guests_are_redirected_to_login(string $route): void
    {
        $this->get($route)->assertRedirect('/login');
    }

    #[DataProvider('protectedRoutes')]
    public function test_non_admins_get_403(string $route): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($user)->get($route)->assertForbidden();
    }

    public function test_admin_can_access_invoice_center(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)->get('/admin/rechnungen')->assertOk();
        $this->actingAs($admin)->get('/admin/rechnungen/kunden')->assertOk();
    }

    public function test_non_admin_cannot_mutate_invoices(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($user)->post('/admin/rechnungen', [])->assertForbidden();
        $this->actingAs($user)->post('/admin/rechnungen/kunden', [])->assertForbidden();
    }
}
