<template>
  <AppLayout>
    <SeoHead
      title="Über Trustbridge"
      description="Erfahre alles über Trustbridge: Wer wir sind, warum es uns gibt und was wir anbieten."
      keywords="Trustbridge, Über uns, Coaching, Portal"
      canonical="https://trustbridge.de/about"
      :jsonLd="aboutLd"
    />

    <!-- HERO -->
    <AboutHero />

    <!-- SECTION 1: Über Trustbridge -->
    <AboutIntro />

    <!-- SECTION 2: Wer wir sind -->
    <AboutTeam />

    <!-- SECTION 3: Warum es uns gibt -->
    <AboutWhy />

    <!-- SECTION 4: Wie unser Modell funktioniert -->
    <AboutModel />

    <!-- SECTION 5: Warenkategorien -->
    <AboutCategories />

    <!-- SECTION 6: Transparenz -->
    <AboutTransparency />

    <!-- SECTION 7: Gemeinsam wachsen -->
    <AboutCommunity />

    <!-- SECTION 8: Unser Versprechen & CTA -->
    <AboutPromise />

  </AppLayout>
</template>

<script setup>
import AppLayout from '../Layouts/AppLayout.vue';
import SeoHead from '../Components/SeoHead.vue';
import AboutHero from '../Components/About/AboutHero.vue';
import AboutIntro from '../Components/About/AboutIntro.vue';
import AboutTeam from '../Components/About/AboutTeam.vue';
import AboutWhy from '../Components/About/AboutWhy.vue';
import AboutModel from '../Components/About/AboutModel.vue';
import AboutCategories from '../Components/About/AboutCategories.vue';
import AboutTransparency from '../Components/About/AboutTransparency.vue';
import AboutCommunity from '../Components/About/AboutCommunity.vue';
import AboutPromise from '../Components/About/AboutPromise.vue';

const aboutLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Über Trustbridge',
  url: 'https://trustbridge.de/about',
  description: 'Erfahre alles über Trustbridge und was wir anbieten.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Trustbridge',
    url: 'https://trustbridge.de',
    description: 'Trustbridge – Dein Portal für Coaching & mehr.',
  }
};
</script>
