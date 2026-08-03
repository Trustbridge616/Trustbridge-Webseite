<template>
  <div>
    <!-- ── CTA-Band ── -->
    <section class="aw-ctaband">
      <div class="aw-ctaband-inner" v-reveal>
        <div class="aw-ctaband-glow" aria-hidden="true"></div>
        <h2>Bereit für einen Plan, der endlich zu dir passt?</h2>
        <p>Starte mit einem ehrlichen Gespräch — kostenlos, unverbindlich und ohne Verkaufsdruck.</p>
        <button class="aw-ctaband-btn" @click="scrollTo('analyse')">
          <span class="aw-ctaband-glare" aria-hidden="true"></span>
          Kostenlos herausfinden, wo ich stehe
        </button>
        <span class="aw-ctaband-micro">2-Minuten-Quiz · Danach Wunschtermin wählen · Kein Abo</span>
        <p class="aw-ctaband-urgency">
          Es gibt hier keinen Countdown und keine „nur noch 2 Plätze"-Anzeige. Aber eines
          stimmt trotzdem: Jede Woche Warten ist eine Woche im alten Muster. Das Gespräch
          kostet dich nichts außer 30 Minuten — die einzige Frage ist, ob du sie diese
          Woche investierst oder nächstes Jahr.
        </p>
      </div>
    </section>

    <!-- ── FAQ ── -->
    <section id="faq" class="aw-faq">
      <div class="aw-faq-head" v-reveal>
        <span class="aw-sec-tag">HÄUFIGE FRAGEN</span>
        <h2>Alles, was du vor dem Start wissen willst</h2>
      </div>

      <div class="aw-faq-grid">
        <div v-for="(col, ci) in faqColumns" :key="ci" class="aw-faq-col">
          <div
            v-for="f in col"
            :key="f.id"
            class="aw-faq-item"
            :class="{ open: openFaq === f.id }"
            v-reveal
          >
            <button class="aw-faq-q" @click="toggle(f.id)" :aria-expanded="openFaq === f.id">
              {{ f.q }}
              <svg class="aw-faq-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            <div class="aw-faq-a-wrap">
              <div class="aw-faq-a"><p>{{ f.a }}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Footer ── -->
    <footer class="aw-footer">
      <div class="aw-footer-inner">
        <div class="aw-footer-brand">
          <span class="aw-footer-mark">AT</span>
          <div>
            <strong>Alexander Tischler</strong>
            <span>Ernährung & Fitness Coaching</span>
          </div>
        </div>
        <p class="aw-footer-claim">Für die, die mehr vom Leben wollen.</p>
        <div class="aw-footer-links">
          <a href="https://alextischler.de" target="_blank" rel="noopener">alextischler.de</a>
          <a href="mailto:hallo@alextischler.de">hallo@alextischler.de</a>
          <a href="https://www.instagram.com/alex.tischler_/" target="_blank" rel="noopener">Instagram</a>
          <a href="https://alextischler.de/impressum/" target="_blank" rel="noopener">Impressum</a>
          <a href="https://alextischler.de/datenschutz/" target="_blank" rel="noopener">Datenschutz</a>
        </div>
        <p class="aw-footer-disclaimer">
          Ergebnisse sind individuell und hängen von Ausgangslage, Gesundheit und persönlichem
          Einsatz ab. Das Coaching — einschließlich der Besprechung von Blutwerten im Rahmen
          der Ernährungs- und Trainingsplanung — ist keine medizinische oder heilkundliche
          Leistung, stellt keine Diagnosen und ersetzt keine ärztliche Beratung oder Behandlung.
          Bei gesundheitlichen Beschwerden oder bestehenden Erkrankungen sprich bitte zuerst
          mit deinem Arzt oder deiner Ärztin.
        </p>
        <span class="aw-footer-copy">© {{ year }} Alexander Tischler · Alle Rechte vorbehalten</span>
      </div>
    </footer>

    <!-- ── Mobile Sticky-CTA ── -->
    <transition name="aw-sticky">
      <button v-if="showSticky" class="aw-sticky-cta" @click="scrollTo('analyse')">
        Gratis-Analyse (2 Min.)
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { vReveal } from './useReveal';

