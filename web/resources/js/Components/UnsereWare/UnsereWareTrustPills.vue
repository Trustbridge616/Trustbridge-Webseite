<template>
  <div class="proof-strip-wrapper">
    <div class="container">
      <div class="proof-strip">
        <div class="proof-pill">
          <div class="proof-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8EF5D2" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>
          <div class="proof-text">
            <strong>Echte Versandboxen</strong>
            <span>Ausgewählte Boxen aus dem laufenden Versand.</span>
          </div>
        </div>
        <div class="proof-pill">
          <div class="proof-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
          <div class="proof-text">
            <strong>TrustBox-ID</strong>
            <span>Jede veröffentlichte Box kann eindeutig dokumentiert werden.</span>
          </div>
        </div>
        <div class="proof-pill">
          <div class="proof-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8EF5D2" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          <div class="proof-text">
            <strong>Verifizierte Reviews</strong>
            <span>Bewertungen nur bei passender Bestellung.</span>
          </div>
        </div>
        <div class="proof-pill">
          <div class="proof-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C4B8D8" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div class="proof-text">
            <strong>Private Daten geschützt</strong>
            <span>Keine Namen, Adressen oder Trackingnummern öffentlich.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.proof-strip-wrapper { margin-top: -2rem; margin-bottom: 4rem; position: relative; z-index: 10; }
.proof-strip { display: flex; gap: 1rem; justify-content: space-between; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 1rem; -webkit-overflow-scrolling: touch; }
.proof-strip::-webkit-scrollbar { height: 4px; }
.proof-strip::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
.proof-pill { flex: 1 0 240px; scroll-snap-align: start; background: rgba(45, 20, 80, 0.5); backdrop-filter: blur(20px); border: 1px solid rgba(142,245,210,0.15); border-radius: 16px; padding: 1.2rem; display: flex; align-items: flex-start; gap: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.3); transition: transform 0.3s; }
.proof-pill:hover { transform: translateY(-3px); border-color: rgba(142,245,210,0.3); }
.proof-icon { flex-shrink: 0; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 12px; }
.proof-text strong { display: block; color: #FFF; font-size: 0.95rem; margin-bottom: 4px; font-family: 'Century Gothic', sans-serif; }
.proof-text span { color: #C4B8D8; font-size: 0.8rem; line-height: 1.4; display: block; }

@media (max-width: 900px) {
  .proof-strip { padding-bottom: 1.5rem; }
  .proof-pill { flex: 0 0 280px; }
}
</style>
