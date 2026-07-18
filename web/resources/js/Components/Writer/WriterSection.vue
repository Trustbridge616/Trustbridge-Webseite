<template>
  <div id="writer" class="writer-section">
    <!-- Ambient Glow Background -->
    <div class="writer-glow g1"></div>
    <div class="writer-glow g2"></div>

    <div class="writer-container">
      <div class="writer-header">
        <span class="writer-tag">TRUSTBRIDGE</span>
        <h2 class="writer-title">Writer</h2>
        <p class="writer-subtitle">Vermittlungsangebot</p>
        <p class="writer-intro">Trustbridge findet, prüft und vermittelt Chancen.</p>
      </div>

      <div class="writer-highlight-card">
        <!-- Card Effects -->
        <div class="cc-glass"></div>
        <div class="cc-refraction"></div>
        <div class="cc-aura"></div>
        <div class="cc-active-glow"></div>

        <div class="whc-content">
          <div class="whc-top">
            <span class="whc-label">Aktuelles Partnerangebot</span>
            <h3 class="whc-title">Trustbridge</h3>
            <span class="whc-claim">Chancen im Paket.</span>
            <p class="whc-desc">Hochwertige Neuware. Direkt vom Anbieter. Zum Nutzen oder Weiterverkaufen.</p>
          </div>

          <!-- Feature Pills -->
          <div class="whc-features">
            <div class="feature-pill">
              <span class="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </span>
              <span>Geprüft</span>
            </div>
            <div class="feature-pill">
              <span class="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
              </span>
              <span>Vermittelt</span>
            </div>
            <div class="feature-pill">
              <span class="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </span>
              <span>Direkt vom Anbieter</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="whc-actions">
            <a href="#partner" class="epic-cta-btn abo w-full text-center block">
              <span class="cta-glare"></span>
              <span class="cta-text">Anbieter ansehen</span>
            </a>
            <a href="#anfragen" class="epic-cta-btn single w-full text-center block" style="margin-top: 1rem;">
              <span class="cta-glare"></span>
              <span class="cta-text" style="color: #000;">Box anfragen</span>
            </a>
            <p class="whc-action-note">Trustbridge vermittelt Partnerangebote. Der Kauf erfolgt direkt beim jeweiligen Anbieter.</p>
          </div>
        </div>
      </div>

      <!-- Legal note -->
      <p class="writer-legal">Vermitteltes Partnerangebot. Kauf, Zahlung und Lieferung erfolgen direkt über den jeweiligen Anbieter.</p>
    </div>
  </div>
</template>

<script setup>
// WriterSection component matching Prizes theme
</script>

<style scoped>
/* ══════════════════════════════════════
   WRITER SECTION STYLES
   ══════════════════════════════════════ */
.writer-section {
  position: relative;
  background: transparent;
  padding: 6rem 2rem 8rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
  overflow: hidden;
  z-index: 5;
}

.writer-glow {
  position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
  animation: heroFloat 8s ease-in-out infinite; z-index: -1;
}
.g1 { top: 0%; left: 15%; width: 500px; height: 500px; background: rgba(124,58,237,0.25); opacity: 0.6; }
.g2 { bottom: 10%; right: 10%; width: 450px; height: 450px; background: rgba(142,245,210,0.15); opacity: 0.5; animation-delay: -4s; }

@keyframes heroFloat {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-25px) scale(1.06); }
}

