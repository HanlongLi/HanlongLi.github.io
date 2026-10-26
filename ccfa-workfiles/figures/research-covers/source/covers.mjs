#!/usr/bin/env node
/**
 * Research-entry cover schematics. The Talking Robot entry uses the paper's own system figure
 * (src/assets/research/talking-robot-system.png), so its schematic is kept here but not rendered.
 *
 * Visual contract
 *   Artifacts      src/assets/research/<project-id>-cover.png (canonical; picked up by the site)
 *   Preview        ccfa-workfiles/figures/research-covers/build/preview.png
 *   Destination    figure slot of each research entry (~430 px wide desktop, full width mobile)
 *   Canvas         1600 x 1000 (16:10); labels 44-64 px so they stay >= ~12 px when displayed
 *   Preset         soft-mechanism, recoloured to the site palette: ink + one blue contribution
 *                  accent + terracotta only for noise / problem / baseline; Times New Roman
 *   Content rule   every node, signal and label comes from the paper / project page / CV.
 *                  Schematics only: no data plots, no measured curves, no fabricated photos.
 *
 * Run from the project root:  node ccfa-workfiles/figures/research-covers/source/covers.mjs
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '../../../..');
const OUT = join(root, 'src/assets/research');
const BUILD = join(here, '../build');
mkdirSync(OUT, { recursive: true });
mkdirSync(BUILD, { recursive: true });

const W = 1600;
const H = 1000;
const C = {
  bg: '#f4f1ea',
  grid: '#e5e0d4',
  ink: '#1d1d1b',
  ink2: '#45443f',
  muted: '#6b6a63',
  line: '#8f8a7e',
  node: '#fffdf8',
  nodeStroke: '#b9b2a2',
  accent: '#2d5b7a',
  accentStrong: '#1f4560',
  accentSoft: '#dde8ee',
  warm: '#b5552f',
  warmSoft: '#f6e4da',
};
const FONT = "'Times New Roman', Times, serif";

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function text(x, y, str, { size = 50, anchor = 'middle', weight = 400, fill = C.ink, italic = false, rotate } = {}) {
  const t = rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : '';
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}"${
    italic ? ' font-style="italic"' : ''
  } fill="${fill}" text-anchor="${anchor}"${t}>${esc(str)}</text>`;
}

const STYLES = {
  neutral: { fill: C.node, stroke: C.nodeStroke, sw: 2.5, dash: '' },
  accent: { fill: C.accentSoft, stroke: C.accent, sw: 3.5, dash: '' },
  dashed: { fill: C.node, stroke: C.line, sw: 2.5, dash: '12 9' },
  warm: { fill: C.warmSoft, stroke: C.warm, sw: 3, dash: '12 9' },
};

function box(x, y, w, h, kind = 'neutral', r = 16) {
  const s = STYLES[kind];
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${s.fill}" stroke="${s.stroke}" stroke-width="${s.sw}"${
    s.dash ? ` stroke-dasharray="${s.dash}"` : ''
  }/>`;
}

/** A node with a main label and an optional second line. */
function node(x, y, w, h, kind, label, sub, { size = 56, subSize = 44 } = {}) {
  const cx = x + w / 2;
  const strong = kind === 'accent';
  const main = text(cx, sub ? y + h / 2 - 2 : y + h / 2 + size * 0.34, label, {
    size,
    weight: strong ? 700 : 400,
    fill: strong ? C.accentStrong : C.ink,
  });
  const second = sub ? text(cx, y + h / 2 + subSize + 6, sub, { size: subSize, fill: C.muted }) : '';
  return box(x, y, w, h, kind) + main + second;
}

const MARKERS = { ink: C.ink2, accent: C.accent, warm: C.warm, muted: C.line };
const defs = `<defs>${Object.entries(MARKERS)
  .map(
    ([k, col]) =>
      `<marker id="ah-${k}" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="11" markerHeight="11" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M1,1 L11,6 L1,11 z" fill="${col}"/></marker>`,
  )
  .join('')}<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="${C.grid}" stroke-width="1"/></pattern></defs>`;

/** Arrow along an SVG path. tone: ink | accent | warm | muted. */
function arrow(d, { tone = 'ink', width = 3, dash = '' } = {}) {
  return `<path d="${d}" fill="none" stroke="${MARKERS[tone]}" stroke-width="${width}" stroke-linecap="round"${
    dash ? ` stroke-dasharray="${dash}"` : ''
  } marker-end="url(#ah-${tone})"/>`;
}
const line = (x1, y1, x2, y2, o) => arrow(`M${x1},${y1} L${x2},${y2}`, o);
const curve = (x1, y1, x2, y2, o) => {
  const mx = (x1 + x2) / 2;
  return arrow(`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, o);
};