const faqs = [
  { q: 'Wie kann ich anfangen?', a: 'Buche dir über den Button ein kostenloses Analyse-Gespräch. Dort lernen wir uns kennen, schauen auf deine Situation und du entscheidest danach in Ruhe, ob das Coaching zu dir passt.' },
  { q: 'Wie lange dauert es, bis ich Ergebnisse sehe?', a: 'Viele Kunden spüren erste Veränderungen — mehr Energie, besserer Schlaf — bereits in der ersten Woche. Sichtbare körperliche Veränderungen brauchen je nach Ausgangslage einige Wochen. Ein festes Versprechen wäre unseriös.' },
  { q: 'Kann ich das Coaching in meinen Alltag integrieren?', a: 'Genau dafür ist es gebaut. Der Plan richtet sich nach deinem Kalender, nicht umgekehrt — schon 2 Stunden pro Woche reichen für den Einstieg.' },
  { q: 'Was kostet das Coaching?', a: 'Das Coaching ist individuell — deshalb gibt es keinen Pauschalpreis von der Stange. Im kostenlosen Gespräch bekommst du ein transparentes Angebot, das zu deinem Ziel und Umfang passt. Du erfährst den Preis, bevor du dich entscheidest — ohne Kleingedrucktes, und du darfst dir Bedenkzeit nehmen.' },
  { q: 'Was hat es mit den Blutwert- und Hormon-Analysen auf sich?', a: 'Gezielte Blutwert-Analysen helfen mir, deinen Ernährungs- und Trainingsplan an deinen tatsächlichen Nährstoff- und Hormonstatus anzupassen — statt nach Schema F zu arbeiten. Wichtig und ganz offen: Ich bin Coach, kein Arzt. Ich stelle keine Diagnosen und behandle keine Erkrankungen. Bei auffälligen Werten oder Beschwerden ist dein Arzt oder deine Ärztin immer die erste Anlaufstelle — bei bestehenden Diagnosen wie Schilddrüsen-Erkrankungen arbeite ich ergänzend zur ärztlichen Betreuung, niemals an ihrer Stelle.' },
  { q: 'Ich bin sehr unsportlich — bin ich trotzdem geeignet?', a: 'Ja. Die meisten starten nicht als Sportler, sondern als Menschen mit vollem Alltag. Das Programm holt dich genau da ab, wo du gerade stehst.' },
  { q: 'Was mache ich, wenn ich während des Coachings Fragen habe?', a: 'Du schreibst einfach über die App. Du bekommst innerhalb von 24 Stunden eine persönliche Antwort — kein Bot, kein Support-Ticket.' },
  { q: 'Was ist, wenn ich nicht zufrieden bin?', a: 'Dann reden wir offen darüber und passen das Programm an. Ehrliches Feedback ist ausdrücklich erwünscht — das Coaching lebt von der 1:1-Beziehung.' },
  { q: 'Wie lange geht das Coaching?', a: 'Empfohlen sind mindestens 3 Monate — nachhaltige Veränderung braucht Zeit. Danach entscheidest du, ob du weitermachen möchtest.' },
  { q: 'Muss ich mich im Fitnessstudio anmelden?', a: 'Nein. Das Training funktioniert auch komplett von zu Hause — dein Plan wird an deine Möglichkeiten und dein Equipment angepasst.' },
  { q: 'Ich esse vegetarisch / vegan — geht das?', a: 'Ja, selbstverständlich. Deine Ernährungsform, Unverträglichkeiten und Vorlieben werden vollständig berücksichtigt.' },
];

const faqColumns = computed(() => {
  const half = Math.ceil(faqs.length / 2);
  const withIds = faqs.map((f, i) => ({ ...f, id: i }));
  return [withIds.slice(0, half), withIds.slice(half)];
});

