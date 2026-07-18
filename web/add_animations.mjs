import fs from 'fs';

let content = fs.readFileSync('resources/js/Pages/Prizes.vue', 'utf8');

// 1. Path Abo (Legacy-Abo starten Karte) - add sweep animation
content = content.replace(
    /\.path-abo\.active \.path-border-glow \{ box-shadow: 0 30px 60px rgba\(0,0,0,0\.8\), inset 0 0 40px rgba\(142,245,210,0\.3\), 0 0 70px rgba\(142,245,210,0\.5\); opacity: 1; \}/g,
    `.path-abo.active .path-border-glow { box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(142,245,210,0.3), 0 0 70px rgba(142,245,210,0.5); opacity: 1; animation: pathAboSweep 8s ease-in-out infinite; }`
);

// 2. Premium Upgrade Badge - add sweep animation
content = content.replace(
    /\.path-abo\.active \.path-premium-label \{ opacity: 1; background: rgba\(142,245,210,0\.15\); border-color: rgba\(142,245,210,0\.5\); text-shadow: 0 0 10px rgba\(142,245,210,0\.5\); \}/g,
    `.path-abo.active .path-premium-label { opacity: 1; background: rgba(142,245,210,0.15); border-color: rgba(142,245,210,0.5); text-shadow: 0 0 10px rgba(142,245,210,0.5); animation: premiumBadgeSweep 8s ease-in-out infinite 1s; }`
);

// 3. CTA Single - add gold pulse animation
content = content.replace(
    /\.epic-cta-btn\.single \{ background: linear-gradient\(135deg, #F0CF5A, #b8860b\); color: #000; box-shadow: 0 15px 30px rgba\(240,207,90,0\.4\), inset 0 2px 0 rgba\(255,255,255,0\.4\); \}/g,
    `.epic-cta-btn.single { background: linear-gradient(135deg, #F0CF5A, #b8860b); color: #000; box-shadow: 0 15px 30px rgba(240,207,90,0.4), inset 0 2px 0 rgba(255,255,255,0.4); animation: epicSinglePulse 8s ease-in-out infinite; }`
);

// 4. CTA Abo - add mint pulse animation
content = content.replace(
    /\.epic-cta-btn\.abo \{ background: linear-gradient\(135deg, #8EF5D2, #5CE1C6\); color: #000; box-shadow: 0 15px 30px rgba\(142,245,210,0\.4\), inset 0 2px 0 rgba\(255,255,255,0\.5\); \}/g,
    `.epic-cta-btn.abo { background: linear-gradient(135deg, #8EF5D2, #5CE1C6); color: #000; box-shadow: 0 15px 30px rgba(142,245,210,0.4), inset 0 2px 0 rgba(255,255,255,0.5); animation: epicAboPulse 8s ease-in-out infinite 1.5s; }`
);

// 5. Text pulse on path content
content = content.replace(
    /\.path-abo\.active \.path-content p \{ color: #D9CFE8; margin: 0; font-size: 1\.05rem; transition: color 0\.3s ease; \}/g,
    `.path-abo.active .path-content p { color: #D9CFE8; margin: 0; font-size: 1.05rem; transition: color 0.3s ease; animation: pathTextPulse 8s ease-in-out infinite; }`
);

// We need to inject the keyframes at the end of the style block
const keyframes = `

/* ══════════════════════════════════════
   SUBTLE ATTENTION ANIMATIONS (8s cycle)
   ══════════════════════════════════════ */
@media (prefers-reduced-motion: no-preference) {
  @keyframes pathAboSweep {
    0%, 88%, 100% { box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 40px rgba(142,245,210,0.3), 0 0 70px rgba(142,245,210,0.5); }
    94% { box-shadow: 0 30px 60px rgba(0,0,0,0.8), inset 0 0 60px rgba(142,245,210,0.5), 0 0 100px rgba(142,245,210,0.8); }
  }

  @keyframes pathTextPulse {
    0%, 88%, 100% { color: #D9CFE8; text-shadow: none; }
    94% { color: #FFFFFF; text-shadow: 0 0 8px rgba(255,255,255,0.5); }
  }

  @keyframes premiumBadgeSweep {
    0%, 88%, 100% { background: rgba(142,245,210,0.15); box-shadow: none; border-color: rgba(142,245,210,0.5); }
    94% { background: rgba(142,245,210,0.25); box-shadow: 0 0 15px rgba(142,245,210,0.4); border-color: rgba(142,245,210,0.8); }
  }

  @keyframes epicSinglePulse {
    0%, 88%, 100% { box-shadow: 0 15px 30px rgba(240,207,90,0.4), inset 0 2px 0 rgba(255,255,255,0.4); transform: scale(1); }
    94% { box-shadow: 0 20px 40px rgba(240,207,90,0.7), inset 0 2px 0 rgba(255,255,255,0.6); transform: scale(1.015); }
  }

  @keyframes epicAboPulse {
    0%, 88%, 100% { box-shadow: 0 15px 30px rgba(142,245,210,0.4), inset 0 2px 0 rgba(255,255,255,0.5); transform: scale(1); }
    94% { box-shadow: 0 20px 40px rgba(142,245,210,0.7), inset 0 2px 0 rgba(255,255,255,0.7); transform: scale(1.015); }
  }
}
`;

content = content.replace(/<\/style>/, keyframes + '\n</style>');

fs.writeFileSync('resources/js/Pages/Prizes.vue', content);
console.log('Subtle attention animations added.');