const frame = (body, dy = 0) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${defs}` +
  `<rect width="${W}" height="${H}" fill="${C.bg}"/><rect width="${W}" height="${H}" fill="url(#grid)"/>` +
  `<g transform="translate(0 ${dy})">${body}</g></svg>`;

/* ------------------------------------------------------------------ */
/* Covers                                                              */
/* ------------------------------------------------------------------ */

/** OpenArm RL execution tracker: VLA chunks -> (PD | RL tracker) -> OpenArm. */
function openarmRl() {
  let s = '';
  s += node(80, 390, 220, 220, 'neutral', 'VLA', null, { size: 72 });
  s += line(300, 500, 356, 500);
  // action-chunk stream: 8 commands, one late / perturbed (imperfect stream)
  s += text(567, 430, 'action chunks', { size: 52, fill: C.muted });
  for (let i = 0; i < 8; i++) {
    const x = 372 + i * 50;
    const late = i === 5;
    s += `<rect x="${x}" y="${late ? 486 : 464}" width="40" height="72" rx="6" fill="${late ? C.warmSoft : C.accentSoft}" stroke="${
      late ? C.warm : C.accent
    }" stroke-width="3"${late ? ' stroke-dasharray="8 6"' : ''}/>`;
  }
  s += text(567, 620, 'imperfect stream', { size: 50, fill: C.warm, italic: true });
  // fork into the two trackers
  s += curve(782, 500, 846, 360, { tone: 'muted', dash: '10 8' });
  s += curve(782, 500, 846, 640, { tone: 'accent', width: 4 });
  s += node(850, 300, 330, 120, 'dashed', 'PD baseline', null, { size: 56 });
  s += node(850, 566, 330, 150, 'accent', 'RL tracker', 'PPO', { size: 58 });
  // OpenArm schematic (base, three links, downward gripper) following a commanded path
  const J = [
    [1330, 836],
    [1290, 640],
    [1400, 500],
    [1462, 556],
  ];
  s += `<path d="M1376,700 C1410,650 1440,622 1462,616 S1520,600 1540,584" fill="none" stroke="${C.accent}" stroke-width="3.5" stroke-dasharray="4 10" stroke-linecap="round"/>`;
  s += `<rect x="1250" y="836" width="170" height="32" rx="6" fill="${C.ink2}"/>`;
  for (let i = 0; i < 3; i++) {
    s += `<line x1="${J[i][0]}" y1="${J[i][1]}" x2="${J[i + 1][0]}" y2="${J[i + 1][1]}" stroke="${C.ink2}" stroke-width="${
      28 - i * 6
    }" stroke-linecap="round"/>`;
  }
  s += `<path d="M1436,568 h52 M1440,568 v42 M1484,568 v42" stroke="${C.ink2}" stroke-width="9" stroke-linecap="round"/>`;
  for (const [x, y] of J) s += `<circle cx="${x}" cy="${y}" r="${y === 556 ? 12 : 17}" fill="${C.node}" stroke="${C.ink2}" stroke-width="5"/>`;
  s += curve(1180, 360, 1266, 626, { tone: 'muted', dash: '10 8' });
  s += curve(1180, 640, 1266, 648, { tone: 'accent', width: 4 });
  s += text(1335, 928, 'OpenArm · MuJoCo', { size: 50, fill: C.muted });
  return frame(s, -50);
}

