<template>
  <Head>
    <title>Mein Coaching-Bereich – Alexander Tischler</title>
    <meta name="robots" content="noindex, nofollow" />
  </Head>

  <div class="at-dash-root" v-if="ready">
    <!-- ═══════ SIDEBAR (Optik: bestehender Kundenbereich) ═══════ -->
    <aside class="at-sidebar">
      <div class="at-sidebar-logo">
        <Link href="/alextischler.de" class="at-logo-row">
          <span class="at-logo-mark">AT</span>
          <span class="at-logo-text">ALEX<strong>TISCHLER</strong><em>COACHING</em></span>
        </Link>
      </div>

      <nav class="at-sidebar-nav">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="at-sidebar-link"
          :class="{ active: tab === item.id }"
          @click="tab = item.id"
        >
          <span v-html="item.icon"></span>
          {{ item.label }}
          <span v-if="item.badge" class="at-nav-badge">{{ item.badge }}</span>
        </button>
      </nav>

      <div class="at-sidebar-bottom">
        <div class="at-sidebar-user">
          <div class="at-user-avatar">MM</div>
          <div class="at-user-info">
            <strong>Max Mustermann</strong>
            <span>Premium Coaching 👑</span>
          </div>
        </div>
        <button class="at-sidebar-logout" @click="logout">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Abmelden
        </button>
      </div>
    </aside>

    <!-- ═══════ MAIN ═══════ -->
    <main class="at-dash-main">
      <!-- Kopf -->
      <div class="at-dash-header">
        <div>
          <div class="at-user-meta">
            <span class="at-royale-badge">Premium Coaching 👑</span>
            <span class="at-level-badge">Woche 12 von 24</span>
          </div>
          <h1>Willkommen, Max 👋</h1>
          <p>Dein persönlicher Coaching-Bereich bei Alexander Tischler</p>
        </div>
        <button class="at-btn-upgrade" @click="tab = 'checkins'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          Check-in einreichen
        </button>
      </div>

      <!-- News-Banner -->
      <div class="at-news-banner">
        <div class="at-news-icon">🧬</div>
        <div class="at-news-content">
          <strong>Deine Folgeanalyse ist in Auswertung!</strong>
          <span>Die Blutwerte vom 28.07. werden gerade aus Coaching-Sicht aufbereitet — Besprechung im Call am 07.08.</span>
        </div>
        <button class="at-news-btn" @click="tab = 'analysen'">Zur Analyse</button>
      </div>

      <!-- Stat-Karten -->
      <div class="at-stats-grid">
        <div class="at-stat-card" v-for="s in stats" :key="s.label">
          <div class="at-stat-icon" :class="s.color">{{ s.icon }}</div>
          <div class="at-stat-info">
            <span>{{ s.label }}</span>
            <strong>{{ s.value }}</strong>
            <em v-if="s.trend" :class="s.trendDir">{{ s.trend }}</em>
          </div>
        </div>
      </div>

      <!-- ═══ TAB: ÜBERSICHT ═══ -->
      <template v-if="tab === 'uebersicht'">
        <div class="at-main-grid">
          <div class="at-dash-card at-span-2">
            <div class="at-card-header">
              <h2>Gewichtsverlauf</h2>
              <span class="at-card-hint">Start: 94,2 kg · Ziel: 82,0 kg</span>
            </div>
            <svg class="at-chart" viewBox="0 0 640 180" preserveAspectRatio="none" aria-label="Gewichtsverlauf über 14 Wochen">
              <defs>
                <linearGradient id="atChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(212,175,55,0.3)"/>
                  <stop offset="100%" stop-color="rgba(212,175,55,0)"/>
                </linearGradient>
              </defs>
              <line v-for="g in 4" :key="g" x1="0" :y1="g * 36" x2="640" :y2="g * 36" stroke="rgba(45,27,84,0.08)" stroke-width="1"/>
              <path :d="areaPath" fill="url(#atChartFill)"/>
              <path :d="linePath" fill="none" stroke="#D4AF37" stroke-width="3" stroke-linecap="round"/>
              <circle :cx="lastPoint.x" :cy="lastPoint.y" r="5" fill="#D4AF37"/>
            </svg>
            <div class="at-chart-axis"><span>Woche 1</span><span>Woche 7</span><span>Woche 14</span></div>
          </div>

          <div class="at-dash-card">
            <div class="at-card-header"><h2>Nächster Termin</h2></div>
            <div class="at-termin">
              <div class="at-termin-date">
                <strong>07</strong>
                <span>AUG</span>
              </div>
              <div class="at-termin-info">
                <strong>Check-in-Call mit Alex</strong>
                <span>10:00 – 10:30 Uhr · Zoom</span>
                <span class="at-termin-topic">Thema: Besprechung Folgeanalyse</span>
              </div>
            </div>
            <div class="at-termin-actions">
              <button class="at-btn-sm">Termin verschieben</button>
            </div>
            <div class="at-card-header" style="margin-top: 1.6rem;"><h2>Wochen-Training</h2></div>
            <div class="at-week-bars">
              <div v-for="(d, i) in weekTraining" :key="i" class="at-week-col">
                <span class="at-week-bar" :class="{ done: d.done }" :style="{ height: d.pct + '%' }"></span>
                <span class="at-week-label">{{ d.day }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="at-main-grid">
          <div class="at-dash-card at-span-2">
            <div class="at-card-header">
              <h2>Meine Kurse</h2>
              <button class="at-card-link" @click="tab = 'kurse'">Alle ansehen</button>
            </div>
            <div class="at-course-mini" v-for="c in courses.slice(0, 3)" :key="c.title">
              <div class="at-course-mini-head">
                <strong>{{ c.title }}</strong>
                <span>{{ c.done }} / {{ c.total }} Lektionen</span>
              </div>
              <div class="at-progress"><span :style="{ width: (c.done / c.total * 100) + '%' }"></span></div>
            </div>
          </div>

          <div class="at-dash-card">
            <div class="at-card-header"><h2>Coach-Feedback</h2></div>
            <div class="at-feedback">
              <p>„Starke Woche, Max! Schlaf hat sich sichtbar verbessert — genau deshalb purzelt es gerade. Diese Woche: Protein-Fokus beibehalten."</p>
              <footer>— Alex · Check-in Woche 12</footer>
            </div>
          </div>
        </div>
      </template>

      <!-- ═══ TAB: ANALYSEN ═══ -->
      <template v-else-if="tab === 'analysen'">
        <div class="at-dash-card">
          <div class="at-card-header"><h2>Meine Blutwert-Analysen</h2></div>
          <div class="at-analyse" v-for="a in analysen" :key="a.title">
            <div class="at-analyse-head">
              <div>
                <strong>{{ a.title }}</strong>
                <span class="at-analyse-date">{{ a.date }} · {{ a.lab }}</span>
              </div>
              <span class="at-badge" :class="a.status === 'Ausgewertet' ? 'green' : 'amber'">{{ a.status }}</span>
            </div>
            <div v-if="a.marker" class="at-marker-grid">
              <div class="at-marker" v-for="m in a.marker" :key="m.name">
                <span class="at-marker-name">{{ m.name }}</span>
                <strong>{{ m.value }}</strong>
                <span class="at-badge sm" :class="m.ok ? 'green' : 'amber'">{{ m.ok ? 'Im Zielbereich' : 'Fokus' }}</span>
              </div>
            </div>
            <div class="at-analyse-foot">
              <button class="at-btn-sm" :disabled="a.status !== 'Ausgewertet'">
                {{ a.status === 'Ausgewertet' ? 'Auswertung als PDF' : 'Auswertung folgt' }}
              </button>
              <span v-if="a.note" class="at-analyse-note">{{ a.note }}</span>
            </div>
          </div>
          <p class="at-disclaimer">
            Blutabnahme und Laboranalyse erfolgen über Arzt bzw. Fachlabor. Die Auswertung hier
            ist eine Einordnung aus Coaching-Sicht (Training, Ernährung, Regeneration) — keine
            medizinische Beratung. Diagnosen und Behandlung gehören in ärztliche Hände.
          </p>
        </div>
      </template>

      <!-- ═══ TAB: KURSE ═══ -->
      <template v-else-if="tab === 'kurse'">
        <div class="at-course-grid">
          <div class="at-dash-card at-course-card" v-for="c in courses" :key="c.title">
            <div class="at-course-top">
              <span class="at-course-emoji">{{ c.icon }}</span>
              <span v-if="c.new" class="at-badge gold">Neu</span>
            </div>
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
            <div class="at-course-mini-head">
              <span>{{ c.done }} / {{ c.total }} Lektionen</span>
              <span>{{ Math.round(c.done / c.total * 100) }} %</span>
            </div>
            <div class="at-progress"><span :style="{ width: (c.done / c.total * 100) + '%' }"></span></div>
            <button class="at-btn-course">{{ c.done === 0 ? 'Kurs starten' : c.done === c.total ? 'Abgeschlossen ✓' : 'Fortsetzen' }}</button>
          </div>
        </div>
      </template>

      <!-- ═══ TAB: CHECK-INS ═══ -->
      <template v-else-if="tab === 'checkins'">
        <div class="at-dash-card">
          <div class="at-card-header">
            <h2>Meine Check-ins</h2>
            <button class="at-card-link">+ Neues Check-in</button>
          </div>
          <div class="at-checkin" v-for="ci in checkins" :key="ci.week">
            <div class="at-checkin-week">W{{ ci.week }}</div>
            <div class="at-checkin-body">
              <div class="at-checkin-head">
                <strong>{{ ci.date }}</strong>
                <span class="at-badge sm" :class="ci.status === 'Feedback erhalten' ? 'green' : 'amber'">{{ ci.status }}</span>
              </div>
              <div class="at-checkin-stats">
                <span>⚖️ {{ ci.weight }} kg</span>
                <span>🏋️ {{ ci.workouts }} Workouts</span>
                <span>😴 Ø {{ ci.sleep }} h Schlaf</span>
              </div>
              <p v-if="ci.feedback" class="at-checkin-feedback">💬 {{ ci.feedback }}</p>
            </div>
          </div>
        </div>
      </template>

      <!-- ═══ TAB: PROFIL ═══ -->
      <template v-else-if="tab === 'profil'">
        <div class="at-main-grid">
          <div class="at-dash-card">
            <div class="at-card-header"><h2>Mein Profil</h2></div>
            <div class="at-profile-row" v-for="p in profil" :key="p.label">
              <span>{{ p.label }}</span>
              <strong>{{ p.value }}</strong>
            </div>
          </div>
          <div class="at-dash-card">
            <div class="at-card-header"><h2>Mein Coaching-Paket</h2></div>
            <div class="at-paket">
              <span class="at-badge gold">👑 1:1 Premium Coaching</span>
              <div class="at-profile-row"><span>Status</span><strong class="at-green">Aktiv</strong></div>
              <div class="at-profile-row"><span>Start</span><strong>12.05.2026</strong></div>
              <div class="at-profile-row"><span>Laufzeit</span><strong>6 Monate (bis 12.11.2026)</strong></div>
              <div class="at-profile-row"><span>Betreuung</span><strong>Wöchentliche Check-ins · Antwort &lt; 24 h</strong></div>
            </div>
          </div>
          <div class="at-dash-card">
            <div class="at-card-header"><h2>Mein Ziel</h2></div>
            <div class="at-goal">
              <p>„Bis November 82 kg — und endlich wieder Energie für Familie und Job."</p>
              <div class="at-goal-progress">
                <div class="at-course-mini-head"><span>94,2 kg → 82,0 kg</span><span>64 %</span></div>
                <div class="at-progress"><span style="width: 64%"></span></div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <p class="at-demo-note">Demo-Ansicht mit Testdaten — kein echtes Kundenkonto.</p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';

const ready = ref(false);
const tab = ref('uebersicht');

onMounted(() => {
  if (sessionStorage.getItem('at-demo-auth') !== '1') {
    router.visit('/alextischler.de/login');
    return;
  }
  ready.value = true;
});

const logout = () => {
  sessionStorage.removeItem('at-demo-auth');
  router.visit('/alextischler.de');
};

const navItems = [
  { id: 'uebersicht', label: 'Übersicht', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
  { id: 'analysen', label: 'Meine Analysen', badge: '1', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3h6M10 3v6.3L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9.3V3"/><path d="M7 15h10"/></svg>' },
  { id: 'kurse', label: 'Meine Kurse', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15ZM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>' },
  { id: 'checkins', label: 'Check-ins', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>' },
  { id: 'profil', label: 'Mein Profil', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
];

const stats = [
  { icon: '⚖️', color: 'gold', label: 'Aktuelles Gewicht', value: '86,4 kg', trend: '▼ 7,8 kg seit Start', trendDir: 'down' },
  { icon: '📏', color: 'violet', label: 'Körperfett', value: '24,1 %', trend: '▼ 3,2 % seit Start', trendDir: 'down' },
  { icon: '🏋️', color: 'green', label: 'Trainingstreue', value: '92 %', trend: '▲ letzte 4 Wochen', trendDir: 'up' },
  { icon: '✅', color: 'blue', label: 'Check-ins', value: '12 / 12', trend: 'Alle abgegeben', trendDir: 'up' },
];

// Gewichtsverlauf (Testdaten, 14 Wochen)
const weights = [94.2, 93.6, 93.1, 92.2, 91.8, 91.0, 90.4, 89.9, 89.1, 88.6, 87.9, 87.2, 86.8, 86.4];
const points = computed(() => {
  const min = Math.min(...weights);
  const max = Math.max(...weights);
  const span = max - min || 1;
  return weights.map((w, i) => ({
    x: 12 + (i / (weights.length - 1)) * 616,
    y: 16 + ((max - w) / span) * 148,
  }));
});
const linePath = computed(() => points.value.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' '));
const areaPath = computed(() => `${linePath.value} L628,176 L12,176 Z`);
const lastPoint = computed(() => points.value[points.value.length - 1]);

const weekTraining = [
  { day: 'Mo', pct: 100, done: true },
  { day: 'Di', pct: 15, done: false },
  { day: 'Mi', pct: 100, done: true },
  { day: 'Do', pct: 15, done: false },
  { day: 'Fr', pct: 100, done: true },
  { day: 'Sa', pct: 70, done: true },
  { day: 'So', pct: 15, done: false },
];

const analysen = [
  {
    title: 'Folgeanalyse — großes Blutbild + Hormone',
    date: '28.07.2026', lab: 'Fachlabor München',
    status: 'In Auswertung',
    note: 'Besprechung im Check-in-Call am 07.08.',
  },
  {
    title: 'Eingangsanalyse — großes Blutbild + Hormone',
    date: '15.05.2026', lab: 'Fachlabor München',
    status: 'Ausgewertet',
    marker: [
      { name: 'Vitamin D', value: '21 ng/ml', ok: false },
      { name: 'Ferritin', value: '48 µg/l', ok: false },
      { name: 'TSH', value: '1,8 mU/l', ok: true },
      { name: 'HbA1c', value: '5,3 %', ok: true },
      { name: 'Omega-3-Index', value: '5,1 %', ok: false },
      { name: 'Magnesium', value: '0,86 mmol/l', ok: true },
    ],
  },
];

const courses = [
  { icon: '🥗', title: 'Grundlagen: Ernährung ohne Verzicht', desc: 'Das Fundament: Energiebilanz, Protein, Alltagstricks — ohne Verbote.', done: 8, total: 10 },
  { icon: '🧬', title: 'Hormon-Basics für Frauen 35+', desc: 'Schilddrüse, Zyklus, Cortisol: verstehen, was dein Gewicht wirklich steuert.', done: 3, total: 6 },
  { icon: '🏋️', title: 'Technik-Bibliothek: Training zuhause', desc: 'Alle Übungen deines Plans als Video — saubere Ausführung ohne Studio.', done: 12, total: 24 },
  { icon: '😴', title: 'Schlaf & Regeneration', desc: 'Der unterschätzte Hebel: besser schlafen, schneller erholen, leichter abnehmen.', done: 0, total: 5, new: true },
];

const checkins = [
  { week: 12, date: '28.07.2026', status: 'Feedback erhalten', weight: 86.4, workouts: 4, sleep: 7.1, feedback: 'Starke Woche! Schlaf-Trend beibehalten, Protein-Fokus diese Woche.' },
  { week: 11, date: '21.07.2026', status: 'Feedback erhalten', weight: 86.8, workouts: 5, sleep: 6.8, feedback: 'Trainingsvolumen top — achte aufs Deload am Wochenende.' },
  { week: 10, date: '14.07.2026', status: 'Feedback erhalten', weight: 87.2, workouts: 4, sleep: 6.5, feedback: 'Stresswoche gut gemeistert. Magnesium am Abend testen.' },
  { week: 9, date: '07.07.2026', status: 'Feedback erhalten', weight: 87.9, workouts: 3, sleep: 6.2, feedback: 'Urlaub eingeplant — Plan B hat funktioniert wie besprochen.' },
];

const profil = [
  { label: 'Name', value: 'Max Mustermann' },
  { label: 'E-Mail', value: 'demo@alextischler.de' },
  { label: 'Alter', value: '42 Jahre' },
  { label: 'Größe', value: '181 cm' },
  { label: 'Startgewicht', value: '94,2 kg (12.05.2026)' },
  { label: 'Trainingsort', value: 'Zuhause + Studio (2×/Woche)' },
  { label: 'Ernährungsform', value: 'Flexibel, keine Unverträglichkeiten' },
];
</script>

<style scoped>
/* ═══════ ROOT (Optik: bestehender Kundenbereich) ═══════ */
.at-dash-root {
  display: flex;
  min-height: 100vh;
  background: #f0ecfa;
  font-family: 'Century Gothic', system-ui, sans-serif;
}

/* ═══════ SIDEBAR ═══════ */
.at-sidebar {
  width: 260px; flex-shrink: 0;
  background: linear-gradient(180deg, #1a0a36 0%, #2D1B54 100%);
  display: flex; flex-direction: column;
  position: fixed; top: 0; left: 0; height: 100vh;
  border-right: 1px solid rgba(212, 175, 55, 0.2);
  z-index: 50;
}
.at-sidebar-logo { padding: 1.5rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
.at-logo-row { display: flex; align-items: center; gap: 0.7rem; text-decoration: none; }
.at-logo-mark {
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 12px;
  font-weight: 800; font-size: 1.05rem; color: #1a0a36;
  background: linear-gradient(135deg, #F4D068, #D4AF37 55%, #C9941A);
  box-shadow: 0 0 22px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.5);
}
.at-logo-text { display: flex; flex-direction: column; line-height: 1.05; color: #fff; font-size: 0.9rem; letter-spacing: 2px; }
.at-logo-text strong { color: #D4AF37; }
.at-logo-text em { font-style: normal; font-size: 0.52rem; letter-spacing: 4px; color: rgba(255,255,255,0.5); margin-top: 2px; }

.at-sidebar-nav { flex: 1; padding: 1.5rem 1rem; display: flex; flex-direction: column; gap: 0.25rem; overflow-y: auto; }
.at-sidebar-link {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.8rem 1rem; border-radius: 12px; border: 1px solid transparent;
  color: rgba(255,255,255,0.65); background: none;
  font-size: 0.95rem; font-weight: 500; font-family: inherit;
  cursor: pointer; text-align: left;
  transition: all 0.2s ease;
}
.at-sidebar-link:hover { background: rgba(255,255,255,0.08); color: #fff; }
.at-sidebar-link.active {
  background: linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1));
  color: #D4AF37;
  border-color: rgba(212,175,55,0.3);
}
.at-nav-badge {
  margin-left: auto;
  min-width: 20px; height: 20px; padding: 0 6px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 10px;
  background: #D4AF37; color: #1a0a36;
  font-size: 0.7rem; font-weight: 800;
}

.at-sidebar-bottom { padding: 1.25rem 1rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 0.75rem; }
.at-sidebar-user { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 12px; background: rgba(255,255,255,0.05); }
.at-user-avatar {
  width: 38px; height: 38px; border-radius: 50%;
  background: linear-gradient(135deg, #D4AF37, #AA8222);
  color: #1a0a36; font-weight: 900; font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.at-user-info { display: flex; flex-direction: column; gap: 1px; }
.at-user-info strong { color: #fff; font-size: 0.88rem; line-height: 1.2; }
.at-user-info span { color: rgba(255,255,255,0.4); font-size: 0.72rem; }
.at-sidebar-logout {
  display: flex; align-items: center; gap: 0.6rem;
  width: 100%; padding: 0.7rem 1rem;
  background: none; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
  color: rgba(255,255,255,0.5); font-size: 0.88rem; font-family: inherit;
  cursor: pointer; transition: all 0.2s ease;
}
.at-sidebar-logout:hover { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.4); color: #f87171; }

/* ═══════ MAIN ═══════ */
.at-dash-main { flex: 1; margin-left: 260px; min-height: 100vh; padding: 2.5rem; }

.at-dash-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.at-user-meta { display: flex; gap: 0.6rem; margin-bottom: 0.6rem; flex-wrap: wrap; }
.at-royale-badge {
  padding: 5px 14px; border-radius: 20px;
  background: linear-gradient(135deg, #F4D068, #D4AF37);
  color: #1a0a36; font-size: 0.75rem; font-weight: 800;
}
.at-level-badge {
  padding: 5px 14px; border-radius: 20px;
  background: rgba(45,27,84,0.1); border: 1px solid rgba(45,27,84,0.2);
  color: #2D1B54; font-size: 0.75rem; font-weight: 700;
}
.at-dash-header h1 { color: #1a0a36; font-size: 1.9rem; font-weight: 800; margin: 0 0 0.3rem; }
.at-dash-header p { color: #6b5f85; margin: 0; font-size: 0.95rem; }
.at-btn-upgrade {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.85rem 1.5rem; border-radius: 12px; border: none;
  background: linear-gradient(135deg, #F4D068, #D4AF37 55%, #C9941A);
  color: #1a0a36; font-weight: 800; font-size: 0.92rem; font-family: inherit;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.5);
  transition: all 0.25s ease;
}
.at-btn-upgrade:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(212,175,55,0.5), inset 0 1px 0 rgba(255,255,255,0.5); }

.at-news-banner {
  display: flex; align-items: center; gap: 1.1rem;
  background: linear-gradient(120deg, #2D1B54, #1a0a36);
  border: 1px solid rgba(212,175,55,0.3);
  border-radius: 16px; padding: 1.1rem 1.4rem; margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.at-news-icon { font-size: 1.8rem; }
.at-news-content { flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: 0.15rem; }
.at-news-content strong { color: #fff; font-size: 0.95rem; }
.at-news-content span { color: rgba(255,255,255,0.6); font-size: 0.82rem; }
.at-news-btn {
  padding: 0.6rem 1.2rem; border-radius: 10px; border: 1px solid rgba(212,175,55,0.5);
  background: rgba(212,175,55,0.15); color: #D4AF37;
  font-weight: 700; font-size: 0.85rem; font-family: inherit; cursor: pointer;
  transition: all 0.25s ease;
}
.at-news-btn:hover { background: rgba(212,175,55,0.3); }

/* Stats */
.at-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
.at-stat-card {
  display: flex; align-items: center; gap: 0.9rem;
  background: #fff; border-radius: 16px; padding: 1.2rem 1.3rem;
  box-shadow: 0 4px 18px rgba(45,27,84,0.07);
}
.at-stat-icon {
  width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 1.35rem;
}
.at-stat-icon.gold { background: rgba(212,175,55,0.15); }
.at-stat-icon.violet { background: rgba(124,58,237,0.12); }
.at-stat-icon.green { background: rgba(16,185,129,0.12); }
.at-stat-icon.blue { background: rgba(59,130,246,0.12); }
.at-stat-info { display: flex; flex-direction: column; gap: 1px; }
.at-stat-info span { color: #6b5f85; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.at-stat-info strong { color: #1a0a36; font-size: 1.35rem; font-weight: 800; }
.at-stat-info em { font-style: normal; font-size: 0.72rem; font-weight: 700; }
.at-stat-info em.down { color: #10b981; }
.at-stat-info em.up { color: #10b981; }

/* Cards & Grids */
.at-main-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-bottom: 1.2rem; }
.at-span-2 { grid-column: span 2; }
.at-dash-card {
  background: #fff; border-radius: 18px; padding: 1.5rem 1.6rem;
  box-shadow: 0 4px 18px rgba(45,27,84,0.07);
}
.at-card-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.1rem; }
.at-card-header h2 { color: #1a0a36; font-size: 1.05rem; font-weight: 800; margin: 0; }
.at-card-hint { color: #6b5f85; font-size: 0.78rem; }
.at-card-link {
  background: none; border: none; padding: 0;
  color: #7C3AED; font-size: 0.85rem; font-weight: 700; font-family: inherit; cursor: pointer;
}
.at-card-link:hover { text-decoration: underline; }

.at-chart { width: 100%; height: 180px; display: block; }
.at-chart-axis { display: flex; justify-content: space-between; margin-top: 0.4rem; color: #a79bc4; font-size: 0.72rem; }

/* Termin */
.at-termin { display: flex; gap: 1rem; align-items: center; }
.at-termin-date {
  width: 62px; height: 66px; border-radius: 14px; flex-shrink: 0;
  background: linear-gradient(135deg, #2D1B54, #1a0a36);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: #fff;
}
.at-termin-date strong { font-size: 1.4rem; line-height: 1; color: #D4AF37; }
.at-termin-date span { font-size: 0.68rem; letter-spacing: 2px; }
.at-termin-info { display: flex; flex-direction: column; gap: 0.15rem; }
.at-termin-info strong { color: #1a0a36; font-size: 0.95rem; }
.at-termin-info span { color: #6b5f85; font-size: 0.8rem; }
.at-termin-topic { color: #7C3AED !important; font-weight: 600; }
.at-termin-actions { margin-top: 0.9rem; }

.at-btn-sm {
  padding: 0.55rem 1.1rem; border-radius: 10px;
  border: 1px solid rgba(124,58,237,0.35);
  background: rgba(124,58,237,0.07); color: #7C3AED;
  font-weight: 700; font-size: 0.82rem; font-family: inherit; cursor: pointer;
  transition: all 0.25s ease;
}
.at-btn-sm:hover:not(:disabled) { background: rgba(124,58,237,0.15); }
.at-btn-sm:disabled { opacity: 0.5; cursor: default; }

/* Wochen-Training */
.at-week-bars { display: flex; align-items: flex-end; gap: 0.55rem; height: 90px; }
.at-week-col { flex: 1; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 0.3rem; }
.at-week-bar {
  width: 100%; border-radius: 6px 6px 3px 3px;
  background: rgba(45,27,84,0.12);
  min-height: 10%;
}
.at-week-bar.done { background: linear-gradient(180deg, #D4AF37, #AA8222); }
.at-week-label { color: #6b5f85; font-size: 0.68rem; font-weight: 700; }

/* Kurse */
.at-course-mini { margin-bottom: 1rem; }
.at-course-mini-head { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 0.4rem; }
.at-course-mini-head strong { color: #1a0a36; font-size: 0.9rem; }
.at-course-mini-head span { color: #6b5f85; font-size: 0.78rem; }
.at-progress {
  height: 8px; border-radius: 6px; background: rgba(45,27,84,0.08); overflow: hidden;
}
.at-progress span {
  display: block; height: 100%; border-radius: 6px;
  background: linear-gradient(90deg, #7C3AED, #D4AF37);
}
.at-course-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.2rem; }
.at-course-card h3 { color: #1a0a36; font-size: 1.05rem; font-weight: 800; margin: 0.7rem 0 0.4rem; }
.at-course-card p { color: #6b5f85; font-size: 0.85rem; line-height: 1.55; margin: 0 0 1rem; }
.at-course-top { display: flex; justify-content: space-between; align-items: center; }
.at-course-emoji { font-size: 1.9rem; }
.at-btn-course {
  margin-top: 1rem; width: 100%;
  padding: 0.75rem; border-radius: 11px; border: none;
  background: linear-gradient(135deg, #2D1B54, #1a0a36);
  color: #fff; font-weight: 700; font-size: 0.88rem; font-family: inherit; cursor: pointer;
  transition: all 0.25s ease;
}
.at-btn-course:hover { box-shadow: 0 8px 20px rgba(45,27,84,0.3); transform: translateY(-1px); }

/* Feedback */
.at-feedback p { color: #1a0a36; font-size: 0.92rem; line-height: 1.65; margin: 0 0 0.7rem; }
.at-feedback footer { color: #6b5f85; font-size: 0.8rem; }

/* Badges */
.at-badge {
  padding: 5px 13px; border-radius: 16px;
  font-size: 0.75rem; font-weight: 800; white-space: nowrap;
}
.at-badge.sm { padding: 3px 10px; font-size: 0.68rem; }
.at-badge.green { background: rgba(16,185,129,0.12); color: #059669; }
.at-badge.amber { background: rgba(245,158,11,0.14); color: #b45309; }
.at-badge.gold { background: linear-gradient(135deg, #F4D068, #D4AF37); color: #1a0a36; }

/* Analysen */
.at-analyse { border: 1px solid rgba(45,27,84,0.1); border-radius: 14px; padding: 1.2rem 1.3rem; margin-bottom: 1rem; }
.at-analyse-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
.at-analyse-head strong { color: #1a0a36; font-size: 0.95rem; display: block; }
.at-analyse-date { color: #6b5f85; font-size: 0.78rem; }
.at-marker-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; margin-top: 1rem; }
.at-marker {
  background: #f7f4fd; border-radius: 11px; padding: 0.8rem 0.9rem;
  display: flex; flex-direction: column; gap: 0.25rem; align-items: flex-start;
}
.at-marker-name { color: #6b5f85; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.at-marker strong { color: #1a0a36; font-size: 1rem; }
.at-analyse-foot { display: flex; align-items: center; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
.at-analyse-note { color: #6b5f85; font-size: 0.8rem; }
.at-disclaimer {
  margin: 1.2rem 0 0; padding: 0.9rem 1.1rem; border-radius: 12px;
  background: #f7f4fd; color: #6b5f85; font-size: 0.78rem; line-height: 1.6;
}

/* Check-ins */
.at-checkin { display: flex; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid rgba(45,27,84,0.08); }
.at-checkin:last-child { border-bottom: none; }
.at-checkin-week {
  width: 46px; height: 46px; border-radius: 12px; flex-shrink: 0;
  background: linear-gradient(135deg, #2D1B54, #1a0a36);
  color: #D4AF37; font-weight: 800; font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center;
}
.at-checkin-body { flex: 1; }
.at-checkin-head { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.35rem; }
.at-checkin-head strong { color: #1a0a36; font-size: 0.9rem; }
.at-checkin-stats { display: flex; gap: 1.1rem; flex-wrap: wrap; color: #6b5f85; font-size: 0.82rem; margin-bottom: 0.35rem; }
.at-checkin-feedback { margin: 0; color: #2D1B54; font-size: 0.85rem; line-height: 1.5; }

/* Profil */
.at-profile-row {
  display: flex; justify-content: space-between; gap: 1rem;
  padding: 0.65rem 0; border-bottom: 1px solid rgba(45,27,84,0.07);
}
.at-profile-row:last-child { border-bottom: none; }
.at-profile-row span { color: #6b5f85; font-size: 0.85rem; }
.at-profile-row strong { color: #1a0a36; font-size: 0.88rem; text-align: right; }
.at-green { color: #059669 !important; }
.at-paket { display: flex; flex-direction: column; gap: 0.3rem; }
.at-paket .at-badge { align-self: flex-start; margin-bottom: 0.6rem; }
.at-goal p { color: #1a0a36; font-size: 0.95rem; line-height: 1.6; margin: 0 0 1rem; font-style: italic; }

.at-demo-note { text-align: center; color: #a79bc4; font-size: 0.75rem; margin: 1.5rem 0 0; }

/* ═══════ RESPONSIVE ═══════ */
@media (max-width: 1100px) {
  .at-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .at-main-grid { grid-template-columns: 1fr; }
  .at-span-2 { grid-column: span 1; }
  .at-course-grid { grid-template-columns: 1fr; }
  .at-marker-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .at-sidebar { width: 220px; }
  .at-dash-main { margin-left: 220px; padding: 1.5rem; }
}
@media (max-width: 650px) {
  .at-sidebar {
    position: static; width: 100%; height: auto;
    flex-direction: row; align-items: center; flex-wrap: wrap;
    border-right: none; border-bottom: 1px solid rgba(212,175,55,0.2);
  }
  .at-sidebar-logo { border-bottom: none; padding: 1rem; }
  .at-sidebar-nav { flex-direction: row; flex-wrap: wrap; padding: 0.5rem 1rem 1rem; gap: 0.4rem; }
  .at-sidebar-link { padding: 0.55rem 0.8rem; font-size: 0.82rem; }
  .at-sidebar-bottom { display: none; }
  .at-dash-root { flex-direction: column; }
  .at-dash-main { margin-left: 0; padding: 1.2rem; }
  .at-stats-grid { grid-template-columns: 1fr; }
}
</style>
