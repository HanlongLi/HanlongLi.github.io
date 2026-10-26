# Hanlong Li — Academic Website

Personal research website for robot learning, manipulation and embodied AI.
Static site built with **Astro 7**, **TypeScript** and **Tailwind CSS 4**, deployable
to **GitHub Pages**. No backend, no client framework, roughly one small inline script.

- One page, ordered for a 30–60 second scan: hero → research trajectory →
  research → publications → experience → education → about → contact.
- All content lives in typed data files under `src/data/`, so editing never requires touching components.
- `npm run dev` shows every known content gap in place (dashed TODO notes plus a
  checklist panel at the bottom right). Production builds never show them.
- `npm run build` runs a **disclosure guard** that fails the build if unapproved
  AIRoA numbers or internal documents end up in the output.

---

## 1. Local development

Requirements: **Node ≥ 22.23.4** (pinned in `.nvmrc`).

```bash
nvm use            # or: nvm install  (uses .nvmrc)
npm install
npm run dev        # http://localhost:4321, with content-gap markers
```

| Command           | What it does                                                       |
| ----------------- | ------------------------------------------------------------------ |
| `npm run dev`     | Dev server with hot reload and content-gap markers                 |
| `npm run check`   | Type-checks all `.astro` and `.ts` files                           |
| `npm run build`   | Production build to `dist/`, then the disclosure guard             |
| `npm run preview` | Serves `dist/` locally (stop with `npx astro preview stop`)        |
| `npm run assets`  | Regenerates favicons and the social card (`public/og-image.png`)   |

---

## 2. Project structure

```
src/
  site.config.ts        Name, contact links, CV path, SEO defaults
  data/
    types.ts            Content model (documented field by field)
    profile.ts          Hero intro, About narrative, interests, trajectory, skills
    research.ts         Research projects + how they are grouped
    publications.ts     Papers (in display order) and patents
    experience.ts       Research/industry experience, education, teaching, honors
    misc.ts             “Outside the lab” page entries
  assets/
    research/           Project figures (optimised automatically)
    portrait/           Portrait photo
  components/           Presentational components (no content inside)
  layouts/BaseLayout    <head>: SEO, Open Graph, JSON-LD, favicons, font preload
  lib/                  Helpers: base-path URLs, image lookup, gap collection
  pages/                index.astro, misc.astro, 404.astro, robots.txt.ts
public/                 Copied verbatim: favicons, og-image.png, cv/
scripts/
  check-disclosure.mjs  Post-build guard against unapproved internal material
  generate-assets.mjs   Favicon / social-card generator
.github/workflows/deploy.yml   GitHub Pages deployment
```

---

## 3. Editing content

### Add or update a publication — `src/data/publications.ts`

```ts
{
  id: 'my-paper',                       // unique; also the anchor #pub-my-paper
  title: 'Exact Official Title',
  authors: ['A. Author', 'Hanlong Li', 'B. Author'],   // official order
  equalContribution: ['A. Author', 'Hanlong Li'],      // optional → * marks + footnote
  venue: 'Conference on Robot Learning (CoRL)',
  venueShort: 'CoRL 2027',              // left-column tag
  year: 2027,
  type: 'conference',                   // conference | journal | workshop | preprint
  status: 'accepted',                   // published | accepted | to-appear | preprint | under-review
  links: [
    { kind: 'arxiv', href: 'https://arxiv.org/abs/…' },
    { kind: 'code', href: 'https://github.com/…' },
    { kind: 'project', href: 'https://…' },
  ],
}
```

Entries render in array order. Names listed in `site.author.citationNames`
(`Hanlong Li`, `H. Li`) are highlighted automatically.

Link kinds: `paper`, `arxiv`, `pdf`, `doi`, `code`, `project`, `video`, `slides`,
`poster`, `website`, `patent`. Pass `label` to override the default text.

### Add or update a research project — `src/data/research.ts`

Each project leads with a plain-language `headline` (what the work does, readable
at a glance; the official `title` is shown underneath), an optional `keyResult`
shown right under it, a `summary` (problem and approach), a separate `contributions`
list (what *you* did), optional `highlights` (further public, citable results only),
`publicationIds` (links the entry to its citation), `links`, and an optional
`figure` and `video`. To show it on the page, add its `id` to one of the
`researchGroups`.

