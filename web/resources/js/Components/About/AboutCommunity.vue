<template>
  <section class="about-section">
    <div class="about-container">
      <div class="section-header">
        <span class="section-tag">Community</span>
        <h2>Gemeinsam wachsen</h2>
      </div>
      <div class="growth-intro">
        <p>Trustbridge ist mehr als eine Plattform. Es ist ein <strong>Kreislauf</strong>.</p>
      </div>
      <div class="cycle-grid">
        <div class="cycle-step" v-for="(c, i) in cycle" :key="i">
          <div class="cycle-num">{{ i + 1 }}</div>
          <p>{{ c }}</p>
          <div class="cycle-arrow" v-if="i < cycle.length - 1">↓</div>
        </div>
      </div>
      <div class="nature-quote">
        <span class="quote-icon">🌱</span>
        <p><em>In der Natur sieht man es ganz einfach: Alles, was nicht wächst, verwelkt.</em></p>
      </div>
      <div class="community-content">
        <p>Deshalb möchten wir gemeinsam mit euch wachsen. Nicht durch leere Versprechen, sondern durch echte Ware, ehrliches Feedback und eine Community, die mitgestaltet.</p>
        <p>Wir möchten eine Gemeinschaft aufbauen, in der Kunden ihre Erfahrungen teilen können:</p>
      </div>
      <div class="community-grid">
        <div class="comm-card" v-for="q in questions" :key="q.icon">
          <span class="comm-icon">{{ q.icon }}</span>
          <p>{{ q.text }}</p>
        </div>
      </div>
      <div class="telegram-note">
        <p>Dafür planen wir auch Community-Bereiche, zum Beispiel über <strong>Telegram</strong> oder andere Kanäle. Dort könnt ihr euch austauschen, Wünsche äußern, Rückmeldung geben oder sogar Waren untereinander tauschen.</p>
        <p class="small-note">Denn manchmal passt ein Produkt nicht zu dir — aber perfekt zu jemand anderem. So entsteht aus einer einfachen Box eine lebendige Community.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const cycle = [
  'Je mehr Menschen mitmachen, desto besser können wir einkaufen.',
  'Je besser wir einkaufen, desto bessere Ware können wir anbieten.',
  'Je zufriedener unsere Kunden sind, desto eher kommen sie wieder.',
  'Je mehr Menschen wiederkommen, desto stärker wächst das ganze System.',
];
const questions = [
  { icon: '⭐', text: 'Welche Ware war gut?' },
  { icon: '⚡', text: 'Was verkauft sich schnell?' },
  { icon: '🎯', text: 'Welche Kategorien werden gewünscht?' },
  { icon: '🔧', text: 'Was soll verbessert werden?' },
  { icon: '🏪', text: 'Welche Artikel eignen sich für Flohmarkt?' },
  { icon: '🛒', text: 'Welche eher für Online-Verkauf?' },
];
</script>

<style scoped>
.about-section { padding: 5rem 2rem; background: #f8f6ff; }
.about-container { max-width: 1340px; margin: 0 auto; }
.section-header { text-align: center; margin-bottom: 2rem; }
.section-tag {
  display: inline-block; background: rgba(212,175,55,0.12); color: #D4AF37;
  border: 1px solid rgba(212,175,55,0.35); padding: 0.3rem 1rem;
  border-radius: 50px; font-size: 0.82rem; font-weight: bold;
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;
}
.section-header h2 {
  font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54;
  font-size: 2.2rem; background: none; -webkit-text-fill-color: #2D1B54;
}
.growth-intro {
  text-align: center; margin-bottom: 3rem;
}
.growth-intro p {
  color: #4a3870; font-size: 1.2rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.growth-intro strong { color: #2D1B54; }
.cycle-grid {
  display: flex; flex-direction: column; align-items: center;
  gap: 0; margin-bottom: 3rem;
}
.cycle-step {
  background: white; border-radius: 16px; padding: 1.5rem 2.5rem;
  box-shadow: 0 6px 20px rgba(45,27,84,0.06);
  border: 1px solid rgba(212,175,55,0.12);
  max-width: 600px; width: 100%; text-align: center;
  position: relative;
}
.cycle-num {
  position: absolute; left: -15px; top: 50%; transform: translateY(-50%);
  width: 30px; height: 30px; border-radius: 50%;
  background: linear-gradient(135deg, #2D1B54, #4a238a);
  color: #D4AF37; font-weight: bold; font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cycle-step p {
  color: #4a3870; font-size: 1rem; line-height: 1.6; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.cycle-arrow {
  color: #D4AF37; font-size: 1.2rem; padding: 0.5rem 0;
  font-weight: bold;
}
.nature-quote {
  display: flex; align-items: center; justify-content: center;
  gap: 1rem; margin-bottom: 3rem; padding: 1.5rem 2rem;
  background: rgba(212,175,55,0.08); border-radius: 16px;
  border: 1px solid rgba(212,175,55,0.15); max-width: 600px; margin-left: auto; margin-right: auto;
}
.quote-icon { font-size: 2rem; }
.nature-quote p {
  color: #4a3870; font-size: 1.05rem; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.community-content {
  text-align: center; max-width: 800px; margin: 0 auto 2rem;
}
.community-content p {
  color: #4a3870; font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.community-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem;
}
.comm-card {
  background: white; border-radius: 16px; padding: 1.5rem;
  box-shadow: 0 6px 20px rgba(45,27,84,0.06);
  border: 1px solid rgba(212,175,55,0.1);
  text-align: center; transition: transform 0.3s ease;
}
.comm-card:hover { transform: translateY(-4px); }
.comm-icon { font-size: 1.8rem; display: block; margin-bottom: 0.5rem; }
.comm-card p {
  color: #4a3870; font-size: 0.95rem; margin: 0;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.telegram-note {
  background: white; border-radius: 20px; padding: 2.5rem;
  border: 1px solid rgba(212,175,55,0.15);
  box-shadow: 0 8px 30px rgba(45,27,84,0.06); text-align: center;
}
.telegram-note p {
  color: #4a3870; font-size: 1.05rem; line-height: 1.8; margin-bottom: 1rem;
  font-family: 'Century Gothic', system-ui, sans-serif;
}
.telegram-note strong { color: #2D1B54; }
.small-note { font-style: italic; color: #6b5b95 !important; margin-bottom: 0 !important; }
@media (max-width: 900px) { .community-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .community-grid { grid-template-columns: 1fr; } }
</style>
