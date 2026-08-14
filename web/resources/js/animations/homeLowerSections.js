/* ===================================================================
   UNTERE SEKTION DER STARTSEITE - Eintritte und Eigenleben
   -------------------------------------------------------------------
   Alles, was unterhalb des Aufstiegs passiert, liegt gebuendelt hier:
   Schwelle, die drei Standpunkt-Kacheln, die Garantie-Zeile, der
   Uebergang zum Footer und die Footer-Spalten. Welcome.vue ruft nur
   noch init auf und erhaelt eine Aufraeumfunktion zurueck - dadurch
   laesst sich dieses Buendel spaeter als Ganzes tauschen (A/B-Test),
   ohne die Aufstiegs-Choreografie anzufassen.

   Die Kachel-Hover (Lift, Schatten, Glow-Puls) leben bewusst NICHT
   hier, sondern als CSS in Welcome.vue: ein GSAP-Inline-Transform auf
   den Kacheln wuerde deren CSS-Hover-Transforms ueberschreiben -
   dieselbe Falle, vor der schon die Eintritts-Reveals mit clearProps
   schuetzen.

   Der Footer ist eine GETEILTE Komponente. Angesteuert wird er nur
   von hier (also nur auf der Startseite), und die Stil-Erweiterungen
   in SiteFooter.vue haengen an der Klasse .footer--home, die diese
   Datei setzt und beim Verlassen wieder entfernt. Die handdesignten
   Unterseiten bleiben damit unberuehrt.
   =================================================================== */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHomeLowerSections() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Schaltet die Startseiten-Erweiterungen des geteilten Footers frei
     (Ring-Ornament, Gold-Glow auf den Social-Icons, waermere Goldkante).
     Nur eine Klasse - kein Stylesheet-Eingriff, der Unterseiten trifft. */
  const footer = document.querySelector('.site-footer');
  footer?.classList.add('footer--home');

  const ctx = gsap.context(() => {
    /* Bei reduzierter Bewegung entfaellt alles Folgende: die Inhalte
       stehen einfach da, der Uebergangs-Verlauf steht voll sichtbar
       (sein CSS-Grundzustand), nichts schwebt und nichts blendet. */
    if (reduced) return;

    const reveal = (targets, trigger, extra = {}) =>
      gsap.from(targets, {
        /* fastScrollEnd (Block A2): wer durchrauscht, bekommt den
           Endzustand sofort statt einer nachlaufenden Animation. */
        scrollTrigger: { trigger, start: 'top 88%', fastScrollEnd: true },
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        /* clearProps ist Pflicht: die Kacheln tragen CSS-Hover-
           Transforms, ein liegengebliebener Inline-Transform wuerde
           jeden Hover ueberschreiben. */
        clearProps: 'transform,opacity,visibility',
        ...extra,
      });

    reveal('.climb-threshold', '.climb-threshold', { y: 24 });

    /* Die drei Standpunkte: nacheinander, weich von unten, mit leichtem
       Wachsen. gsap.from erhaelt vorhandene Transform-Anteile - die
       Mittelkachel laeuft also von 0.95 auf ihr scale(1.06), nicht
       auf 1. */
    reveal('.hero-shard', '.hero-shards-grid', { scale: 0.95, stagger: 0.15 });

    reveal('.hero-guarantee-bar', '.hero-guarantee-bar', { y: 26, duration: 0.8 });

    /* --- Eigenleben der Kachel-Icons ---
       Seit dem Scroll-Performance-Patch (Block A) lebt das Schweben als
       CSS-Keyframe in Welcome.vue (shard-icon-float): der GSAP-Ticker
       schrieb dafuer pro Frame drei Inline-Transforms - als CSS laeuft
       dieselbe Bewegung (gleiche Dauern, Phasen und Kurve) komplett im
       Compositor. Die Zustaendigkeitsgrenze bleibt: nur das SVG schwebt,
       .shard-icon traegt weiterhin Filter und Hover-Glow. */

    /* --- Uebergang zum Footer ---
       Der Verlauf (Seitenlila -> Footer-Tiefviolett) blendet mit dem
       Scrollen ein statt hart dazustehen. Scrub ohne Nachlauf: der
       Verlauf ist Uebergabe an den Footer, kein Eigenauftritt. */
    gsap.fromTo(
      '.footer-transition',
      { opacity: 0.15 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.footer-transition',
          start: 'top 96%',
          end: 'bottom 72%',
          scrub: true,
        },
      }
    );

    /* --- Footer-Spalten ---
       Marke, Navigation, Konto, Rechtliches treten gestaffelt ein -
       dieselbe Handschrift wie die Kacheln darueber, nur leiser. */
    gsap.from('.site-footer .footer-brand, .site-footer .footer-nav', {
      scrollTrigger: { trigger: '.site-footer', start: 'top 88%', fastScrollEnd: true },
      y: 24,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      clearProps: 'transform,opacity,visibility',
    });
  });

  return () => {
    /* revert raeumt Tweens UND ScrollTrigger ab - noetig, weil Inertia
       nur die Seite tauscht und ein verwaister Trigger sonst auf der
       naechsten Seite weiterfeuerte. */
    ctx.revert();
    footer?.classList.remove('footer--home');
  };
}
