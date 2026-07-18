<template>
  <AppLayout>
    <div class="page-hero">
      <div class="page-hero-inner">
        <span class="page-label">Das System</span>
        <h1>Wie Trustbridge funktioniert</h1>
        <p>Du wählst dein Box-Level, wir bündeln Warenposten und stellen daraus faire TrustBoxen mit kalkuliertem Einkaufsvorteil zusammen.</p>
      </div>
    </div>

    <div class="page-content">
      <div class="container">

        <!-- Schritt-für-Schritt -->
        <section class="section-steps">
          <div class="how-steps">

            <!-- Schritt 01 -->
            <div class="how-step-wrapper">
              <div class="step-panther-anchor">
                <img src="/panther-kategorie-nobg.png" class="step-panther-img" alt="Panther" />
              </div>
              <div class="how-step flex-1">
                <div class="step-glow"></div>
                <div class="how-num">01</div>
                <h3>Box-Level wählen</h3>
                <p>Wähle dein TrustBox-Level – von 111 € bis 555 €. Je höher dein Level, desto größer der Warenumfang und desto mehr Spielraum entsteht bei der Zusammenstellung.</p>
              </div>
            </div>

            <!-- Schritt 02 -->
            <div class="how-step-wrapper">
              <div class="step-panther-anchor">
                <img src="/panther-registration-nobg.png" class="step-panther-img" alt="Panther" />
              </div>
              <div class="how-step flex-1">
                <div class="step-glow"></div>
                <div class="how-num">02</div>
                <h3>Einmalig oder Legacy-Abo</h3>
                <p>Du entscheidest, ob du einmalig bestellst oder monatlich im Legacy-Abo dabei bist. Im Legacy-Abo sammelst du Punkte, erhältst Vorteile und bekommst früher Zugang zu ausgewählten Deals.</p>
              </div>
            </div>

            <!-- Schritt 03 -->
            <div class="how-step-wrapper">
              <div class="step-panther-anchor">
                <img src="/panther-laufzeit-nobg.png" class="step-panther-img" alt="Panther" />
              </div>
              <div class="how-step flex-1">
                <div class="step-glow"></div>
                <div class="how-num">03</div>
                <h3>Ware wird zusammengestellt</h3>
                <p>Wir kaufen größere Warenposten ein und stellen daraus TrustBoxen zusammen – z. B. aus Sonderposten, Restposten, Saisonware, Großhandelsware oder Retourenware, je nach Bestand und Verfügbarkeit.</p>
              </div>
            </div>

            <!-- Schritt 04 -->
            <div class="how-step-wrapper">
              <div class="step-panther-anchor">
                <img src="/panther-rechtsblick-nobg.png" class="step-panther-img" alt="Panther" />
              </div>
              <div class="how-step flex-1">
                <div class="step-glow"></div>
                <div class="how-num">04</div>
                <h3>TrustBox erhalten</h3>
                <p>Deine Box wird gepackt, dokumentiert und versendet. Jede Versandbox kann später über eine TrustBox-ID nachvollziehbar gemacht werden.</p>
              </div>
            </div>

            <!-- Schritt 05 -->
            <div class="how-step-wrapper">
              <!-- Gespiegelter Panther für Schritt 5 -->
              <div class="step-panther-anchor">
                <img src="/panther-kategorie-nobg.png" class="step-panther-img" alt="Panther" style="transform: translateX(-50%) scaleX(-1);"/>
              </div>
              <div class="how-step flex-1">
                <div class="step-glow"></div>
                <div class="how-num">05</div>
                <h3>Nutzen, behalten oder weitergeben</h3>
                <p>Du entscheidest selbst, was du mit deiner Ware machst: behalten, nutzen, verschenken, tauschen oder privat weitergeben.</p>
                <div class="step-hint">Wer Trustbridge später weiterempfiehlt, kann zusätzliche Vorteile im System erhalten.</div>
              </div>
            </div>

          </div>
        </section>

        <!-- Trust-Box: Keine Schrottboxen -->
        <section class="section-trust">
          <div class="trust-box glass-panel">
            <div class="trust-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div class="trust-content">
              <h3>Keine Schrottboxen</h3>
              <p>Unser Anspruch ist eine faire Zusammenstellung aus nutzbarer Ware – keine wertlosen Füllartikel.</p>
            </div>
          </div>
        </section>

        <!-- Überleitung zu Unsere Ware -->
        <section class="section-redirect">
          <div class="redirect-box glass-panel-dark">
            <div class="redirect-content">
              <h3>Unsere Ware ansehen</h3>
              <p>Im Bereich „Unsere Ware“ zeigen wir echte Versandboxen, TrustBox-IDs, Packfotos und später verifizierte Reviews.</p>
              <Link href="/unsere-ware" class="btn-primary redirect-btn">Unsere Ware ansehen</Link>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="section-cta">
          <h2>Bereit für deine eigene TrustBox?</h2>
          <p>Wähle dein Level und sichere dir deine eigene Warenbox mit kalkuliertem Einkaufsvorteil.</p>
          <Link href="/prizes" class="cta-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 19H22V21H2V19ZM3.5 17L5.5 8L12 12L18.5 8L20.5 17H3.5Z"/></svg>
            Box auswählen
          </Link>
        </section>

      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import AppLayout from '../Layouts/AppLayout.vue';
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, #1a0a36, #2D1B54, #4a238a); padding: 10rem 2rem 5rem; text-align: center; }
.page-hero-inner { max-width: 750px; margin: 0 auto; }
.page-label { display: inline-block; background: rgba(212,175,55,0.15); color: #D4AF37; border: 1px solid rgba(212,175,55,0.4); padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1.5rem; }
.page-hero h1 { font-family: 'Century Gothic', system-ui, sans-serif; font-size: 3rem; color: white; margin-bottom: 1rem; background: none; -webkit-text-fill-color: white; }
.page-hero p { color: rgba(255,255,255,0.75); font-size: 1.2rem; margin: 0; }
.page-content { background: #0a0515; padding: 5rem 2rem; position: relative; }

/* Steps */
.section-steps { margin-bottom: 6rem; }
/* How Steps - 3D Box Cards - 5 Columns! */
.how-steps {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  perspective: 1000px;
  align-items: stretch; 
}

/* HOW-STEP CARDS — Frosted Luxury Glass */
.how-step {
  background: rgba(45, 20, 80, 0.4);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(142, 245, 210, 0.1);
  border-top: 1px solid rgba(142, 245, 210, 0.3);
  border-radius: 22px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, border-color 0.3s ease;
}

.how-step::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #8EF5D2, #5CE1C6, #2EB094);
  border-radius: 22px 22px 0 0; pointer-events: none; z-index: 2;
}

.how-step .step-glow {
  position: absolute; right: -40px; bottom: -40px; width: 130px; height: 130px;
  background: radial-gradient(circle, rgba(142,245,210,0.15) 0%, transparent 70%);
  pointer-events: none; z-index: 1;
}

.how-step > * { position: relative; z-index: 2; }

.how-step:hover {
  transform: translateY(-6px);
  border-color: rgba(212, 175, 55, 0.5); /* Gold highlight */
  box-shadow: 0 18px 45px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.2);
}

