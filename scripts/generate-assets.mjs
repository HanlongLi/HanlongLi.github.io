#!/usr/bin/env node
/**
 * Generates favicons and the Open Graph social card from SVG sources.
 * Run with `npm run assets` after changing the name, tagline or palette;
 * the PNG outputs are committed, so this is not part of the normal build.
 */
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const out = (name) => new URL(`../public/${name}`, import.meta.url).pathname;

const paper = '#faf8f3';
const panel = '#f2efe7';
const ink = '#1d1d1b';
const ink2 = '#45443f';
const ink3 = '#6b6a63';
const rule = '#ddd8cc';
const accent = '#2d5b7a';
const serif = "'Source Serif 4', 'Source Serif Pro', Georgia, 'Times New Roman', serif";
const sans = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const mono = "'SF Mono', Menlo, Consolas, monospace";

/* Favicon: monogram on charcoal, accent on the L. */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${ink}"/>
  <text x="32" y="44" text-anchor="middle" font-family="${serif}" font-size="32" font-weight="500" letter-spacing="-1" fill="${paper}">H<tspan fill="#9cc0d6">L</tspan></text>
</svg>`;

/* Social card, 1200×630. */
const stages = [
  ['Visual', 'communication', '2023'],
  ['Acoustic', 'communication', '2024'],
  ['Whole-body', 'planning', '2025'],
  ['Real-world', 'VLA &amp; RL', '2026'],
  ['Generalizable', 'manipulation', 'Next'],
];
const x0 = 80;
const step = 165;
const lineY = 500;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M30 0H0V30" fill="none" stroke="${rule}" stroke-opacity="0.55" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${paper}"/>
  <rect x="880" y="0" width="320" height="630" fill="${panel}"/>
  <rect x="880" y="0" width="320" height="630" fill="url(#grid)"/>
  <line x1="880" y1="0" x2="880" y2="630" stroke="${rule}"/>
  <text x="1040" y="322" text-anchor="middle" font-family="${serif}" font-size="172" font-weight="300" fill="${ink}" fill-opacity="0.85">H<tspan fill="${accent}">L</tspan></text>

  <text x="${x0}" y="120" font-family="${mono}" font-size="20" letter-spacing="2.5" fill="${accent}">ROBOT LEARNING · MANIPULATION · EMBODIED AI</text>
  <text x="${x0 - 4}" y="235" font-family="${serif}" font-size="104" font-weight="500" letter-spacing="-2" fill="${ink}">Hanlong Li</text>
  <text x="${x0}" y="300" font-family="${sans}" font-size="26" fill="${ink2}">M.Eng. student, Institute of Science Tokyo</text>
  <text x="${x0}" y="338" font-family="${sans}" font-size="26" fill="${ink2}">Research Engineer Intern, AIRoA</text>

  <line x1="${x0}" y1="${lineY}" x2="${x0 + step * 4}" y2="${lineY}" stroke="${ink3}" stroke-opacity="0.45" stroke-width="2"/>
  ${stages
    .map(([l1, l2, year], i) => {
      const x = x0 + i * step;
      const future = i === stages.length - 1;
      const color = future ? accent : ink2;
      return `<circle cx="${x}" cy="${lineY}" r="7" fill="${future ? paper : accent}" stroke="${accent}" stroke-width="2.5"${future ? ' stroke-dasharray="3 3"' : ''}/>
  <text x="${x - 7}" y="${lineY - 22}" font-family="${mono}" font-size="15" letter-spacing="1" fill="${ink3}">${year.toUpperCase()}</text>
  <text x="${x - 7}" y="${lineY + 38}" font-family="${sans}" font-size="17" fill="${color}">${l1}</text>
  <text x="${x - 7}" y="${lineY + 60}" font-family="${sans}" font-size="17" fill="${color}">${l2}</text>`;
    })
    .join('\n  ')}
</svg>`;

writeFileSync(out('favicon.svg'), favicon);
await sharp(Buffer.from(favicon), { density: 384 }).resize(32, 32).png().toFile(out('favicon-32.png'));
await sharp(Buffer.from(favicon), { density: 768 })
  .resize(180, 180)
  .flatten({ background: ink })
  .png()
  .toFile(out('apple-touch-icon.png'));
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(out('og-image.png'));

console.log('Generated favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png in public/.');
