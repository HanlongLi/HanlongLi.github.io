import type { LinkKind, ResourceLink } from '../data/types';
import type { IconName } from './icons';

const meta: Record<LinkKind, { label: string; icon: IconName }> = {
  paper: { label: 'Paper', icon: 'file' },
  arxiv: { label: 'arXiv', icon: 'file' },
  pdf: { label: 'PDF', icon: 'file' },
  doi: { label: 'DOI', icon: 'link' },
  code: { label: 'Code', icon: 'code' },
  project: { label: 'Project page', icon: 'globe' },
  video: { label: 'Video', icon: 'play' },
  slides: { label: 'Slides', icon: 'file' },
  poster: { label: 'Poster', icon: 'file' },
  website: { label: 'Website', icon: 'globe' },
  patent: { label: 'Patent', icon: 'file' },
  bibtex: { label: 'BibTeX', icon: 'quote' },
};

export function describeLink(link: ResourceLink): { label: string; icon: IconName } {
  const m = meta[link.kind];
  return { label: link.label ?? m.label, icon: m.icon };
}