/** Real-world VLA: async inference -> time-aligned chunks -> interpolated control -> dual-arm Franka. */
function vlaRealWorld() {
  let s = '';
  const t0 = 430;
  const t1 = 1180;
  s += text(64, 262, 'async inference', { size: 52, anchor: 'start' });
  s += text(64, 462, 'action chunks', { size: 52, anchor: 'start' });
  s += text(64, 668, 'control', { size: 52, anchor: 'start' });
  const starts = [460, 680, 900];
  starts.forEach((x, i) => {
    s += `<rect x="${x}" y="222" width="110" height="58" rx="8" fill="${C.accent}"/>`;
    const a = x + 110;
    const end = Math.min(a + 380, t1);
    const y = 480 - i * 50;
    s += line(a, 282, a, y - 4, { tone: 'accent', width: 2.5 });
    s += `<rect x="${a}" y="${y}" width="${end - a}" height="40" rx="8" fill="${C.accentSoft}" stroke="${C.accent}" stroke-width="3"/>`;
    if (i > 0) s += `<line x1="${a}" y1="${532}" x2="${a}" y2="${730}" stroke="${C.accent}" stroke-width="2" stroke-dasharray="6 8" opacity="0.6"/>`;
  });
  // interpolated high-rate command: smooth curve sampled densely
  const f = (x) => 660 - 46 * Math.sin((x - 560) / 120) - 18 * Math.sin((x - 560) / 47);
  let d = '';
  let dots = '';
  for (let x = 570; x <= t1; x += 6) d += `${x === 570 ? 'M' : 'L'}${x},${f(x).toFixed(1)}`;
  for (let x = 570; x <= t1; x += 18) dots += `<circle cx="${x}" cy="${f(x).toFixed(1)}" r="4.5" fill="${C.accentStrong}"/>`;
  s += `<path d="${d}" fill="none" stroke="${C.accent}" stroke-width="3"/>${dots}`;
  s += line(t0, 790, t1 + 30, 790, { tone: 'muted', width: 2.5 });
  s += text(t1 - 20, 850, 'time', { size: 50, fill: C.muted, anchor: 'end', italic: true });
  // dual-arm robot (two arms on a shared torso / table)
  s += line(1196, f(1180) - 10, 1268, 600, { tone: 'accent', width: 4 });
  s += `<line x1="1250" y1="770" x2="1540" y2="770" stroke="${C.ink2}" stroke-width="6" stroke-linecap="round"/>`;
  s += `<rect x="1374" y="486" width="52" height="284" rx="12" fill="${C.node}" stroke="${C.ink2}" stroke-width="5"/>`;
  const arm = (sx, ex, gx) =>
    `<polyline points="${sx},506 ${ex},580 ${gx},690" fill="none" stroke="${C.ink2}" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="${ex}" cy="580" r="14" fill="${C.node}" stroke="${C.ink2}" stroke-width="5"/>` +
    `<path d="M${gx - 16},708 v28 M${gx + 16},708 v28 M${gx - 20},704 h40" stroke="${C.ink2}" stroke-width="8" stroke-linecap="round"/>`;
  s += arm(1384, 1296, 1312) + arm(1416, 1504, 1488);
  s += text(1390, 846, 'dual-arm Franka', { size: 48, fill: C.muted });
  return frame(s, 0);
}

/** LCC: training instruction + paraphrases (+ wrong-instruction probe) -> VLA -> K chunks -> medoid. */
function lcc() {
  let s = '';
  s += text(285, 130, 'instructions', { size: 50, fill: C.muted });
  const cards = ['training instruction', 'paraphrase 1', 'paraphrase 2', 'paraphrase 3'];
  cards.forEach((label, i) => {
    const y = 160 + i * 116;
    s += box(64, y, 430, 96, 'neutral', 12);
    s += text(90, y + 46, label, { size: 44, anchor: 'start', fill: i === 0 ? C.ink : C.ink2 });
    s += `<rect x="90" y="${y + 62}" width="${i === 0 ? 300 : 250 + i * 18}" height="12" rx="6" fill="${C.nodeStroke}"/>`;
    s += curve(494, y + 48, 596, 470, { tone: 'ink', width: 2.5 });
  });
  s += box(64, 676, 430, 96, 'warm', 12);
  s += text(90, 722, 'wrong instruction', { size: 44, anchor: 'start', fill: C.warm });
  s += `<rect x="90" y="740" width="220" height="12" rx="6" fill="${C.warm}" opacity="0.45"/>`;
  s += text(279, 828, 'reliance probe', { size: 46, fill: C.warm, italic: true });
  s += curve(494, 724, 596, 520, { tone: 'warm', width: 2.5, dash: '10 8' });
  s += node(600, 390, 240, 160, 'neutral', 'VLA', null, { size: 72 });
  // K action chunks from the K prompts; the medoid is the most central one
  s += text(1000, 262, 'K action chunks', { size: 52, fill: C.muted });
  const ends = [330, 405, 470, 535, 610];
  ends.forEach((ey, i) => {
    const med = i === 2;
    const d = `M840,470 C960,470 980,${ey} 1140,${ey}`;
    s += `<path d="${d}" fill="none" stroke="${med ? C.accent : C.line}" stroke-width="${med ? 6 : 3}" stroke-linecap="round"/>`;
    s += `<circle cx="1140" cy="${ey}" r="${med ? 12 : 8}" fill="${med ? C.accent : C.line}"/>`;
  });
  s += text(1170, 489, 'medoid', { size: 58, anchor: 'start', weight: 700, fill: C.accentStrong });
  // executed action: a parallel gripper over the LIBERO task
  s += line(1360, 470, 1418, 470, { tone: 'accent', width: 4 });
  s += `<rect x="1462" y="392" width="40" height="40" rx="6" fill="${C.ink2}"/>`;
  s += `<path d="M1432,440 h100 M1442,440 v76 M1522,440 v76" stroke="${C.ink2}" stroke-width="10" stroke-linecap="round"/>`;
  s += `<rect x="1462" y="482" width="40" height="40" rx="5" fill="${C.accentSoft}" stroke="${C.accent}" stroke-width="3"/>`;
  s += text(1482, 596, 'LIBERO', { size: 50, fill: C.muted });
  return frame(s, 30);
}

