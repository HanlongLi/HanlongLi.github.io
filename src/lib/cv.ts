import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { site } from '../site.config';

/** Whether the public CV exists in `public/`. The CV buttons always link to it. */
export const hasPublicCv: boolean = existsSync(join(process.cwd(), 'public', site.cv.path));

if (!hasPublicCv) {
  console.warn(`\n[cv] public/${site.cv.path} is missing: the CV buttons will lead to a 404 until it is added.\n`);
}
