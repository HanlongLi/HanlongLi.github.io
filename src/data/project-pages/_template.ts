/**
 * PROJECT PAGE TEMPLATE. Copy this file to `<slug>.ts` in this folder and edit it.
 *
 * Pages render in the style of the original Talking Robot page (Nerfies layout
 * on plain Bulma), independent of the personal site's design.
 *
 * Files starting with "_" are never published, so this one stays a reference.
 * `npm run check` type-checks it, which keeps the template in sync with the types.
 *
 * Where things go:
 *   Images  → src/assets/projects/<slug>/   (referenced by file name; optimised automatically)
 *   Videos  → public/projects/<slug>/       (referenced as 'projects/<slug>/demo.mp4')
 *   Audio   → public/projects/<slug>/audio/
 *
 * Every section is optional and they render in the order listed. Delete what you
 * don't need.
 */
import type { ProjectPage } from '../types';

export default {
  slug: 'my-project', // → /projects/my-project/
  projectId: 'my-project', // id in research.ts: adds a "Project page" button there
  publicationId: 'my-project', // id in publications.ts: adds a "Project page" link there
  title: 'Exact Paper Title: As It Appears on arXiv',
  description: 'One or two sentences for search engines and link previews.',
  // venue: 'CoRL 2027',            // optional line under the title
  // tldr: 'One-line teaser.',      // optional subtitle under the buttons
  // homeLink: false,               // hide the "Back to homepage" footer link

  authors: [
    { name: 'Hanlong Li', affiliations: [1], equal: true },
    { name: 'Co Author', affiliations: [1, 2], equal: true },
    { name: 'Advisor Name', affiliations: [2], url: 'https://…' },
  ],
  // Markers default to 1, 2, …; the Talking Robot page uses '*' and '†'.
  affiliations: [
    { name: 'Institute of Science Tokyo', marker: '*', emails: ['you@m.isct.ac.jp'] },
    { name: 'Another University', marker: '†' },
  ],
  notes: ['‡ Equal contribution'],

  links: [
    { kind: 'arxiv', href: 'https://arxiv.org/abs/…' },
    { kind: 'pdf', href: 'https://…' },
    { kind: 'code', href: 'https://github.com/…' },
    { kind: 'video', href: 'https://youtu.be/…' },
    { kind: 'bibtex', href: '#BibTeX' }, // in-page anchors work too
  ],

  sections: [
    { kind: 'text', title: 'Abstract', paragraphs: ['Paste the abstract verbatim.'] },
    {
      kind: 'stats',
      title: 'At a glance',
      items: [
        { value: '85%', label: 'success rate on …' },
        { value: '< 13 ms', label: 'inference on a CPU' },
      ],
      note: 'Optional source note, e.g. "All numbers from the paper."',
    },
    {
      kind: 'video',
      id: 'video',
      title: 'Video',
      src: 'projects/my-project/demo.mp4', // or: youtube: 'dQw4w9WgXcQ'
      poster: 'projects/my-project/poster.jpg',
      caption: 'What the viewer is seeing.',
    },
    { kind: 'figure', title: 'Method', file: 'overview.png', alt: 'Describe the figure', caption: 'Caption.' },
    {
      kind: 'gallery',
      title: 'Results',
      intro: 'Optional sentence above the grid.',
      items: [
        { file: 'result-1.jpg', alt: '…', caption: 'Task A' },
        { file: 'result-2.jpg', alt: '…', caption: 'Task B' },
      ],
    },
    {
      kind: 'audio',
      title: 'Audio examples',
      items: [{ label: 'Example 1', transcript: 'optional transcript', src: 'projects/my-project/audio/ex1.wav' }],
    },
  ],

  bibtex: `@inproceedings{li2027myproject,
  author    = {Hanlong Li and Co Author and Advisor Name},
  title     = {Exact Paper Title},
  booktitle = {Conference on Robot Learning (CoRL)},
  year      = {2027},
}`,
} satisfies ProjectPage;
