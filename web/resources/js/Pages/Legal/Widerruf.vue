<template>
  <AppLayout>
    <div class="legal-hero">
      <div class="legal-hero-inner">
        <span class="page-label">Rechtliches</span>
        <h1>Widerrufsbelehrung</h1>
      </div>
    </div>
    <div class="legal-content">
      <div class="legal-container">
        <section class="legal-section">
          <h2>Widerrufsrecht</h2>
          <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.</p>
          <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Trustbridge GmbH, Musterstraße 1, 12345 Musterstadt, E-Mail: widerruf@trustbridge.de) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
        </section>
        <section class="legal-section">
          <h2>Erlöschen des Widerrufsrechts</h2>
          <p>Bei Abonnements erlischt das Widerrufsrecht, sobald der erste Versand Ihrer Paketsendung erfolgt ist und Sie der Lieferung vor Ablauf der Widerrufsfrist ausdrücklich zugestimmt haben.</p>
          <p><strong>Wichtiger Hinweis:</strong> Bei eröffneten oder benutzten Überraschungspaketen ist ein Widerruf aus hygienischen Gründen und aufgrund der Beschaffenheit der Ware (Retouren-Ware) ausgeschlossen.</p>
        </section>
        <section class="legal-section">
          <h2>Folgen des Widerrufs</h2>
          <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben.</p>
        </section>
        <section class="legal-section">
          <h2>Muster-Widerrufsformular</h2>
          <p>Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück an:</p>
          <p><strong>Trustbridge GmbH</strong><br/>
          Musterstraße 1, 12345 Musterstadt<br/>
          E-Mail: <a href="mailto:widerruf@trustbridge.de">widerruf@trustbridge.de</a></p>
          <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung (*)<br/>
          — Bestellt am (*): ___________<br/>
          — Name des/der Verbraucher(s): ___________<br/>
          — Anschrift des/der Verbraucher(s): ___________<br/>
          — Unterschrift des/der Verbraucher(s): ___________<br/>
          — Datum: ___________<br/><br/>
          (*) Unzutreffendes streichen.</p>
        </section>
      </div>
    </div>
  </AppLayout>
</template>
<script setup>
import AppLayout from '../../Layouts/AppLayout.vue';
</script>
<style scoped>
.legal-hero { background: linear-gradient(135deg, #1a0a36, #2D1B54); padding: 9rem 2rem 4rem; text-align: center; }
.legal-hero-inner { max-width: 600px; margin: 0 auto; }
.page-label { display: inline-block; background: rgba(212,175,55,0.15); color: #D4AF37; border: 1px solid rgba(212,175,55,0.4); padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.82rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1.25rem; }
.legal-hero h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: white; font-size: 2.5rem; margin: 0; background: none; -webkit-text-fill-color: white; }
.legal-content { background: #f8f6ff; padding: 5rem 2rem; }
.legal-container { max-width: 860px; margin: 0 auto; background: white; border-radius: 20px; padding: 3rem 3.5rem; box-shadow: 0 8px 40px rgba(45,27,84,0.08); border: 1px solid rgba(212,175,55,0.12); }
.legal-section { margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid rgba(45,27,84,0.08); }
.legal-section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.legal-section h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.15rem; margin-bottom: 0.75rem; background: none; -webkit-text-fill-color: #2D1B54; }
.legal-section p { color: #4a3870; line-height: 1.8; font-size: 0.95rem; margin-bottom: 0.75rem; }
.legal-section p:last-child { margin-bottom: 0; }
.legal-section strong { color: #2D1B54; }
.legal-section a { color: #D4AF37; text-decoration: none; }
.legal-section a:hover { text-decoration: underline; }
@media (max-width: 600px) { .legal-container { padding: 2rem 1.5rem; } }
</style>