const openFaq = ref(null);
const toggle = (id) => { openFaq.value = openFaq.value === id ? null : id; };

// Sticky-CTA: nur Mobile, erst nach dem Hero, nicht über dem Footer nötig
const showSticky = ref(false);
const onScroll = () => {
  const isMobile = window.innerWidth < 900;
  showSticky.value = isMobile && window.scrollY > 700;
};
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onScroll);
});

const year = new Date().getFullYear();

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
</script>

<style scoped>
/* ── CTA-Band ── */
.aw-ctaband {
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto;
  padding: 4rem 1.5rem 2rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-ctaband-inner {
  position: relative; overflow: hidden;
  text-align: center;
  background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(30,20,50,0.85) 55%, rgba(142,245,210,0.12));
  border: 1px solid rgba(142,245,210,0.35);
  border-radius: 32px;
  padding: 4rem 2.5rem;
  box-shadow: 0 35px 85px rgba(0,0,0,0.65), inset 0 0 80px rgba(124,58,237,0.12);
}
.aw-ctaband-glow {
  position: absolute; top: -70%; left: 30%; width: 40%; height: 240%;
  background: radial-gradient(ellipse, rgba(142,245,210,0.16) 0%, transparent 70%);
  transform: rotate(25deg); pointer-events: none;
}
.aw-ctaband-inner h2 { color: #F8FAFC; font-size: 2.4rem; font-weight: 800; margin: 0 0 0.9rem; line-height: 1.25; }
.aw-ctaband-inner p { color: #D9CFE8; font-size: 1.12rem; margin: 0 0 2rem; }
.aw-ctaband-btn {
  position: relative; overflow: hidden;
  padding: 1.25rem 3rem; border-radius: 18px; border: none;
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6);
  color: #052018; font-weight: 800; font-size: 1.2rem; font-family: inherit;
  cursor: pointer;
  box-shadow: 0 18px 42px rgba(142,245,210,0.35), inset 0 2px 0 rgba(255,255,255,0.5);
  transition: all 0.3s ease;
}
.aw-ctaband-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 24px 55px rgba(142,245,210,0.5), inset 0 2px 0 rgba(255,255,255,0.5); }
.aw-ctaband-glare {
  position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
  transform: skewX(-20deg); animation: awBandGlare 4s infinite;
}
@keyframes awBandGlare { 0%, 50% { left: -100%; } 100% { left: 200%; } }
.aw-ctaband-micro { display: block; margin-top: 1rem; color: rgba(217,207,232,0.75); font-size: 0.85rem; }
.aw-ctaband-urgency {
  max-width: 620px;
  margin: 1.8rem auto 0 !important;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: rgba(217,207,232,0.85) !important;
  font-size: 0.95rem !important;
  line-height: 1.65;
}

