
import fs from "fs";

const file = "c:/Users/tisch/OneDrive/Desktop/TrustboxRoyale/web/resources/js/Pages/Welcome.vue";
let content = fs.readFileSync(file, "utf8");

// Change .welcome-page background to darker royal purple (like prizes)
content = content.replace(
  /background: linear-gradient\(\s*-45deg,\s*#e0e7ff,\s*#c4b5fd,\s*#7c3aed,\s*#4c1d95,\s*#a78bfa\s*\);/s,
  `background: linear-gradient(-45deg, #2D1B54, #1A0F33, #0b021d, #1f0b40);`
);

const cssToAppend = `
/* --------------------------------------
   NEW HERO HUB STYLES
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
  color: #D9CFE8;
  font-size: 1.2rem;
  margin-top: -10px;
  margin-bottom: 30px;
  text-align: center;
}

/* --- 3 Premium Shards --- */
.hero-shards-grid {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  max-width: 1000px;
  width: 100%;
}
@media (max-width: 900px) {
  .hero-shards-grid { flex-direction: column; align-items: center; }
}

.hero-shard {
  flex: 1;
  background: rgba(30, 15, 50, 0.6);
  backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  min-width: 250px;
  color: #fff;
}

.shard-glow {
  position: absolute;
  top: -50%; left: -50%; width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.hero-shard:hover .shard-glow { opacity: 1; }

.hero-shard:hover {
  transform: translateY(-8px) scale(1.02);
  background: rgba(40, 20, 70, 0.8);
}

.shard-icon {
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
  transition: transform 0.4s ease;
}
.hero-shard:hover .shard-icon {
  transform: scale(1.1);
}

.shard-content h3 {
  font-size: 1.4rem;
  font-weight: 800;
  margin: 0 0 10px;
  font-family: "Century Gothic", system-ui, sans-serif;
}
.shard-content p {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.7);
  margin: 0;
}

/* Colors for Shards */
.shard-gold { border-top: 1px solid rgba(212,175,55,0.4); }
.shard-gold .shard-icon { color: #D4AF37; filter: drop-shadow(0 0 10px rgba(212,175,55,0.4)); }
.shard-gold:hover { border-color: rgba(212,175,55,0.6); box-shadow: 0 20px 40px rgba(212,175,55,0.2); }

.shard-purple { border-top: 1px solid rgba(150,80,250,0.4); }
.shard-purple .shard-icon { color: #b87aff; filter: drop-shadow(0 0 10px rgba(150,80,250,0.4)); }
.shard-purple:hover { border-color: rgba(150,80,250,0.6); box-shadow: 0 20px 40px rgba(150,80,250,0.2); }

.shard-mint { border-top: 1px solid rgba(142,245,210,0.4); }
.shard-mint .shard-icon { color: #8EF5D2; filter: drop-shadow(0 0 10px rgba(142,245,210,0.4)); }
.shard-mint:hover { border-color: rgba(142,245,210,0.6); box-shadow: 0 20px 40px rgba(142,245,210,0.2); }

/* --- Compact Guarantee Bar --- */
.hero-guarantee-bar {
  margin-top: 40px;
  background: rgba(20, 10, 30, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212,175,55,0.3);
  border-radius: 50px;
  padding: 10px 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3), inset 0 0 15px rgba(212,175,55,0.05);
}
.guarantee-icon {
  flex-shrink: 0;
}
.guarantee-text {
  color: #D9CFE8;
  font-size: 0.9rem;
  font-weight: 600;
}
.guarantee-link {
  color: #D4AF37;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  margin-left: 10px;
  transition: color 0.3s;
}
.guarantee-link:hover { color: #F0CF5A; }

@media (max-width: 768px) {
  .hero-guarantee-bar { flex-direction: column; text-align: center; border-radius: 20px; padding: 15px; }
  .guarantee-link { margin-left: 0; margin-top: 5px; }
}

/* --- Modals --- */
.hero-modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(5, 2, 10, 0.9);
  backdrop-filter: blur(15px);
  z-index: 10000;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.hero-modal-content {
  background: linear-gradient(135deg, rgba(30,15,50,0.95), rgba(15,5,25,0.98));
  border: 1px solid rgba(212,175,55,0.3);
  border-radius: 24px;
  position: relative;
  max-width: 800px; width: 100%;
  padding: 40px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.9), inset 0 0 30px rgba(212,175,55,0.05);
}
.video-modal { padding: 0; overflow: hidden; }
.video-container {
  position: relative; width: 100%; padding-bottom: 56.25%; background: #000;
}
.video-container iframe {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
}
.modal-close-btn {
  position: absolute; top: -50px; right: 0;
  background: transparent; border: none; color: white; font-size: 2rem; cursor: pointer;
}
.video-modal .modal-close-btn { top: 10px; right: 10px; z-index: 10; background: rgba(0,0,0,0.5); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }

.info-modal { text-align: center; color: white; }
.modal-title { font-family: "Century Gothic", sans-serif; font-size: 2.2rem; color: #F0CF5A; margin-bottom: 30px; }
.steps-grid { display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px; }
.step-card { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 16px; display: flex; align-items: center; gap: 20px; border: 1px solid rgba(142,245,210,0.2); }
.step-num { width: 40px; height: 40px; background: #8EF5D2; color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; flex-shrink: 0; }
.step-card h4 { margin: 0; font-size: 1.2rem; text-align: left; }

.modal-actions-center {
  padding: 20px; text-align: center;
}
.modal-cta { padding: 15px 40px; font-size: 1.2rem; border-radius: 30px; }

</style>`;

content = content.replace("</style>", cssToAppend);
fs.writeFileSync(file, content, "utf8");
console.log("Appended CSS successfully.");

