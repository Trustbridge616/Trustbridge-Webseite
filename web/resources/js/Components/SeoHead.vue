<template>
  <Head>
    <title>{{ title }} | Trustbridge</title>
    <meta name="description" :content="description" />
    <meta name="keywords" :content="keywords" />
    <meta property="og:title" :content="title + ' | Trustbridge'" />
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
  title: { type: String, default: 'Trustbridge – Dein Portal für Coaching & mehr' },
  description: { type: String, default: 'Trustbridge – Dein Zugang zu Coaching, Partnerprogramm und weiteren Bereichen.' },
  keywords: { type: String, default: 'Trustbridge, Coaching, Partnerprogramm, Portal' },
  canonical: { type: String, default: '' },
  jsonLd: { type: Object, default: null },
});

const jsonLdString = computed(() => props.jsonLd ? JSON.stringify(props.jsonLd) : '');
</script>