.writer-container {
  max-width: 800px; /* Matching the container width logic */
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.writer-header {
  text-align: center;
  margin-bottom: 3rem;
}

.writer-tag {
  display: inline-block; font-size: 0.85rem; font-weight: 700;
  letter-spacing: 4px; color: #8EF5D2; margin-bottom: 1.25rem;
  text-shadow: 0 0 20px rgba(142,245,210,0.5);
  text-transform: uppercase;
}

.writer-title {
  color: #F7F1FF; font-size: 3.5rem; font-weight: 800;
  margin: 0 0 0.5rem;
  text-shadow: 0 0 40px rgba(124,58,237,0.3);
}

.writer-subtitle {
  color: #F0CF5A; font-size: 1.8rem; font-weight: 700; margin: 0 0 1rem;
  text-shadow: 0 0 20px rgba(240,207,90,0.4);
}

.writer-intro {
  color: #D9CFE8; font-size: 1.2rem; margin: 0;
  line-height: 1.6; max-width: 600px; margin: 0 auto;
}

/* ══════════════════════════════════════
   HIGHLIGHT CARD (Matching Crystal Card)
   ══════════════════════════════════════ */
.writer-highlight-card {
  position: relative; border-radius: 24px; padding: 3.5rem 3rem;
  text-align: center; transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-style: preserve-3d;
  width: 100%;
  max-width: 700px;
  margin-bottom: 2rem;
}
.writer-highlight-card:hover { transform: translateY(-10px) scale(1.02); z-index: 10; }

.cc-glass {
  position: absolute; inset: 0; background: rgba(30, 20, 50, 0.85);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border-radius: 24px; border: 1px solid rgba(142,245,210,0.4);
  border-top: 1px solid rgba(142,245,210,0.7); border-left: 1px solid rgba(142,245,210,0.5);
  box-shadow: 0 30px 60px rgba(0,0,0,0.7), inset 0 0 30px rgba(142,245,210,0.1);
  transition: all 0.5s ease; overflow: hidden;
}
.cc-refraction {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(255,255,255,0.05) 60%, transparent 100%);
  border-radius: 24px; pointer-events: none; opacity: 0.6; transition: opacity 0.4s ease;
}
.cc-aura {
  position: absolute; inset: -2px; border-radius: 26px;
  background: linear-gradient(45deg, #7c3aed, #8EF5D2, #6366f1, #7c3aed);
  background-size: 300% 300%; opacity: 0.4; filter: blur(12px);
  transition: opacity 0.4s ease; z-index: -1;
  animation: auraSpin 4s linear infinite;
}
.writer-highlight-card:hover .cc-aura { opacity: 0.7; }
@keyframes auraSpin { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

.cc-active-glow {
  position: absolute; inset: -8px; border-radius: 30px;
  background: linear-gradient(to bottom, #8EF5D2, rgba(142,245,210,0.2));
  opacity: 0.3; filter: blur(20px); transition: all 0.6s ease; z-index: -2;
}
.writer-highlight-card:hover .cc-active-glow { opacity: 0.6; }

.whc-content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; gap: 2rem;
}

.whc-label {
  display: inline-block; padding: 6px 16px; border-radius: 20px;
  background: rgba(142,245,210,0.15); border: 1px solid rgba(142,245,210,0.4);
  color: #8EF5D2; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 2px; margin-bottom: 1.5rem;
  box-shadow: 0 0 15px rgba(142,245,210,0.2);
}

.whc-title {
  color: #F7F1FF; font-size: 2.8rem; font-weight: 800; margin: 0 0 0.5rem;
  text-shadow: 0 0 25px rgba(142,245,210,0.4);
}

.whc-claim {
  display: block; color: #F0CF5A; font-size: 1.4rem; font-weight: 700;
  margin-bottom: 1rem; text-shadow: 0 0 15px rgba(240,207,90,0.3);
}

.whc-desc {
  color: #D9CFE8; font-size: 1.1rem; line-height: 1.6; margin: 0 auto; max-width: 500px;
}

/* ══════════════════════════════════════
   FEATURE PILLS
   ══════════════════════════════════════ */
.whc-features {
  display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(142,245,210,0.2);
  border-bottom: 1px solid rgba(142,245,210,0.2);
}
.feature-pill {
  display: flex; align-items: center; gap: 0.5rem;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
  padding: 0.6rem 1.2rem; border-radius: 50px;
  color: #F7F1FF; font-size: 0.95rem; font-weight: 600;
  transition: all 0.3s ease;
}
.feature-pill:hover {
  background: rgba(142,245,210,0.1); border-color: rgba(142,245,210,0.4);
  transform: translateY(-2px); box-shadow: 0 5px 15px rgba(142,245,210,0.2);
}
.feature-icon {
  color: #8EF5D2; display: flex; align-items: center; justify-content: center;
  filter: drop-shadow(0 0 5px rgba(142,245,210,0.5));
}

/* ══════════════════════════════════════
   ACTIONS & CTA
   ══════════════════════════════════════ */
.whc-actions {
  display: flex; flex-direction: column; gap: 0.5rem;
}

.epic-cta-btn {
  position: relative; width: 100%; padding: 1.2rem; border-radius: 16px; border: none;
  font-family: 'Century Gothic', system-ui, sans-serif; font-size: 1.2rem; font-weight: 800; letter-spacing: 1px;
  cursor: pointer; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none; display: block;
}
.epic-cta-btn:hover { transform: translateY(-3px) scale(1.02); }
.epic-cta-btn:active { transform: translateY(1px); }

.cta-text { position: relative; z-index: 2; }
.cta-glare {
  position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transform: skewX(-20deg); animation: btnGlare 4s infinite; z-index: 1;
}
@keyframes btnGlare { 0%, 50% { left: -100%; } 100% { left: 200%; } }

.epic-cta-btn.abo { 
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #000; 
  box-shadow: 0 10px 20px rgba(142,245,210,0.4), inset 0 2px 0 rgba(255,255,255,0.5); 
}
.epic-cta-btn.abo:hover { box-shadow: 0 15px 30px rgba(142,245,210,0.6), inset 0 2px 0 rgba(255,255,255,0.5); }

.epic-cta-btn.single { 
  background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; 
  box-shadow: 0 10px 20px rgba(240,207,90,0.4), inset 0 2px 0 rgba(255,255,255,0.4); 
}
.epic-cta-btn.single:hover { box-shadow: 0 15px 30px rgba(240,207,90,0.6), inset 0 2px 0 rgba(255,255,255,0.4); }

.whc-action-note {
  color: rgba(255,255,255,0.5); font-size: 0.85rem; margin-top: 1rem;
}

.writer-legal {
  color: rgba(255,255,255,0.3); font-size: 0.8rem; text-align: center;
  max-width: 600px;
}
</style>
