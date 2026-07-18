<template>
  <section class="section-id-explain">
    <div class="id-explain-card glass-panel-premium">
      <div class="id-explain-left">
        <h2>Jede Box kann eindeutig zugeordnet werden</h2>
        <p>Jede versendete TrustBox kann eine eindeutige TrustBox-ID erhalten. Intern kann diese ID mit Bestellung, Kundenkonto, Box-Level, Versandstatus und Review verknüpft werden. Öffentlich sichtbar bleiben nur datenschutzfreundliche Boxinformationen.</p>
        
        <ul class="id-check-list">
          <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8EF5D2" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Eindeutige TrustBox-ID pro Versandbox</li>
          <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8EF5D2" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Verknüpfung mit Bestellung und Kundenkonto</li>
          <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8EF5D2" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Upload nur im geschützten Kundenbereich</li>
          <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8EF5D2" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Reviews nur bei passender Bestellung</li>
          <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8EF5D2" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Keine öffentlichen Kundendaten</li>
        </ul>
      </div>
      <div class="id-explain-right">
        <div class="demo-id-display">
          <span class="demo-code">TBX-2026-000004</span>
          <div class="demo-timeline">
            <div class="timeline-step">Bestellung</div>
            <div class="timeline-arrow">&rarr;</div>
            <div class="timeline-step">Kundenkonto</div>
            <div class="timeline-arrow">&rarr;</div>
            <div class="timeline-step highlight">Upload</div>
            <div class="timeline-arrow">&rarr;</div>
            <div class="timeline-step">Prüfung</div>
            <div class="timeline-arrow">&rarr;</div>
            <div class="timeline-step highlight">Öffentliche Galerie</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-id-explain { margin-bottom: 6rem; }
.id-explain-card { display: flex; background: linear-gradient(135deg, rgba(45, 20, 80, 0.6) 0%, rgba(20, 10, 40, 0.8) 100%); backdrop-filter: blur(30px); border: 1px solid rgba(212,175,55,0.2); border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); overflow: hidden; }
.id-explain-left { width: 55%; padding: 4rem; }
.id-explain-left h2 { font-family: 'Century Gothic', sans-serif; font-size: 2.2rem; color: #FFF; margin-bottom: 1rem; }
.id-explain-left p { color: rgba(255,255,255,0.7); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; }
.id-check-list { list-style: none; padding: 0; margin: 2rem 0 0 0; display: flex; flex-direction: column; gap: 1rem; }
.id-check-list li { display: flex; align-items: center; gap: 12px; color: #FFF; font-weight: 500; font-size: 1.05rem; }
.id-explain-right { width: 45%; background: rgba(0,0,0,0.4); border-left: 1px solid rgba(255,255,255,0.05); padding: 4rem; display: flex; align-items: center; justify-content: center; }
.demo-id-display { text-align: center; }
.demo-code { font-family: 'Courier New', Courier, monospace; font-size: 2.2rem; font-weight: bold; color: #FFF; letter-spacing: 2px; text-shadow: 0 0 20px rgba(142,245,210,0.3); display: block; margin-bottom: 2rem; padding: 15px 30px; background: rgba(142,245,210,0.05); border: 1px dashed rgba(142,245,210,0.3); border-radius: 12px; }
.demo-timeline { display: flex; flex-direction: column; gap: 8px; align-items: center; }
.timeline-step { color: rgba(255,255,255,0.5); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; }
.timeline-arrow { color: rgba(212,175,55,0.5); }
.timeline-step.highlight { color: #8EF5D2; font-weight: bold; }

@media (max-width: 900px) {
  .id-explain-card { flex-direction: column; }
  .id-explain-left, .id-explain-right { width: 100%; padding: 2.5rem; }
  .id-explain-right { border-left: none; border-top: 1px solid rgba(255,255,255,0.05); }
}
</style>
