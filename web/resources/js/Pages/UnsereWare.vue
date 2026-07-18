<template>
  <AppLayout>
    <!-- Background Effects -->
    <div class="page-background">
      <div class="bg-flow-lines"></div>
      <div class="bg-glow"></div>
    </div>

    <UnsereWareHero />
    <UnsereWareTrustPills />

    <div class="page-content">
      <div class="container">
        <UnsereWareBoxGallery />
        <UnsereWareEarlyCta />
        <UnsereWareUploadSteps />
        <UnsereWareUploadCta />
        <UnsereWareIdExplanation />
        <UnsereWareReviews />
        <UnsereWareFeedbackBonus />
        <UnsereWarePrivacyCommunity />
        <UnsereWareFinalCta />
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '../Layouts/AppLayout.vue';
import UnsereWareHero from '../Components/UnsereWare/UnsereWareHero.vue';
import UnsereWareTrustPills from '../Components/UnsereWare/UnsereWareTrustPills.vue';
import UnsereWareBoxGallery from '../Components/UnsereWare/UnsereWareBoxGallery.vue';
import UnsereWareEarlyCta from '../Components/UnsereWare/UnsereWareEarlyCta.vue';
import UnsereWareUploadSteps from '../Components/UnsereWare/UnsereWareUploadSteps.vue';
import UnsereWareUploadCta from '../Components/UnsereWare/UnsereWareUploadCta.vue';
import UnsereWareIdExplanation from '../Components/UnsereWare/UnsereWareIdExplanation.vue';
import UnsereWareReviews from '../Components/UnsereWare/UnsereWareReviews.vue';
import UnsereWareFeedbackBonus from '../Components/UnsereWare/UnsereWareFeedbackBonus.vue';
import UnsereWarePrivacyCommunity from '../Components/UnsereWare/UnsereWarePrivacyCommunity.vue';
import UnsereWareFinalCta from '../Components/UnsereWare/UnsereWareFinalCta.vue';
</script>

<style scoped>
/* Base Page Backgrounds only */
.page-background { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; background: #0a0515; overflow: hidden; pointer-events: none; }
.bg-glow { position: absolute; top: -20vh; left: 50%; transform: translateX(-50%); width: 100vw; height: 60vh; background: radial-gradient(ellipse at 50% 50%, rgba(45,20,80,0.6) 0%, transparent 70%); }
.bg-flow-lines { position: absolute; inset: 0; background-image: linear-gradient(rgba(142,245,210,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(142,245,210,0.03) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.5; }
.page-content { position: relative; z-index: 2; padding-bottom: 6rem; }
</style>
