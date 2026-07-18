<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Elektronik',
                'slug' => 'elektronik',
                'description' => 'Ungeprüfte Elektronik-Retouren. Von Smartphones, Tablets und Kopfhörern bis hin zu Smart-Home Geräten — echte Markenware aus Retouren mit garantiertem Warenwert.',
                'base_price' => 49.99,
                'image_url' => null,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Mode & Kleidung',
                'slug' => 'mode',
                'description' => 'Markenbekleidung aus Retouren. Tops, Hosen, Jacken und Schuhe bekannter Marken — zufällige Größen und Stile, aber stets hochwertig und mit garantiertem Warenwert.',
                'base_price' => 29.99,
                'image_url' => null,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Haushalt',
                'slug' => 'haushalt',
                'description' => 'Haushaltsgeräte, Küchenutensilien und Deko-Artikel aus Retouren. Alles für den täglichen Bedarf — von Kleingeräten bis zu Wohnaccessoires.',
                'base_price' => 39.99,
                'image_url' => null,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Sport & Outdoor',
                'slug' => 'sport',
                'description' => 'Sportartikel, Outdoor-Ausrüstung und Fitnessgeräte aus Retouren. Für Läufer, Radfahrer, Kletterer und alle Sportbegeisterten — Markenware zu Überraschungspreisen.',
                'base_price' => 44.99,
                'image_url' => null,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Spielzeug',
                'slug' => 'spielzeug',
                'description' => 'Spielzeug und Kinderbedarf aus Retouren. Von Lego über Puppen bis zu Outdoor-Spielzeug — ideal als Überraschungspaket für Kinder jeder Altersgruppe.',
                'base_price' => 34.99,
                'image_url' => null,
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Gemischt',
                'slug' => 'gemischt',
                'description' => 'Das ultimative Überraschungspaket! Inhalte aus allen Kategorien — Elektronik, Mode, Haushalt, Sport und mehr. Maximale Überraschung, maximaler Wert.',
                'base_price' => 59.99,
                'image_url' => null,
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(
                ['slug' => $cat['slug']],
                $cat
            );
        }
    }
}