### Add a figure

1. Put the image in `src/assets/research/` (PNG/JPG/WebP/SVG, ideally ≥ 1600 px wide).
2. In the project entry, set:
   ```ts
   figure: {
     file: 'ambit-overview.png',
     alt: 'Describe what the figure shows',
     caption: 'Optional caption.',
   },
   ```

Astro generates responsive AVIF/WebP versions at build time. Until a figure
exists, the entry shows a neutral “key components” tile. This tile contains
only words, so it can't be mistaken for an experimental result.

### Research cover schematics

Five research entries use schematic covers generated from one source,
`ccfa-workfiles/figures/research-covers/source/covers.mjs`. They're drawn as SVG
and rendered to `src/assets/research/<id>-cover.png`. Each cover shows its
project's real mechanism and contains no data. The Talking Robot entry uses the
paper's own system figure instead. To change a label or add a project,
edit that script and run:

```bash
node ccfa-workfiles/figures/research-covers/source/covers.mjs
```

A real figure (e.g. from a paper) can replace any cover: drop the file in
`src/assets/research/` and point the project's `figure.file` at it.

### Add a video

- **External** (YouTube, project page): `video: { src: 'https://…', label: 'Hardware demo' }`
  renders as a link button.
- **Self-hosted**: put the file in `public/media/` and set
  `video: { src: 'media/ambit-demo.mp4', poster: 'media/ambit-demo.jpg' }`.
  It renders as an inline player that loads lazily. Keep files small (< 10 MB, H.264 MP4).

### Project pages (`/projects/<slug>/`) — `src/data/project-pages/`

