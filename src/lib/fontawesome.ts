import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { LinkKind } from '../data/types';

/*
 * Font Awesome Free 5.15.3 icons (CC BY 4.0, https://fontawesome.com/license/free),
 * the same set the original project-page template loads from a CDN. They are
 * inlined as SVG at build time, so project pages make no icon-font request.
 */
const root = join(process.cwd(), 'node_modules/@fortawesome/fontawesome-free/svgs');
const cache = new Map<string, string>();

export type FaIcon =
  | 'solid/file-pdf'
  | 'brands/github'
  | 'brands/youtube'
  | 'solid/video'
  | 'solid/code'
  | 'solid/quote-right'
  | 'solid/link'
  | 'solid/globe'
  | 'solid/file-alt'
  | 'solid/file-powerpoint'
  | 'solid/image'
  | 'solid/database';

export function faSvg(icon: FaIcon): string {
  let svg = cache.get(icon);
  if (!svg) {
    svg = readFileSync(join(root, `${icon}.svg`), 'utf8')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace('<svg ', '<svg aria-hidden="true" focusable="false" style="height:1em;width:auto;fill:currentColor" ');
    cache.set(icon, svg);
  }
  return svg;
}

/** Label and icon for each link kind, matching the original page's buttons. */
export function projectLinkStyle(kind: LinkKind, href: string): { label: string; icon: FaIcon } {
  switch (kind) {
    case 'arxiv':
      return { label: 'ArXiv', icon: 'solid/file-pdf' };
    case 'paper':
    case 'pdf':
      return { label: 'Paper', icon: 'solid/file-pdf' };
    case 'code':
      return { label: 'Code', icon: /github\.com/.test(href) ? 'brands/github' : 'solid/code' };
    case 'video':
      return { label: 'Video', icon: /youtu\.?be/.test(href) ? 'brands/youtube' : 'solid/video' };
    case 'bibtex':
      return { label: 'BibTeX', icon: 'solid/quote-right' };
    case 'doi':
      return { label: 'DOI', icon: 'solid/link' };
    case 'slides':
      return { label: 'Slides', icon: 'solid/file-powerpoint' };
    case 'poster':
      return { label: 'Poster', icon: 'solid/image' };
    case 'patent':
      return { label: 'Patent', icon: 'solid/file-alt' };
    case 'project':
    case 'website':
      return { label: 'Website', icon: 'solid/globe' };
  }
}