.how-num { font-size: 3.5rem; font-weight: 800; color: rgba(212, 175, 69, 0.28); font-family: 'Century Gothic', system-ui, sans-serif; line-height: 1; margin-bottom: 0.75rem; }
.how-step h3 { color: #FFF; font-size: 1.15rem; margin-bottom: 0.5rem; font-family: 'Century Gothic', system-ui, sans-serif; font-weight: 800; letter-spacing: 0.3px; }
.how-step p { color: #C4B8D8; font-size: 0.9rem; line-height: 1.5; margin: 0; font-family: 'Century Gothic', system-ui, sans-serif; font-weight: 500; }
.step-hint { font-size: 0.8rem; color: #8EF5D2; margin-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 0.8rem; font-style: italic; }

.flex-1 { flex: 1; }
.how-step-wrapper { display: flex; flex-direction: column; align-items: stretch; }

.step-panther-anchor { position: relative; display: flex; justify-content: center; height: 200px; overflow: visible; }
.step-panther-img { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); height: 200px; z-index: 10; pointer-events: none; object-fit: contain; filter: drop-shadow(0 10px 25px rgba(0,0,0,0.5)); animation: step-panther-float 6s ease-in-out infinite; }

.how-step-wrapper:nth-child(1) .step-panther-img { animation-delay: 0s; }
.how-step-wrapper:nth-child(2) .step-panther-img { animation-delay: -1.5s; }
.how-step-wrapper:nth-child(3) .step-panther-img { animation-delay: -3s; }
.how-step-wrapper:nth-child(4) .step-panther-img { animation-delay: -4.5s; }
.how-step-wrapper:nth-child(5) .step-panther-img { animation-delay: -2s; }

@keyframes step-panther-float {
  0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
  50% { transform: translateX(-50%) translateY(-10px) scale(1.02); }
}

/* Trust Box & Redirect */
.section-trust { margin-bottom: 3rem; display: flex; justify-content: center; }
.section-redirect { margin-bottom: 6rem; display: flex; justify-content: center; }

.glass-panel {
  background: rgba(255,255,255,0.03); backdrop-filter: blur(15px);
  border: 1px solid rgba(212,175,55,0.2); border-radius: 20px;
  padding: 2rem 3rem; display: flex; align-items: center; gap: 1.5rem;
  max-width: 800px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.glass-panel-dark {
  background: linear-gradient(135deg, rgba(45,20,80,0.8), rgba(20,10,40,0.9));
  backdrop-filter: blur(25px);
  border: 1px solid rgba(142,245,210,0.2); border-radius: 20px;
  padding: 3rem; max-width: 800px; width: 100%; text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6), inset 0 0 30px rgba(142,245,210,0.05);
}

.trust-icon { background: rgba(212,175,55,0.1); padding: 1rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.trust-content h3 { color: #FFF; font-size: 1.3rem; margin-bottom: 0.3rem; font-family: 'Century Gothic', sans-serif; }
.trust-content p { color: #C4B8D8; margin: 0; font-size: 0.95rem; }

.redirect-content h3 { color: #FFF; font-size: 1.8rem; margin-bottom: 1rem; font-family: 'Century Gothic', sans-serif; text-shadow: 0 0 15px rgba(142,245,210,0.3); }
.redirect-content p { color: #C4B8D8; margin-bottom: 2rem; font-size: 1.05rem; }
.redirect-btn { display: inline-block; background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #1a0b36; padding: 12px 35px; border-radius: 50px; font-weight: bold; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 20px rgba(142,245,210,0.2); transition: all 0.3s; }
.redirect-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(142,245,210,0.4); }

/* CTA */
.section-cta { text-align: center; background: linear-gradient(135deg, #1a0a36, #2D1B54); border: 1px solid rgba(212,175,55,0.2); border-radius: 24px; padding: 5rem 2rem; position: relative; overflow: hidden; }
.section-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(212,175,55,0.1), transparent 60%); pointer-events: none; }
.section-cta h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: white; font-size: 2.2rem; margin-bottom: 1rem; }
.section-cta p { color: rgba(255,255,255,0.75); font-size: 1.1rem; margin-bottom: 2rem; }
.cta-btn { display: inline-flex; align-items: center; gap: 0.75rem; background: linear-gradient(135deg, #D4AF37, #AA8222); color: #1a0a36; padding: 1.2rem 3rem; border-radius: 50px; font-weight: bold; font-size: 1.1rem; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(212,175,55,0.4); cursor: pointer; position: relative; z-index: 2; }
.cta-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(212,175,55,0.5); }

@media (max-width: 1400px) {
  .how-steps { grid-template-columns: repeat(3, 1fr); }
  .how-step-wrapper:nth-child(4), .how-step-wrapper:nth-child(5) { grid-column: auto; }
}
@media (max-width: 900px) {
  .how-steps { grid-template-columns: repeat(2, 1fr); }
  .step-panther-img { height: 160px; }
  .step-panther-anchor { height: 160px; }
  .glass-panel { flex-direction: column; text-align: center; }
}
@media (max-width: 600px) { 
  .how-steps { grid-template-columns: 1fr; } 
  .step-panther-img { display: none; }
  .step-panther-anchor { height: 0; }
  .page-hero h1 { font-size: 2rem; } 
  .how-step { padding: 2rem 1.5rem; }
}
</style>
