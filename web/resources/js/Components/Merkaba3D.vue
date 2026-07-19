<template>
  <div class="merkaba-container">
    <svg class="merkaba-svg-3d" viewBox="-120 -120 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="merkaba-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#merkaba-glow)" stroke-linecap="round" stroke-linejoin="round">
        
        <!-- Männlicher Tetraeder (Gruppe 1) -->
        <g id="tetra_male" class="tetra-male">
          <!-- Kanten -->
          <line v-for="(edge, i) in maleEdges" :key="'me'+i"
                :x1="edge.x1" :y1="edge.y1" :x2="edge.x2" :y2="edge.y2"
                :stroke="edge.color"
                :stroke-width="edge.width"
                :stroke-opacity="edge.opacity" />
          <!-- Wörter / Vertices -->
          <g v-for="(v, i) in maleVertices" :key="'mv'+i">
            <text v-if="v.label"
                  :x="v.x" :y="v.y - 12"
                  :fill="v.color"
                  :opacity="v.opacity * 0.9"
                  font-size="12"
                  text-anchor="middle"
                  font-family="'Century Gothic', system-ui, sans-serif"
                  font-weight="600"
                  class="vertex-label">{{ v.label }}</text>
          </g>
        </g>

        <!-- Weiblicher Tetraeder (Gruppe 2) -->
        <g id="tetra_female" class="tetra-female">
          <!-- Kanten -->
          <line v-for="(edge, i) in femaleEdges" :key="'fe'+i"
                :x1="edge.x1" :y1="edge.y1" :x2="edge.x2" :y2="edge.y2"
                :stroke="edge.color"
                :stroke-width="edge.width"
                :stroke-opacity="edge.opacity" />
          <!-- Wörter / Vertices -->
          <g v-for="(v, i) in femaleVertices" :key="'fv'+i">
            <text v-if="v.label"
                  :x="v.x" :y="v.y - 12"
                  :fill="v.color"
                  :opacity="v.opacity * 0.9"
                  font-size="12"
                  text-anchor="middle"
                  font-family="'Century Gothic', system-ui, sans-serif"
                  font-weight="600"
                  class="vertex-label">{{ v.label }}</text>
          </g>
        </g>

      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  speed: { type: Number, default: 0.005 },
  tetraAColor: { type: String, default: '#FFFFFF' }, // Männlich (Sonne)
  tetraBColor: { type: String, default: '#8EF5D2' }, // Weiblich (Mond)
  lineWidth: { type: Number, default: 0.9 },
  tiltX: { type: Number, default: 0.1 }
});

const R = 85;
const r = R * Math.sqrt(8) / 3;
const deg2rad = Math.PI / 180;

// Trustbridge-Vokabular. Die alten Begriffe (Erfolg, Reichtum,
// Wohlstand ...) stammten aus der TrustBox-Zeit und widersprachen
// leise dem Aufstieg im selben Viewport, der Vertrauen, Klarheit,
// Eigenverantwortung und Wachstum verspricht - Wohlstandssprache
// neben Innensprache. Hier stehen bewusst Nachbarbegriffe derselben
// Familie, keine Dubletten der Aufstiegs-Woerter.
// Aufsteigender Tetraeder: das Aktive, der Schritt.
const wordsA = ["Mut", "Wandel", "Entscheidung", ""];
// Empfangender Tetraeder: das Ruhende, der Grund.
const wordsB = ["Ruhe", "Verbundenheit", "Dankbarkeit", "Weite"];

// Männlicher Tetraeder (Spitze nach oben)
const verticesA = [
  { x: 0, y: -R, z: 0, label: wordsA[0] },
  { x: r * Math.cos(270 * deg2rad), y: R/3, z: r * Math.sin(270 * deg2rad), label: wordsA[1] },
  { x: r * Math.cos(30 * deg2rad), y: R/3, z: r * Math.sin(30 * deg2rad), label: wordsA[2] },
  { x: r * Math.cos(150 * deg2rad), y: R/3, z: r * Math.sin(150 * deg2rad), label: wordsA[3] }
];

// Weiblicher Tetraeder (Spitze nach unten, leicht tiefer)
const offsetY = 15;
const verticesB = [
  { x: 0, y: R + offsetY, z: 0, label: wordsB[0] },
  { x: r * Math.cos(90 * deg2rad), y: -R/3 + offsetY, z: r * Math.sin(90 * deg2rad), label: wordsB[1] },
  { x: r * Math.cos(210 * deg2rad), y: -R/3 + offsetY, z: r * Math.sin(210 * deg2rad), label: wordsB[2] },
  { x: r * Math.cos(330 * deg2rad), y: -R/3 + offsetY, z: r * Math.sin(330 * deg2rad), label: wordsB[3] }
];

