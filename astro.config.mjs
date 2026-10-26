// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { showMisc } from './src/data/misc.ts';

/**
 * Deployment target.
 *
 * SITE_URL  – the origin the site is served from, e.g.
 *             https://hanlongli.github.io        (user/organisation Pages site)
 *             https://www.your-domain.com        (custom domain)
 * BASE_PATH – the sub-path the site lives under, e.g.
 *             /                                   (root-domain deployment)
 *             /personalWeb                        (GitHub Pages *project* repository)
 *
 * The GitHub Actions workflow fills both in automatically from the Pages
 * configuration, so you normally only need to touch the defaults below for
 * local `npm run build && npm run preview` checks.
 */
const SITE_URL = process.env.SITE_URL || 'https://hanlongli.github.io';
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // The misc page is left out until it has content (see src/data/misc.ts).
      filter: (page) => !page.includes('/404') && (showMisc || !/\/misc\/?$/.test(page)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