/* ── FAQ ── */
.aw-faq {
  position: relative; z-index: 2;
  max-width: 1140px; margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.aw-faq-head { text-align: center; margin-bottom: 3rem; }
.aw-sec-tag {
  display: inline-block;
  font-size: 0.76rem; font-weight: 800; letter-spacing: 4px;
  color: #8EF5D2; text-shadow: 0 0 20px rgba(142,245,210,0.6);
  margin-bottom: 1rem;
}
.aw-faq-head h2 { color: #F8FAFC; font-size: 2.5rem; font-weight: 800; margin: 0; line-height: 1.2; }

.aw-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2rem; align-items: start; }
.aw-faq-item {
  position: relative;
  background: rgba(26, 15, 46, 0.5);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  margin-bottom: 1rem;
  overflow: hidden;
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-faq-item:hover { background: rgba(35, 20, 60, 0.6); border-color: rgba(255,255,255,0.15); }
.aw-faq-item.open {
  background: rgba(60, 40, 95, 0.6);
  border-color: rgba(142,245,210,0.5);
  box-shadow: 0 22px 45px rgba(0,0,0,0.6), inset 0 0 35px rgba(142,245,210,0.08), 0 0 20px rgba(142,245,210,0.12);
  transform: translateY(-3px);
}
.aw-faq-q {
  width: 100%;
  padding: 1.45rem 1.6rem;
  background: none; border: none;
  color: #F8FAFC; font-size: 1.05rem; font-weight: 800; font-family: inherit;
  text-align: left;
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  cursor: pointer;
}
.aw-faq-chev { color: rgba(255,255,255,0.4); flex-shrink: 0; transition: all 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); }
.aw-faq-item.open .aw-faq-chev { transform: rotate(180deg); color: #8EF5D2; filter: drop-shadow(0 0 8px rgba(142,245,210,0.5)); }
.aw-faq-a-wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
.aw-faq-item.open .aw-faq-a-wrap { grid-template-rows: 1fr; }
.aw-faq-a { overflow: hidden; }
.aw-faq-a p {
  padding: 0.2rem 1.6rem 1.6rem;
  margin: 0;
  color: #E7DFF3; font-size: 0.96rem; line-height: 1.7;
  opacity: 0; transform: translateY(12px);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.aw-faq-item.open .aw-faq-a p { opacity: 1; transform: translateY(0); transition-delay: 0.12s; }

/* ── Footer ── */
.aw-footer {
  position: relative; z-index: 2;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 3.5rem 1.5rem 7rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
  background: linear-gradient(180deg, transparent, rgba(11,17,21,0.85));
}
.aw-footer-inner {
  max-width: 900px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center; gap: 1.1rem;
  text-align: center;
}
.aw-footer-brand { display: flex; align-items: center; gap: 0.9rem; }
.aw-footer-mark {
  width: 46px; height: 46px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 13px;
  font-weight: 800; font-size: 1.1rem; color: #0F172A;
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6);
  box-shadow: 0 0 24px rgba(142,245,210,0.35);
}
.aw-footer-brand div { display: flex; flex-direction: column; text-align: left; }
.aw-footer-brand strong { color: #F8FAFC; font-size: 1.05rem; }
.aw-footer-brand span { color: #D9CFE8; font-size: 0.8rem; }
.aw-footer-claim {
  color: #8EF5D2; font-size: 1.05rem; font-weight: 700; margin: 0;
  text-shadow: 0 0 18px rgba(142,245,210,0.4);
  letter-spacing: 1px;
}
.aw-footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem 1.6rem; }
.aw-footer-links a {
  color: #D9CFE8; text-decoration: none; font-size: 0.88rem; font-weight: 600;
  transition: color 0.3s ease;
}
.aw-footer-links a:hover { color: #8EF5D2; }
.aw-footer-disclaimer {
  color: rgba(217,207,232,0.75); font-size: 0.78rem; line-height: 1.6;
  max-width: 640px; margin: 0.4rem 0 0;
}
.aw-footer-copy { color: rgba(217,207,232,0.7); font-size: 0.75rem; }

/* ── Mobile Sticky-CTA ── */
.aw-sticky-cta {
  position: fixed;
  left: 1rem; right: 1rem; bottom: 1rem;
  z-index: 80;
  padding: 1.1rem; border-radius: 16px; border: none;
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6);
  color: #052018; font-weight: 800; font-size: 1.08rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
  cursor: pointer;
  box-shadow: 0 18px 45px rgba(0,0,0,0.6), 0 0 35px rgba(142,245,210,0.4);
}
.aw-sticky-enter-active, .aw-sticky-leave-active { transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); }
.aw-sticky-enter-from, .aw-sticky-leave-to { opacity: 0; transform: translateY(80px); }

@media (max-width: 900px) {
  .aw-faq-grid { grid-template-columns: 1fr; }
  .aw-ctaband-inner { padding: 3rem 1.6rem; }
  .aw-ctaband-inner h2 { font-size: 1.8rem; }
  .aw-faq-head h2 { font-size: 1.9rem; }
}
@media (min-width: 900px) {
  .aw-footer { padding-bottom: 3.5rem; }
}
</style>
