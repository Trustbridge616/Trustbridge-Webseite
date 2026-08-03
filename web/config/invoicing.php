<?php

/*
 * Zentrale Invoicing-Konfiguration. Firmen- und Zahlungsprofil-Stammdaten
 * liegen in database/seeders/data/trustbridge-invoice-seed.json und werden
 * per InvoicingSeeder in die DB übernommen — hier stehen nur Regeln und
 * Vorlagen, keine Stammdaten-Duplikate.
 */
return [

    'number_format' => 'TBI-{YYYY}-{0001}',

    'default_currency' => 'EUR',

    'default_payment_terms_days' => 7,

    'default_language' => 'both', // de | en | both

    'tax_profiles' => [
        'reverse_charge_german_b2b' => [
            'label' => 'Reverse Charge (DE, B2B)',
            // Wird als Textblock unter dem Summenblock gedruckt —
            // niemals als 0%-Steuerzeile. Erscheint IMMER zweisprachig,
            // unabhängig von der gewählten Rechnungssprache.
            'note_de' => 'Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b UStG.',
            'note_en' => 'Reverse charge – VAT payable by the recipient in accordance with Article 196 of Council Directive 2006/112/EC.',
            'note' => 'Steuerschuldnerschaft des Leistungsempfängers gemäß § 13b UStG. / Reverse charge – VAT payable by the recipient in accordance with Article 196 of Council Directive 2006/112/EC.',
            // Pflichtangaben des Kunden, bevor mit diesem Profil
            // ausgestellt werden darf. Die USt-IdNr. wird separat geprüft:
            // sie ist Pflicht, AUSSER die Unternehmereigenschaft wurde vom
            // Admin manuell bestätigt (business_status_confirmed_at).
            'requires' => [
                'is_business',
                'legal_name',
                'address_line1',
                'city',
                'country',
                'email',
            ],
            'requires_vat_id_unless_confirmed' => true,
        ],
    ],

    'default_item' => [
        'title_en' => 'Monthly Digital Development & Strategic Advisory Retainer',
        'title_de' => 'Monatliche digitale Weiterentwicklung und strategische Begleitung',
        'description_en' => 'Ongoing development and expansion of the website and digital presence, technical and strategic project support, and personal business coaching/advisory services pursuant to the Service Agreement.',
        'description_de' => 'Laufende Weiterentwicklung und Erweiterung der Webseite und des Internetauftritts, technische und strategische Projektbegleitung sowie persönliche Business-Begleitung und Coaching gemäß Service Agreement.',
        'quantity_milli' => 1000,
        'unit' => 'month',
        'unit_price_cents' => 600000,
    ],

    'pdf' => [
        'logo' => 'brand/trustbridge-logo.png', // relativ zu public/
        'accent_turquoise' => '#8EF5D2',
        'accent_gold' => '#F0CF5A',
        'text_dark' => '#1a1a2e',
        'claim_footer' => 'Trust Yourself. Bridge your Gap.',
        // Optionaler Signaturblock: rendert nur, wenn diese Datei existiert
        // (private Disk). Standardmäßig nicht vorhanden.
        'signature_path' => 'branding/unterschrift.png',
        'storage_dir' => 'invoices', // auf der privaten local-Disk
    ],
];
