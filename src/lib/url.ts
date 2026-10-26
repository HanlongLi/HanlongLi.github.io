/**
 * Prefix a site-internal path with the configured base path, so links work
 * both at a domain root (`/`) and under a GitHub Pages project path
 * (`/personalWeb/`). External URLs and in-page anchors are returned as-is.
 */
export function withBase(path: string): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  return `${base}/${clean}`;
}

export const isExternal = (href: string): boolean => /^https?:\/\//i.test(href);