/** AMBIT: hand-trajectory preview -> CVAE (K=16) -> selector -> commit -> whole-body QP, on a humanoid. */
function ambit() {
  let s = '';
  // humanoid (front view), pelvis P, waist W; upper body rotates about W per strategy
  const Wst = [370, 548];
  s += `<line x1="110" y1="880" x2="640" y2="880" stroke="${C.ink2}" stroke-width="5" stroke-linecap="round"/>`;
  s += `<polyline points="342,610 330,745 318,872" fill="none" stroke="${C.ink2}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<polyline points="398,610 410,745 422,872" fill="none" stroke="${C.ink2}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`;
  const upper = (col, op, sw) =>
    `<g opacity="${op}" stroke="${col}" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
    `<line x1="370" y1="548" x2="370" y2="392" stroke-width="${sw + 6}"/>` +
    `<line x1="296" y1="404" x2="444" y2="404" stroke-width="${sw}"/>` +
    `<polyline points="296,404 232,476 174,520" stroke-width="${sw}"/>` +
    `<polyline points="444,404 508,476 566,520" stroke-width="${sw}"/>` +
    `<circle cx="370" cy="336" r="40" stroke-width="${sw - 6}" fill="${C.bg}"/></g>`;
  const rot = (deg, inner) => `<g transform="rotate(${deg} ${Wst[0]} ${Wst[1]})">${inner}</g>`;
  for (const a of [-16, -7, 15]) s += rot(a, upper(C.line, 0.26, 11));
  const commit = 6;
  s += rot(commit, upper(C.accent, 1, 16));
  s += `<rect x="326" y="566" width="88" height="48" rx="10" fill="${C.node}" stroke="${C.ink2}" stroke-width="5"/>`;
  s += `<circle cx="${Wst[0]}" cy="${Wst[1]}" r="12" fill="${C.accent}"/>`;
  // hand targets at the committed pose's hands, with their previewed trajectories
  const rotate = ([x, y], deg) => {
    const r = (deg * Math.PI) / 180;
    const dx = x - Wst[0];
    const dy = y - Wst[1];
    return [Wst[0] + dx * Math.cos(r) - dy * Math.sin(r), Wst[1] + dx * Math.sin(r) + dy * Math.cos(r)];
  };
  for (const h of [rotate([174, 520], commit), rotate([566, 520], commit)]) {
    const [x, y] = h.map((v) => +v.toFixed(1));
    s += `<path d="M${x - 70},${y - 110} Q${x - 40},${y - 30} ${x},${y}" fill="none" stroke="${C.accent}" stroke-width="3.5" stroke-dasharray="3 10" stroke-linecap="round"/>`;
    s += `<circle cx="${x}" cy="${y}" r="20" fill="none" stroke="${C.accent}" stroke-width="4"/><path d="M${x - 30},${y} h60 M${x},${y - 30} v60" stroke="${C.accent}" stroke-width="3"/>`;
  }
  s += text(370, 952, 'pelvis + waist recruitment', { size: 48, fill: C.muted });
  // pipeline
  const X = 790;
  const Wd = 720;
  const rows = [
    ['trajectory preview', 'neutral'],
    ['CVAE · K = 16 samples', 'accent'],
    ['filter · rank · verify', 'accent'],
    ['commit with hysteresis', 'accent'],
    ['whole-body QP', 'neutral'],
  ];
  rows.forEach(([label, kind], i) => {
    const y = 110 + i * 166;
    s += node(X, y, Wd, 110, kind, label, null, { size: 54 });
    if (i < rows.length - 1) s += line(X + Wd / 2, y + 110, X + Wd / 2, y + 160, { tone: kind === 'accent' ? 'accent' : 'ink' });
  });
  s += `<line x1="752" y1="276" x2="752" y2="718" stroke="${C.accent}" stroke-width="5" stroke-linecap="round"/>`;
  s += text(722, 497, 'AMBIT', { size: 52, weight: 700, fill: C.accentStrong, rotate: -90 });
  s += curve(560, 380, X - 4, 165, { tone: 'accent', width: 3, dash: '3 10' });
  s += arrow(`M${X},830 C620,830 560,700 430,604`, { tone: 'ink', width: 3 });
  return frame(s, -20);
}

/** The Talking Robot: robot A -> TTS transmitter -> noisy channel -> Conformer-CTC receiver -> robot B. */
function talkingRobot() {
  let s = '';
  const robot = (x, y, label) =>
    `<line x1="${x + 70}" y1="${y - 34}" x2="${x + 70}" y2="${y}" stroke="${C.ink2}" stroke-width="6"/><circle cx="${x + 70}" cy="${y - 40}" r="10" fill="${C.ink2}"/>` +
    `<rect x="${x}" y="${y}" width="140" height="130" rx="26" fill="${C.node}" stroke="${C.ink2}" stroke-width="6"/>` +
    `<circle cx="${x + 46}" cy="${y + 56}" r="13" fill="${C.ink2}"/><circle cx="${x + 94}" cy="${y + 56}" r="13" fill="${C.ink2}"/>` +
    `<rect x="${x + 40}" y="${y + 90}" width="60" height="10" rx="5" fill="${C.ink2}"/>` +
    text(x + 70, y + 200, label, { size: 50, fill: C.muted });
  const bubble = (x, y, w, tailX, tailDir) =>
    `<path d="M${x + 24},${y} h${w - 48} q24,0 24,24 v52 q0,24 -24,24 H${tailX + 22} l${-18 * tailDir},28 l${-4 * tailDir},-28 H${x + 24} q-24,0 -24,-24 v-52 q0,-24 24,-24 z" fill="${C.node}" stroke="${C.nodeStroke}" stroke-width="3"/>` +
    text(x + w / 2, y + 64, '“move forward 5 meters”', { size: 46, italic: true });
  s += bubble(90, 190, 500, 200, 1) + bubble(1030, 190, 500, 1420, -1);
  s += robot(120, 440, 'robot A');
  s += line(266, 505, 306, 505);
  s += node(312, 430, 250, 150, 'accent', 'TTS', 'transmitter', { size: 60 });
  s += line(566, 505, 610, 505, { tone: 'accent' });
  // waveform: clean, then through the distorting channel
  let clean = '';
  let noisy = '';
  for (let x = 620; x <= 1040; x += 4) {
    const env = Math.sin(((x - 620) / 420) * Math.PI);
    const y = 505 - 52 * env * Math.sin((x - 620) / 13);
    clean += `${x === 620 ? 'M' : 'L'}${x},${y.toFixed(1)}`;
    if (x >= 820) {
      const n = 18 * Math.sin(x * 1.7) * Math.cos(x * 0.53);
      noisy += `${x === 820 ? 'M' : 'L'}${x},${(y + n).toFixed(1)}`;
    }
  }
  s += `<rect x="810" y="420" width="240" height="170" rx="14" fill="${C.warmSoft}" stroke="${C.warm}" stroke-width="3" stroke-dasharray="12 9"/>`;
  s += `<path d="${clean}" fill="none" stroke="${C.accent}" stroke-width="4"/>`;
  s += `<path d="${noisy}" fill="none" stroke="${C.warm}" stroke-width="3" opacity="0.85"/>`;
  s += text(930, 644, 'noisy channel', { size: 50, fill: C.warm });
  s += line(1052, 505, 1086, 505, { tone: 'warm' });
  s += node(1090, 430, 296, 150, 'accent', 'ASR', 'Conformer-CTC', { size: 60, subSize: 40 });
  s += line(1388, 505, 1412, 505);
  s += robot(1416, 440, 'robot B');
  s += `<path d="M437,420 C437,356 1238,356 1238,420" fill="none" stroke="${C.accent}" stroke-width="3" stroke-dasharray="10 8"/>`;
  s += text(830, 338, 'co-trained end-to-end', { size: 48, fill: C.accentStrong, italic: true });
  return frame(s, 60);
}

/** Bio-Agentic: UAV waggle / LED signals, perception, LLM + RAG over bio-strategies, LED + maneuver response. */
function bioAgentic() {
  let s = '';
  const uav = (cx, cy, leds) => {
    let g = '';
    for (const [dx, dy] of [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ]) {
      g += `<line x1="${cx}" y1="${cy}" x2="${cx + dx * 74}" y2="${cy + dy * 60}" stroke="${C.ink2}" stroke-width="10" stroke-linecap="round"/>`;
      g += `<ellipse cx="${cx + dx * 74}" cy="${cy + dy * 60}" rx="44" ry="12" fill="${C.node}" stroke="${C.ink2}" stroke-width="4"/>`;
    }
    g += `<rect x="${cx - 44}" y="${cy - 24}" width="88" height="48" rx="14" fill="${C.node}" stroke="${C.ink2}" stroke-width="5"/>`;
    leds.forEach((col, i) => (g += `<circle cx="${cx - 22 + i * 22}" cy="${cy}" r="8" fill="${col}"/>`));
    return g;
  };
  const G = '#2e8b57';
  const R = '#c0392b';
  const OFF = '#b9b2a2';
  // UAV1 performs a waggle signal; UAV2 perceives it; UAV3 receives the relayed response
  s += uav(300, 250, [G, G, G]);
  let wag = '';
  for (let x = 170; x <= 430; x += 4) wag += `${x === 170 ? 'M' : 'L'}${x},${(410 + 22 * Math.sin((x - 170) / 11)).toFixed(1)}`;
  s += arrow(wag, { tone: 'accent', width: 3.5 });
  s += text(300, 498, 'waggle + LED signal', { size: 50, fill: C.muted });
  s += `<path d="M736,250 L452,180 L452,330 Z" fill="${C.accent}" opacity="0.13"/>`;
  s += uav(810, 250, [OFF, OFF, OFF]);
  s += text(810, 384, 'perception', { size: 50, fill: C.muted });
  s += uav(1320, 250, [R, R, R]);
  s += text(1320, 150, 'relayed response', { size: 50, fill: C.muted });
  // translation layer
  s += text(250, 600, 'bio-strategies', { size: 50, fill: C.muted });
  ['bee waggle', 'deer flagging', 'peacock display'].forEach((label, i) => {
    const y = 630 + i * 92;
    s += box(64, y, 372, 72, 'neutral', 36) + text(250, y + 51, label, { size: 46, fill: C.ink2 });
    s += curve(436, y + 36, 556, 740, { tone: 'ink', width: 2.5 });
  });
  s += node(560, 650, 420, 180, 'accent', 'LLM + RAG', 'translation layer', { size: 60 });
  s += line(810, 404, 790, 644, { tone: 'accent', width: 3.5 });
  s += arrow(`M980,740 C1180,740 1310,600 1318,336`, { tone: 'accent', width: 4 });
  s += text(1240, 846, 'motion + LED response', { size: 50, fill: C.accentStrong, italic: true });
  return frame(s, 30);
}

/* ------------------------------------------------------------------ */

const covers = {
  'openarm-rl': openarmRl,
  'vla-real-world': vlaRealWorld,
  lcc,
  ambit,
  'bio-agentic': bioAgentic,
};

const rendered = [];
for (const [id, make] of Object.entries(covers)) {
  const png = await sharp(Buffer.from(make())).png({ compressionLevel: 9 }).toBuffer();
  await sharp(png).toFile(join(OUT, `${id}-cover.png`));
  rendered.push(png);
}

// One contact sheet for review (3 x 2 at display scale).
const tw = 520;
const th = 325;
const cols = 3;
const tiles = await Promise.all(rendered.map((b) => sharp(b).resize(tw, th).png().toBuffer()));
await sharp({ create: { width: tw * cols + 40, height: th * Math.ceil(rendered.length / cols) + 30, channels: 3, background: '#ffffff' } })
  .composite(tiles.map((input, i) => ({ input, left: 10 + (i % 3) * (tw + 10), top: 10 + Math.floor(i / 3) * (th + 10) })))
  .png()
  .toFile(join(BUILD, 'preview.png'));

console.log(`Rendered ${rendered.length} covers to src/assets/research/ and a preview to build/preview.png`);
