<?php

namespace App\Services;

class DhlService
{
    public function createShipment(array $orderData)
    {
        // Mocking DHL API
        return [
            'tracking_id' => 'DHL' . strtoupper(uniqid()),
            'label_url' => 'https://mock.dhl.com/label/' . uniqid(),
            'status' => 'created'
        ];
    }
}
