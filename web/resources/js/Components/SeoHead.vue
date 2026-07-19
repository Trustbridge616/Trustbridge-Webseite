<template>
  <Head>
    <!-- Das Marken-Suffix nur anhaengen, wenn der Titel die Marke
         nicht schon traegt - sonst stand dort "Trustbridge ... |
         Trustbridge". -->
    <title>{{ fullTitle }}</title>
    <meta name="description" :content="description" />
    <meta name="keywords" :content="keywords" />
    <meta property="og:title" :content="fullTitle" />
    <meta property="og:description" :content="description" />
    <meta property="og:image" content="/og-image.jpg" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="canonical" :href="canonical" />
    <component v-if="jsonLd" :is="'script'" type="application/ld+json">{{ jsonLdString }}</component>
  </Head>
</template>

<script setup>
import { computed } from 'vue';
import { Head } from '@inertiajs/vue3';

const props = defineProps({
  title: { type: String, default: 'Trustbridge – Die Brücke zu dir selbst' },
  description: { type: String, default: 'Trustbridge – Die Brücke zu dir selbst.' },
  keywords: { type: String, default: 'Trustbridge, Coaching, Partnerprogramm, Portal' },
  canonical: { type: String, default: '' },
  jsonLd: { type: Object, default: null },
});

const jsonLdString = computed(() => props.jsonLd ? JSON.stringify(props.jsonLd) : '');

const fullTitle = computed(() =>
  props.title.includes('Trustbridge') ? props.title : `${props.title} | Trustbridge`
);
</script>