const edgesIndices = [
  [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]
];

const maleEdges = ref([]);
const maleVertices = ref([]);
const femaleEdges = ref([]);
const femaleVertices = ref([]);

let angleY_A = 0;
let angleY_B = 0;

let animationFrameId;

function project(x, y, z, angleY) {
  let cosY = Math.cos(angleY);
  let sinY = Math.sin(angleY);
  let x1 = x * cosY + z * sinY;
  let z1 = -x * sinY + z * cosY;

  let cosX = Math.cos(props.tiltX);
  let sinX = Math.sin(props.tiltX);
  let y2 = y * cosX - z1 * sinX;
  let z2 = y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

function update() {
  // Männlich: rechts nach links (Front bewegt sich nach links = x wird kleiner = angle positiv)
  angleY_A += props.speed;
  // Weiblich: links nach rechts (Front bewegt sich nach rechts = x wird größer = angle negativ)
  angleY_B -= props.speed;
  
  const mEdges = [];
  const mVerts = [];
  const fEdges = [];
  const fVerts = [];
  
  // Tetra A (Männlich)
  edgesIndices.forEach(idx => {
    let p1 = project(verticesA[idx[0]].x, verticesA[idx[0]].y, verticesA[idx[0]].z, angleY_A);
    let p2 = project(verticesA[idx[1]].x, verticesA[idx[1]].y, verticesA[idx[1]].z, angleY_A);
    let avgZ = (p1.z + p2.z) / 2;
    let depthRatio = Math.max(0, Math.min(1, (avgZ + R) / (R * 2)));
    let opacity = 0.9 - (depthRatio * 0.85); // Starker 3D-Fade
    
    mEdges.push({
      x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
      color: props.tetraAColor, width: props.lineWidth, opacity: opacity, avgZ: avgZ
    });
  });
  verticesA.forEach(vert => {
    if (vert.label) {
      let p = project(vert.x, vert.y, vert.z, angleY_A);
      let depthRatio = Math.max(0, Math.min(1, (p.z + R) / (R * 2)));
      mVerts.push({ x: p.x, y: p.y, z: p.z, color: props.tetraAColor, opacity: 1.0 - (depthRatio * 0.9), label: vert.label });
    }
  });

  // Tetra B (Weiblich)
  edgesIndices.forEach(idx => {
    let p1 = project(verticesB[idx[0]].x, verticesB[idx[0]].y, verticesB[idx[0]].z, angleY_B);
    let p2 = project(verticesB[idx[1]].x, verticesB[idx[1]].y, verticesB[idx[1]].z, angleY_B);
    let avgZ = (p1.z + p2.z) / 2;
    let depthRatio = Math.max(0, Math.min(1, (avgZ + R) / (R * 2)));
    let opacity = 0.9 - (depthRatio * 0.85);
    
    fEdges.push({
      x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
      color: props.tetraBColor, width: props.lineWidth, opacity: opacity, avgZ: avgZ
    });
  });
  verticesB.forEach(vert => {
    if (vert.label) {
      let p = project(vert.x, vert.y, vert.z, angleY_B);
      let depthRatio = Math.max(0, Math.min(1, (p.z + R) / (R * 2)));
      fVerts.push({ x: p.x, y: p.y, z: p.z, color: props.tetraBColor, opacity: 1.0 - (depthRatio * 0.9), label: vert.label });
    }
  });
  
  // Sortierung nur intern innerhalb der Gruppen für perfekten 3D-Look
  mEdges.sort((a, b) => b.avgZ - a.avgZ);
  mVerts.sort((a, b) => b.z - a.z);
  fEdges.sort((a, b) => b.avgZ - a.avgZ);
  fVerts.sort((a, b) => b.z - a.z);

  maleEdges.value = mEdges;
  maleVertices.value = mVerts;
  femaleEdges.value = fEdges;
  femaleVertices.value = fVerts;

  animationFrameId = requestAnimationFrame(update);
}

onMounted(() => {
  update();
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.merkaba-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.merkaba-svg-3d {
  width: 100%;
  height: 100%;
  max-width: 800px;
  max-height: 800px;
  overflow: visible;
}

.tetra-male {
  transform-origin: center center;
}

.tetra-female {
  transform-origin: center center;
}

.vertex-label {
  text-shadow: 0 0 10px rgba(0,0,0,0.8);
  pointer-events: none;
}
</style>
