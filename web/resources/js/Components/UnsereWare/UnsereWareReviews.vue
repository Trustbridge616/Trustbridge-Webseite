<template>
  <section class="section-reviews glass-panel">
    <h2>Reviews nur mit verifizierter Bestellung</h2>
    <p>Ein Review kann nur veröffentlicht werden, wenn die passende TrustBox-ID mit einer echten Bestellung verknüpft ist.</p>
    <p>So bleibt Feedback glaubwürdiger und die Community wird vor beliebigen Bewertungen geschützt.</p>
    
    <div class="reviews-split mt-4">
      <ul class="check-list-small">
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Login erforderlich</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> passende TrustBox-ID</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> echte Bestellung</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Admin-Freigabe möglich</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Badge „Verifizierte Bestellung“</li>
      </ul>
      <div class="review-demo-card">
        <span class="stars">★★★★★</span>
        <div class="demo-text">„Review zu TBX-2026-000004“</div>
        <span class="badge badge-verified-small">★ Verifizierte Bestellung</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.glass-panel { background: rgba(45, 20, 80, 0.4); backdrop-filter: blur(20px); border: 1px solid rgba(142,245,210,0.15); border-top: 1px solid rgba(142,245,210,0.3); border-radius: 24px; padding: 3rem; box-shadow: 0 15px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(142,245,210,0.02); }
h2 { font-family: 'Century Gothic', sans-serif; color: #FFF; font-size: 1.8rem; margin-bottom: 1rem; }
p { color: rgba(255,255,255,0.7); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1rem; }
.mt-4 { margin-top: 2rem; }
.reviews-split { display: flex; gap: 2rem; align-items: center; }
.check-list-small { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.8rem; flex: 1; }
.check-list-small li { display: flex; align-items: flex-start; gap: 10px; color: #C4B8D8; font-size: 0.95rem; line-height: 1.4; }
.review-demo-card { background: rgba(0,0,0,0.3); border: 1px solid rgba(212,175,55,0.2); padding: 1.5rem; border-radius: 16px; width: 220px; text-align: center; }
.stars { color: #D4AF37; letter-spacing: 2px; }
.demo-text { color: #FFF; font-style: italic; font-size: 0.9rem; margin: 10px 0; }
.badge-verified-small { font-size: 0.65rem; background: rgba(212,175,55,0.9); color: #0a0515; padding: 4px 10px; border-radius: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; }

@media (max-width: 900px) {
  .reviews-split { flex-direction: column; align-items: center; text-align: center; }
  .check-list-small { align-items: center; }
}
</style>
