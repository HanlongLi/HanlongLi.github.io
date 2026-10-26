import type { ProjectPage } from './types';

/*
 * Every `src/data/project-pages/*.ts` file (except those starting with "_")
 * becomes a page at /projects/<slug>/.
 *
 * `<slug>.draft.ts` files are drafts: they render in `npm run dev` only, are
 * never part of a production build, and are gitignored so their content never
 * reaches the public repository. Rename to `<slug>.ts` to publish.
 */
const modules = import.meta.glob<{ default: ProjectPage }>(
  ['./project-pages/*.ts', '!./project-pages/_*.ts'],
  { eager: true },
);

export const isDraftPath = (path: string): boolean => path.endsWith('.draft.ts');

export const projectPages: ProjectPage[] = Object.entries(modules)
  .filter(([path]) => import.meta.env.DEV || !isDraftPath(path))
  .map(([, m]) => m.default)
  .sort((a, b) => a.slug.localeCompare(b.slug));

const slugs = new Set<string>();
for (const page of projectPages) {
  if (slugs.has(page.slug)) throw new Error(`Duplicate project page slug "${page.slug}"`);
  slugs.add(page.slug);
}

/** Slugs of draft pages (only ever non-empty in dev). */
export const draftSlugs = new Set(
  Object.entries(modules)
    .filter(([path]) => import.meta.env.DEV && isDraftPath(path))
    .map(([, m]) => m.default.slug),
);

/** Site-relative path of a project page (pass through `withBase`). */
export const projectPagePath = (page: ProjectPage): string => `projects/${page.slug}/`;

export const projectPageForProject = (projectId: string) => projectPages.find((p) => p.projectId === projectId);
export const projectPageForPublication = (publicationId: string) =>
  projectPages.find((p) => p.publicationId === publicationId);