Every research project can have its own paper page in the style of the original
[Talking Robot page](https://thetalkingrobot.netlify.app/): the Nerfies layout on
plain Bulma 0.9.3, with Font Awesome icons inlined as SVG. These pages are
deliberately independent of the personal site's design. They share none of its
styles, header or fonts.

1. Copy `src/data/project-pages/_template.ts` to `src/data/project-pages/<slug>.ts`.
   Files starting with `_` are never published. The template shows every option.
2. Fill in the title, authors, affiliations (markers such as `*` and `†`, plus
   optional email lines), the link buttons and the `sections`:
   - `text`: Abstract and other prose
   - `video`: an MP4 or a YouTube id
   - `audio`: a grid of audio examples
   - `figure` and `gallery`: images
   - `stats`: a row of key numbers

   Sections render in the order you list them.
3. Put the media in place:
   - Images: `src/assets/projects/<slug>/`, referenced by file name and optimised automatically.
   - Video and audio: `public/projects/<slug>/`, referenced as `'projects/<slug>/demo.mp4'`.
4. Set `projectId` and `publicationId` to the matching ids in `research.ts` and
   `publications.ts`. A “Project page” link then appears on the homepage automatically.

The template file is `src/pages/projects/[slug].astro`, and its layout is
`src/layouts/ProjectLayout.astro`. Besides the sections above, a page can have a
`teaser` figure under the header, and `text` sections can contain `subsections`
(each with an h3, paragraphs, a `figure`, a `table` and a `list`).

Existing pages:
- `talking-robot.ts` reproduces the original page.
- `ambit.ts` has the full write-up with video, figures and tables.
- `bio-agentic.ts` covers the Biomimetics paper, with figures reused under CC BY 4.0.
- `lcc.ts` covers the LCC paper (arXiv:2610.19438).

**Drafts.** Name a file `<slug>.draft.ts` for work that is not public yet, e.g. a
paper under double-blind review. Drafts render in `npm run dev` only, with a yellow
banner. They are never built for production, and they are gitignored so their content
never reaches the repository. Rename the file to `<slug>.ts` to publish.


### “Outside the lab” page (`/misc`) — `src/data/misc.ts`

Add entries to `misc.entries`:

```ts
{
  title: 'Running',
  period: 'Since 2020',                        // optional, shown in the left column
  text: 'A few sentences in your own voice.',  // *text* = italic
  image: { file: 'running.jpg', alt: '…', caption: '…' },   // optional, in src/assets/misc/
  links: [{ kind: 'website', label: 'Strava', href: 'https://…' }],  // optional
}
```

While `entries` is empty, the page is hidden: there is no nav or footer link, it
is left out of the sitemap, and it is marked `noindex`. Adding the first entry
turns all of that on automatically.

### Add your portrait

Put a photo (≥ 800 px, roughly 4:5) in `src/assets/portrait/` and set
`profile.portrait.file` in `src/data/profile.ts`. Without one, desktop shows an
“HL” monogram tile and mobile hides the slot.

### Add the public CV

Export a **public** CV (without the “Internal working draft” footer) to
`public/cv/Hanlong_Li_CV.pdf`. The CV buttons always link there; until the file
exists the build prints a warning, because the link would 404. You can set
`site.cv.updated` (e.g. `'Oct 2026'`) to show a date on the hero button.

> Never put the internal draft CV in `public/`. The disclosure guard fails the
> build on any deployed file whose name contains “internal”, “draft” or
> “private”, and on `.doc/.docx` files.

### Add profile links

Fill in `contact.scholar`, `contact.linkedin` (and optionally `orcid`, `x`) in
`src/site.config.ts`. Empty links are hidden everywhere.

### Inline emphasis

In `profile.ts` copy, `*text*` becomes italic. Nothing else is interpreted, and
all text is HTML-escaped.

---

## 4. AIRoA confidentiality

- AIRoA work was cleared for publication on 2026-10-26 (`disclosure.status: 'approved'`).
  Future embargoed work can use `status: 'pending'`, which shows a short note instead of results.
- `scripts/check-disclosure.mjs` runs after every build (locally and in CI) and
  fails if the preliminary RL-vs-PD figures, internal evaluation counts or
  internal-draft wording appear in the built pages.
- When AIRoA approves something for publication, add it to the data file, set
  `disclosure.status` to `'approved'`, and remove the matching pattern from the
  guard **in the same commit**.
- `.gitignore` excludes `*Internal_Draft*` files and a `private/` folder. Keep
  internal documents (including the current CV draft) there.

---

## 5. Deployment (GitHub Pages)

The workflow in `.github/workflows/deploy.yml` builds, type-checks, runs the
disclosure guard and deploys on every push to `main`. **Nothing is published
until you set it up:**

1. Create a GitHub repository and push this project:
   - Repo named **`HanlongLi.github.io`** → site at `https://hanlongli.github.io/`
   - Any other name, e.g. **`personalWeb`** → site at `https://hanlongli.github.io/personalWeb/`
2. In the repository, open **Settings → Pages → Build and deployment** and set
   **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The workflow reads the site origin and base path from the Pages configuration,
so both cases (and a custom domain) work without code changes.

**Custom domain:** add it under Settings → Pages, then create `public/CNAME`
containing the domain (e.g. `hanlongli.com`) so it survives redeploys.

**Local build that mirrors a deployment:**

```bash
SITE_URL=https://hanlongli.github.io BASE_PATH=/personalWeb npm run build
npm run preview    # → http://localhost:4321/personalWeb/
```

`SITE_URL` and `BASE_PATH` default to `https://hanlongli.github.io` and `/`
(see `astro.config.mjs` and `.env.example`). `robots.txt` only takes effect at
a domain root, so on a project site it is harmless but ignored by crawlers.

---

## 6. Design notes

- **Palette:** warm paper `#faf8f3`, charcoal ink `#1d1d1b`, one muted blue
  accent `#2d5b7a`. All text colours meet WCAG AA on both background tones.
  Tokens are defined in `src/styles/global.css` (`@theme`).
- **Type:** Source Serif 4 for headings and the About narrative, Inter for UI and
  body, and the system monospace font for metadata. Fonts are self-hosted, with
  the Latin subsets preloaded.
- **Layout:** a sticky section-label column on desktop. Research runs full width
  because it is the most important section. Figures stay in view while you read
  the text beside them.
- **Accessibility:** semantic landmarks, skip link, a strict heading hierarchy,
  visible focus rings, keyboard-operable mobile menu (Esc closes it),
  `aria-current` scroll-spy, and support for `prefers-reduced-motion`.
- **Performance:** about 14 KB of gzipped HTML, about 8 KB of gzipped CSS, no
  JavaScript bundle, and optimised images.

Open content gaps are tracked in a local `CONTENT_GAPS.md` (gitignored) and shown in place by `npm run dev`.
