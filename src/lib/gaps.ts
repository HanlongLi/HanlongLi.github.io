import { site } from '../site.config';
import { profile } from '../data/profile';
import { projects } from '../data/research';
import { patents, publications } from '../data/publications';
import { experience } from '../data/experience';
import { misc, showMisc } from '../data/misc';
import { projectPages } from '../data/projectPages';
import { hasPublicCv } from './cv';
import { getPortraitImage, getResearchImage } from './media';

export interface GapGroup {
  area: string;
  items: string[];
}

/**
 * Everything the site knows is missing. Shown only in `npm run dev`
 * (bottom-right "Content gaps" panel) and printed during `npm run build`.
 */
export function collectGaps(): GapGroup[] {
  const groups: GapGroup[] = [];
  const push = (area: string, items: string[]) => {
    if (items.length) groups.push({ area, items });
  };

  const profileItems: string[] = [];
  if (!hasPublicCv) profileItems.push(`Public CV PDF at public/${site.cv.path}`);
  if (!getPortraitImage(profile.portrait.file || undefined)) profileItems.push('Portrait photo (src/assets/portrait/)');
  const links: [string, string][] = [
    ['Google Scholar', site.contact.scholar],
    ['LinkedIn', site.contact.linkedin],
  ];
  for (const [label, href] of links) if (!href) profileItems.push(`${label} profile URL`);
  push('Profile & links', profileItems);

  for (const p of projects) {
    const items = [...(p.gaps ?? [])];
    if (!getResearchImage(p.figure?.file) && !items.some((g) => /figure/i.test(g))) {
      items.unshift('Project figure (placeholder shown)');
    }
    if (p.disclosure?.status === 'pending') items.unshift(`Disclosure pending: ${p.disclosure.note}`);
    push(`Research · ${p.shortTitle}`, [...new Set(items)]);
  }

  for (const pub of [...publications, ...patents]) {
    push(`Publication · ${pub.title.split(':')[0]}`, pub.gaps ?? []);
  }

  for (const e of experience) {
    const items = [...(e.gaps ?? [])];
    if (e.disclosure?.status === 'pending') items.unshift(`Disclosure pending: ${e.disclosure.note}`);
    push(`Experience · ${e.unit ?? e.organization}`, [...new Set(items)]);
  }

  for (const page of projectPages) push(`Project page · ${page.title.split(':')[0]}`, page.gaps ?? []);

  for (const entry of misc.entries) push(`Misc · ${entry.title}`, entry.gaps ?? []);

  if (!showMisc) {
    push('Misc page', ['Add “Outside the lab” entries in src/data/misc.ts (the page stays hidden until then)']);
  }

  return groups;
}
