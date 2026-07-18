<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SitemapController extends Controller
{
    public function index()
    {
        $urls = [
            ['loc' => route('home'), 'lastmod' => now()->toAtomString(), 'priority' => '1.0'],
            ['loc' => route('prizes'), 'lastmod' => now()->toAtomString(), 'priority' => '0.9'],
            ['loc' => route('how-it-works'), 'lastmod' => now()->toAtomString(), 'priority' => '0.8'],
            ['loc' => route('faq'), 'lastmod' => now()->toAtomString(), 'priority' => '0.7'],
            ['loc' => route('login'), 'lastmod' => now()->toAtomString(), 'priority' => '0.5'],
            ['loc' => route('register'), 'lastmod' => now()->toAtomString(), 'priority' => '0.5'],
        ];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        
        foreach ($urls as $url) {
            $xml .= '<url>';
            $xml .= '<loc>' . $url['loc'] . '</loc>';
            $xml .= '<lastmod>' . $url['lastmod'] . '</lastmod>';
            $xml .= '<priority>' . $url['priority'] . '</priority>';
            $xml .= '</url>';
        }
        
        $xml .= '</urlset>';

        return Response::make($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
