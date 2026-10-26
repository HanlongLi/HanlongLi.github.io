import type { ImageMetadata } from 'astro';

/*
 * Images in these folders are discovered at build time and optimised by
 * Astro. Data files reference them by file name only, so adding a figure is
 * "drop the file in, write its name in the data file".
 */
const researchImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/research/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true },
);

const portraitImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/portrait/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const miscImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/misc/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const projectImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/projects/*/*.{png,jpg,jpeg,webp,avif,gif,svg}',
  { eager: true },
);

const stem = (path: string) => path.replace(/^.*\//, '').replace(/\.[^.]+$/, '').toLowerCase();
const warned = new Set<string>();

/**
 * Finds `file` in an image folder. If the exact name is missing, any image
 * with the same base name is used, so `hiking.jpg` in the data file also
 * matches `hiking.png` or `hiking.webp` on disk.
 */
function lookup(
  pool: Record<string, { default: ImageMetadata }>,
  folder: string,
  file: string | undefined,
): ImageMetadata | undefined {
  if (!file) return undefined;
  const exact = pool[`/src/assets/${folder}/${file}`]?.default;
  if (exact) return exact;
  const match = Object.entries(pool).find(
    ([path]) => path.startsWith(`/src/assets/${folder}/`) && stem(path) === stem(file),
  );
  if (match) return match[1].default;
  const key = `${folder}/${file}`;
  if (!warned.has(key)) {
    warned.add(key);
    console.warn(`[media] src/assets/${key} not found; rendering a placeholder.`);
  }
  return undefined;
}

export const getResearchImage = (file?: string) => lookup(researchImages, 'research', file);
export const getPortraitImage = (file?: string) => lookup(portraitImages, 'portrait', file);
export const getMiscImage = (file?: string) => lookup(miscImages, 'misc', file);
export const getProjectImage = (slug: string, file?: string) => lookup(projectImages, `projects/${slug}`, file);
