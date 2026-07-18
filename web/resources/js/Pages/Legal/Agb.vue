<template>
  <AppLayout>
    <div class="legal-hero">
      <div class="legal-hero-inner">
        <span class="page-label">Rechtliches</span>
        <h1>Allgemeine Geschäftsbedingungen</h1>
      </div>
    </div>
    <div class="legal-content">
      <div class="legal-container">
        <section class="legal-section">
          <h2>§ 1 Geltungsbereich</h2>
          <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die zwischen Trustbridge GmbH (nachfolgend „Anbieter“) und dem Kunden (nachfolgend „Käufer“) über die Plattform trustbridge.de geschlossen werden.</p>
        </section>
        <section class="legal-section">
          <h2>§ 2 Vertragsgegenstand</h2>
          <p>Gegenstand des Vertrages ist die Lieferung von Überraschungspaketen bestehend aus Retouren-Waren. Der genaue Inhalt der Pakete ist zufällig und wird dem Käufer nicht vorab mitgeteilt. Es besteht kein Anspruch auf bestimmte Artikel oder Marken.</p>
          <p><strong>Wichtiger Hinweis:</strong> Bei den gelieferten Waren handelt es sich um Retouren-Ware. Im Paket können sich B-Ware, gebrauchte oder defekte Artikel befinden. Der Anbieter übernimmt keine Gewährleistung oder Garantie auf den Inhalt der Pakete. Eine Rückgabe des Paketinhalts ist ausgeschlossen.</p>
        </section>
        <section class="legal-section">
          <h2>§ 3 Abonnement & Mindestlaufzeit</h2>
          <p>Das Abonnement wird für die vom Käufer gewählte Mindestlaufzeit (1, 3 oder 6 Monate) abgeschlossen. Nach Ablauf der Mindestlaufzeit verlängert sich das Abonnement automatisch um jeweils einen Monat und kann dann monatlich gekündigt werden. Das Abonnement endet nicht automatisch, sondern muss aktiv über den Kundenbereich gekündigt werden.</p>
        </section>
        <section class="legal-section">
          <h2>§ 4 Preise & Zahlung</h2>
          <p>Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt monatlich im Voraus per Kreditkarte, SEPA-Lastschrift oder PayPal über den Zahlungsdienstleister Stripe. Der erste Betrag wird beim Vertragsabschluss fällig, alle weiteren monatlich am selben Datum.</p>
        </section>
        <section class="legal-section">
          <h2>§ 5 Lieferung</h2>
          <p>Die Lieferung erfolgt ausschließlich innerhalb Deutschlands. Lieferzeiten: Standard 2–4 Werktage, Priorität 2 Werktage, Express 1–2 Werktage (je nach gewähltem Paket). Lieferverzögerungen berechtigen nicht zur kostenlosen Kündigung des Abonnements.</p>
        </section>
        <section class="legal-section">
          <h2>§ 6 Gewährleistung & Haftung</h2>
          <p>Der Inhalt der Pakete besteht aus Retouren-Waren. Es wird ausdrücklich darauf hingewiesen, dass B-Ware, gebrauchte oder defekte Artikel Teil des Lieferumfangs sein können. Der Anbieter schließt die gesetzliche Gewährleistung für den Paketinhalt soweit gesetzlich zulässig aus. Dies ist ausdrücklich Teil des Geschäftsmodells und wird im Preis berücksichtigt.</p>
        </section>
        <section class="legal-section">
          <h2>§ 7 Kündigung</h2>
          <p>Das Abonnement kann nach Ablauf der Mindestlaufzeit jederzeit zum Ende des laufenden Abrechnungsmonats über den Kundenbereich gekündigt werden. Die Kündigung muss spätestens 24 Stunden vor dem nächsten Abrechnungsdatum eingehen.</p>
        </section>
        <section class="legal-section">
          <h2>§ 8 Schlussbestimmungen</h2>
          <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für alle Streitigkeiten ist der Sitz des Anbieters, sofern der Käufer Kaufmann ist oder keinen allgemeinen Gerichtsstand in Deutschland hat. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.</p>
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
.legal-hero h1 { font-family: 'Century Gothic', system-ui, sans-serif; color: white; font-size: 2.2rem; margin: 0; background: none; -webkit-text-fill-color: white; }
.legal-content { background: #f8f6ff; padding: 5rem 2rem; }
.legal-container { max-width: 860px; margin: 0 auto; background: white; border-radius: 20px; padding: 3rem 3.5rem; box-shadow: 0 8px 40px rgba(45,27,84,0.08); border: 1px solid rgba(212,175,55,0.12); }
.legal-section { margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid rgba(45,27,84,0.08); }
.legal-section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.legal-section h2 { font-family: 'Century Gothic', system-ui, sans-serif; color: #2D1B54; font-size: 1.1rem; margin-bottom: 0.75rem; background: none; -webkit-text-fill-color: #2D1B54; }
.legal-section p { color: #4a3870; line-height: 1.8; font-size: 0.95rem; margin-bottom: 0.75rem; }
.legal-section p:last-child { margin-bottom: 0; }
.legal-section strong { color: #c0392b; }
@media (max-width: 600px) { .legal-container { padding: 2rem 1.5rem; } }
</style>
