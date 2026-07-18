import fs from "fs";
const file = "c:/Users/tisch/OneDrive/Desktop/TrustboxRoyale/web/resources/js/Pages/Welcome.vue";
let content = fs.readFileSync(file, "utf8");

// 1. Update .welcome-page gradient
content = content.replace(
  /background: linear-gradient\(-45deg, #2D1B54, #1A0F33, #0b021d, #1f0b40\);/g,
  "background: linear-gradient(-45deg, #4c2882, #2d1659, #1b0a3a, #36146c);"
);

// 2. Update .hero-title gradient
content = content.replace(
  /background: linear-gradient\(to right, #1e0b3b, #4a238a, #d4af37, #4a238a, #1e0b3b\);/g,
  "background: linear-gradient(to right, #FFFFFF, #E8D3F5, #F4D068, #E8D3F5, #FFFFFF);\n    filter: drop-shadow(0 4px 15px rgba(0,0,0,0.8));"
);

// 3. Replace the entire NEW HERO HUB STYLES section
const startIndex = content.indexOf("/* --------------------------------------\n   NEW HERO HUB STYLES");
if(startIndex !== -1) {
  content = content.substring(0, startIndex);
}

const newStyles = `/* --------------------------------------
   NEW HERO HUB STYLES (BRIGHTER, MILKY GLASS)
   -------------------------------------- */
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding-top: 5vh;
}

.hero-subtitle {
  color: #FFFFFF;
  font-size: 1.4rem;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 40px;
  text-align: center;
  text-shadow: 0 4px 15px rgba(0,0,0,0.8);
}

/* --- 3 Premium Shards --- */
.hero-shards-grid {
  display: flex;
  gap: 25px;
  margin-top: 20px;
  max-width: 1100px;
  width: 100%;
}
@media (max-width: 900px) {
  .hero-shards-grid { flex-direction: column; align-items: center; gap: 20px; }
}

.hero-shard {
  flex: 1;
  background: rgba(255, 255, 255, 0.08); /* Broken ice / milky glass */
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.15);
  border-top: 1px solid rgba(255,255,255,0.4); /* Highlighting the top edge like glass */
  border-left: 1px solid rgba(255,255,255,0.2);
  border-radius: 24px;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 15px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(255,255,255,0.05);
  min-width: 300px;
  color: #fff;
}
@media (max-width: 900px) {
  .hero-shard { min-width: 100%; max-width: 400px; padding: 2rem 1.5rem; }
}

.shard-glow {
  position: absolute;
  top: -50%; left: -50%; width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.hero-shard:hover .shard-glow { opacity: 1; }

.hero-shard:hover {
  transform: translateY(-10px) scale(1.02);
  background: rgba(255, 255, 255, 0.14); /* Helligkeit bei Hover */
  box-shadow: 0 25px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(255,255,255,0.15);
}

.shard-icon {
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  transition: transform 0.4s ease;
}
.shard-icon svg {
  width: 36px; height: 36px;
}
.hero-shard:hover .shard-icon {
  transform: scale(1.15) translateY(-5px);
}

.shard-content h3 {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0 0 12px;
  font-family: "Century Gothic", system-ui, sans-serif;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}
.shard-content p {
  font-size: 1.05rem;
  color: rgba(255,255,255,0.9);
  margin: 0;
  line-height: 1.4;
}

/* Colors for Shards */
.shard-gold { border-top-color: rgba(212,175,55,0.6); }
.shard-gold .shard-icon { color: #F0CF5A; filter: drop-shadow(0 0 15px rgba(240,207,90,0.6)); }
.shard-gold:hover { border-color: rgba(212,175,55,0.8); box-shadow: 0 25px 60px rgba(212,175,55,0.3); }
.shard-gold h3 { color: #FFF; }

.shard-purple { border-top-color: rgba(184,122,255,0.6); }
.shard-purple .shard-icon { color: #E8D3F5; filter: drop-shadow(0 0 15px rgba(184,122,255,0.6)); }
.shard-purple:hover { border-color: rgba(184,122,255,0.8); box-shadow: 0 25px 60px rgba(184,122,255,0.3); }

.shard-mint { border-top-color: rgba(142,245,210,0.6); }
.shard-mint .shard-icon { color: #8EF5D2; filter: drop-shadow(0 0 15px rgba(142,245,210,0.6)); }
.shard-mint:hover { border-color: rgba(142,245,210,0.8); box-shadow: 0 25px 60px rgba(142,245,210,0.3); }

/* --- Compact Guarantee Bar --- */
.hero-guarantee-bar {
  margin-top: 50px;
  background: rgba(255, 255, 255, 0.08); /* Brighter */
  backdrop-filter: blur(15px);
  border: 1px solid rgba(212,175,55,0.4);
  border-radius: 50px;
  padding: 12px 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(212,175,55,0.15);
}
.guarantee-icon {
  flex-shrink: 0;
  width: 24px; height: 24px;
}
.guarantee-text {
  color: #FFFFFF;
  font-size: 1.05rem;
  font-weight: 600;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
}
.guarantee-link {
  color: #F0CF5A;
  font-size: 1.05rem;
  font-weight: 800;
  text-decoration: none;
  margin-left: 15px;
  transition: all 0.3s;
}
.guarantee-link:hover { color: #FFF; text-shadow: 0 0 10px rgba(240,207,90,0.8); }

@media (max-width: 768px) {
  .hero-guarantee-bar { flex-direction: column; text-align: center; border-radius: 20px; padding: 20px; }
  .guarantee-link { margin-left: 0; margin-top: 8px; }
}

/* --- Modals --- */
.hero-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(5, 2, 10, 0.85);
  backdrop-filter: blur(25px);
  z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.hero-modal-content {
  background: rgba(45, 20, 80, 0.85); /* Brighter purple glass */
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255,255,255,0.2);
  border-top: 1px solid rgba(255,255,255,0.4);
  border-radius: 30px;
  position: relative;
  max-width: 800px; width: 100%;
  padding: 50px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.9), inset 0 0 40px rgba(255,255,255,0.1);
}
.video-modal { padding: 0; overflow: hidden; border-radius: 24px; }
.video-container {
  position: relative; width: 100%; padding-bottom: 56.25%; background: #000;
}
.video-container iframe {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
}
.modal-close-btn {
  position: absolute; top: 20px; right: 20px;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); 
  color: white; font-size: 1.8rem; cursor: pointer; width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; transition: all 0.3s;
  z-index: 20;
}
.modal-close-btn:hover { background: rgba(255,255,255,0.2); transform: scale(1.1); }
.video-modal .modal-close-btn { top: 15px; right: 15px; background: rgba(0,0,0,0.5); }

.info-modal { text-align: center; color: white; }
.modal-title { font-family: "Century Gothic", sans-serif; font-size: 2.6rem; color: #FFF; margin-bottom: 40px; text-shadow: 0 0 20px rgba(255,255,255,0.3); }
.steps-grid { display: flex; flex-direction: column; gap: 25px; margin-bottom: 50px; }
.step-card { 
  background: rgba(255,255,255,0.08); 
  padding: 25px; 
  border-radius: 20px; 
  display: flex; align-items: center; gap: 25px; 
  border: 1px solid rgba(142,245,210,0.3); 
  box-shadow: inset 0 0 20px rgba(142,245,210,0.05);
}
.step-num { 
  width: 50px; height: 50px; 
  background: linear-gradient(135deg, #8EF5D2, #5CE1C6); 
  color: #000; border-radius: 50%; 
  display: flex; align-items: center; justify-content: center; 
  font-weight: 900; font-size: 1.5rem; flex-shrink: 0; 
  box-shadow: 0 0 20px rgba(142,245,210,0.4);
}
.step-card h4 { margin: 0; font-size: 1.4rem; text-align: left; font-weight: 700; color: #FFF; }

.modal-actions-center {
  padding: 20px; text-align: center;
}
.modal-cta { 
  padding: 18px 50px; 
  font-size: 1.3rem; 
  font-weight: 800;
  border-radius: 40px; 
  box-shadow: 0 10px 30px rgba(212,175,55,0.4);
}
.modal-cta:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 40px rgba(212,175,55,0.6);
}
</style>
\`;

content += newStyles;
fs.writeFileSync(file, content, "utf8");
console.log("Updated Hero Hub CSS to Brighter Milky Glass Edition");
