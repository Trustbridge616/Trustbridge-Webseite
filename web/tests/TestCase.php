<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Tests dürfen nicht vom Vite-Build-Manifest abhängen
        $this->withoutVite();
    }
}
