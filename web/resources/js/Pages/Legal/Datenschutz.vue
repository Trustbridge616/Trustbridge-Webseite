<template>
  <AppLayout>
    <div class="legal-hero">
      <div class="legal-hero-inner">
        <span class="page-label">Rechtliches</span>
        <h1>Datenschutzerklärung</h1>
      </div>
    </div>
    <div class="legal-content">
      <div class="legal-container">
        <section class="legal-section">
          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
        </section>
        <section class="legal-section">
          <h2>2. Verantwortliche Stelle</h2>
          <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br/><br/>
          <strong>Trustbridge GmbH</strong><br/>
          Musterstraße 1<br/>
          12345 Musterstadt<br/>
          E-Mail: <a href="mailto:datenschutz@trustboxroyale.de">datenschutz@trustboxroyale.de</a></p>
        </section>
        <section class="legal-section">
          <h2>3. Erhebung und Speicherung personenbezogener Daten</h2>
          <p>Beim Besuch unserer Website werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und Ähnliches. Hierbei handelt es sich ausschließlich um Informationen, welche keine Rückschlüsse auf Ihre Person zulassen.</p>
        </section>
        <section class="legal-section">
          <h2>4. Daten bei Registrierung</h2>
          <p>Wenn Sie sich auf unserer Plattform registrieren, erheben wir folgende Daten: Name, E-Mail-Adresse, Passwort (verschlüsselt). Diese Daten werden ausschließlich zur Bereitstellung unserer Dienste verwendet und nicht an Dritte weitergegeben, außer es ist für die Vertragserfüllung notwendig (z. B. Zahlungsdienstleister Stripe).</p>
        </section>
        <section class="legal-section">
          <h2>5. Zahlungsdaten (Stripe)</h2>
          <p>Für die Zahlungsabwicklung nutzen wir den Dienstleister Stripe, Inc. Ihre Zahlungsdaten (z. B. Kreditkartendaten) werden direkt an Stripe übermittelt und dort verarbeitet. Trustbridge speichert keine vollständigen Zahlungsdaten. Weitere Informationen finden Sie in der Datenschutzerklärung von Stripe: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener">https://stripe.com/de/privacy</a></p>
        </section>
        <section class="legal-section">
          <h2>6. Cookies</h2>
          <p>Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Einige Cookies sind „Session-Cookies", die nach Ende Ihrer Browser-Sitzung von selbst gelöscht werden.</p>
        </section>
        <section class="legal-section">
          <h2>7. Ihre Rechte</h2>
          <p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Wenden Sie sich dazu jederzeit an uns: <a href="mailto:datenschutz@trustboxroyale.de">datenschutz@trustboxroyale.de</a></p>
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
.legal-section h3 { color: #4a3870; font-size: 0.95rem; font-weight: bold; margin-bottom: 0.5rem; }
.legal-section p { color: #4a3870; line-height: 1.8; font-size: 0.95rem; margin-bottom: 0.75rem; }
.legal-section p:last-child { margin-bottom: 0; }
.legal-section a { color: #D4AF37; text-decoration: none; }
.legal-section a:hover { text-decoration: underline; }
@media (max-width: 600px) { .legal-container { padding: 2rem 1.5rem; } }
</style>
