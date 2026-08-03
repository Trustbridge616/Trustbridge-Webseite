<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCustomerRequest;
use App\Http\Requests\Admin\UpdateCustomerRequest;
use App\Models\Customer;
use App\Services\AuditLogger;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct(private AuditLogger $audit) {}

    public function index()
    {
        $customers = Customer::query()
            ->withCount('invoices')
            ->orderBy('legal_name')
            ->get();

        return Inertia::render('Admin/Invoices/Customers', [
            'customers' => $customers,
        ]);
    }

    public function store(StoreCustomerRequest $request)
    {
        $customer = Customer::create([
            ...$request->validated(),
            'customer_number' => Customer::nextCustomerNumber(),
        ]);

        $this->audit->log('customer.created', $customer, [], ['legal_name' => $customer->legal_name]);

        return back()->with('success', "Kunde {$customer->customer_number} angelegt.");
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $old = $customer->only(['legal_name', 'email', 'country', 'vat_id']);

        $customer->update($request->validated());

        $this->audit->log('customer.updated', $customer, $old, $customer->only(['legal_name', 'email', 'country', 'vat_id']));

        return back()->with('success', 'Kunde aktualisiert.');
    }

    public function destroy(Customer $customer)
    {
        if ($customer->invoices()->exists()) {
            return back()->with('error', 'Kunde hat Rechnungen und kann nicht gelöscht werden.');
        }

        $this->audit->log('customer.deleted', $customer, ['legal_name' => $customer->legal_name], []);

        $customer->delete();

        return back()->with('success', 'Kunde gelöscht.');
    }
}
