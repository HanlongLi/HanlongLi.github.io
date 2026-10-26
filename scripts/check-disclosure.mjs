#!/usr/bin/env node
/**
 * Post-build guard against accidental disclosure.
 *
 * Runs automatically after `astro build` (see package.json) and in CI. It
 * fails the build if the generated site contains:
 *   - any text pattern listed in DENYLIST below (embargoed results or wording), or
 *   - any file that looks like an internal / draft document.
 *
 * When AIRoA explicitly approves a result for publication, remove the
 * matching pattern here *in the same commit* that adds it to the site, and
 * note the approval in the commit message.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

/** Patterns matched against the visible text of every built page. */
const DENYLIST = [
  // AIRoA results, counts and implementation details were cleared for publication
  // on 2026-10-26 and removed from this list. Add new embargoed items here.
  { pattern: /internal (working )?draft/i, reason: 'internal-draft wording from the CV' },
];

/** File names that must never be deployed. */
const FORBIDDEN_FILES = [/internal/i, /draft/i, /private/i, /\.docx?$/i];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');

let files;
try {
  files = walk(DIST);
} catch {
  console.error('[disclosure] dist/ not found. Run `astro build` first.');
  process.exit(1);
}

const problems = [];

for (const file of files) {
  const rel = relative(DIST, file);
  for (const re of FORBIDDEN_FILES) {
    if (re.test(rel)) problems.push(`${rel}: file name matches ${re} (internal documents must not be deployed)`);
  }
  if (!/\.(html|xml|txt|json)$/i.test(file)) continue;
  const raw = readFileSync(file, 'utf8');
  const text = file.endsWith('.html') ? visibleText(raw) : raw;
  for (const { pattern, reason } of DENYLIST) {
    const match = text.match(pattern);
    if (match) problems.push(`${rel}: "${match[0]}" (${reason})`);
  }
}

if (problems.length) {
  console.error('\n[disclosure] Build output contains material that is not cleared for publication:\n');
  for (const p of problems) console.error(`  ✗ ${p}`);
  console.error('\nRemove it from the content files, or update scripts/check-disclosure.mjs once it is approved.\n');
  process.exit(1);
}

console.log(`[disclosure] OK: checked ${files.length} files, no unapproved internal material found.`);
