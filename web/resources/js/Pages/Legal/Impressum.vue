<template>
  <AppLayout>
    <div class="legal-hero">
      <div class="legal-hero-inner">
        <span class="page-label">Rechtliches</span>
        <h1>Impressum</h1>
      </div>
    </div>
    <div class="legal-content">
      <div class="legal-container">
        <section class="legal-section">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p><strong>Trustbridge GmbH</strong><br/>
          Musterstraße 1<br/>
          12345 Musterstadt<br/>
          Deutschland</p>
        </section>
        <section class="legal-section">
          <h2>Kontakt</h2>
          <p>Telefon: +49 (0) 123 456789<br/>
          E-Mail: <a href="mailto:info@trustboxroyale.de">info@trustboxroyale.de</a></p>
        </section>
        <section class="legal-section">
          <h2>Handelsregister</h2>
          <p>Registergericht: Amtsgericht Musterstadt<br/>
          Registernummer: HRB 12345</p>
        </section>
        <section class="legal-section">
          <h2>Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br/>
          DE 123456789</p>
        </section>
        <section class="legal-section">
          <h2>Geschäftsführung</h2>
          <p>Max Mustermann</p>
        </section>
        <section class="legal-section">
          <h2>Haftung für Inhalte</h2>
          <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
        </section>
        <section class="legal-section">
          <h2>Streitschlichtung</h2>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a></p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
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
.legal-section a { color: #D4AF37; text-decoration: none; }
.legal-section a:hover { text-decoration: underline; }
@media (max-width: 600px) { .legal-container { padding: 2rem 1.5rem; } }
</style>
