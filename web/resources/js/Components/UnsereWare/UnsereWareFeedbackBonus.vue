<template>
  <section class="section-reward glass-panel">
    <div class="reward-icon">
      <span class="euro-badge">5 €</span>
    </div>
    <h2>Feedback wird belohnt</h2>
    <p>Wer seine Erfahrung teilt, hilft der Community und macht den Warenfluss transparenter.</p>
    <p class="reward-highlight">Für ein freigegebenes Bild mit Bewertung erhältst du 5 € Guthaben für deine nächste Bestellung.</p>
    <div class="reward-hint">
      Guthaben nach Prüfung, Freigabe und final abgeschlossenem Bestellstatus. Kein Guthaben bei Stornierung, Widerruf, Rücksendung, Rückerstattung oder Chargeback. Maximal einmal pro Bestellung. Keine Barauszahlung. Nur im Kundenkonto nutzbar.
    </div>
  </section>
</template>

<style scoped>
.glass-panel { background: rgba(45, 20, 80, 0.4); backdrop-filter: blur(20px); border: 1px solid rgba(142,245,210,0.15); border-top: 1px solid rgba(142,245,210,0.3); border-radius: 24px; padding: 3rem; box-shadow: 0 15px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(142,245,210,0.02); }
.section-reward { text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.reward-icon { background: rgba(212,175,55,0.1); padding: 1.5rem; border-radius: 50%; display: inline-flex; margin-bottom: 1.5rem; border: 1px solid rgba(212,175,55,0.3); }
.euro-badge { font-size: 1.8rem; font-weight: bold; color: #D4AF37; font-family: 'Century Gothic', sans-serif; }
h2 { font-family: 'Century Gothic', sans-serif; color: #FFF; font-size: 1.8rem; margin-bottom: 1rem; }
p { color: rgba(255,255,255,0.7); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1rem; }
.reward-highlight { color: #8EF5D2; font-weight: bold; font-size: 1.1rem; }
.reward-hint { margin-top: 1.5rem; font-size: 0.8rem; color: rgba(255,255,255,0.4); font-style: italic; line-height: 1.4; max-width: 600px; }
</style>
