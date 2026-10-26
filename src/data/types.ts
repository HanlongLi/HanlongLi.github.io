/**
 * Content model for the site.
 *
 * Every section of the page is rendered from the typed data files in this
 * folder, so routine updates (a new paper, a new figure, a new link) never
 * require touching a component. `npm run check` type-checks all of it.
 */

/** Kinds of outbound links. Each kind gets a consistent label and icon. */
export type LinkKind =
  | 'paper'
  | 'arxiv'
  | 'pdf'
  | 'doi'
  | 'code'
  | 'project'
  | 'video'
  | 'slides'
  | 'poster'
  | 'website'
  | 'patent'
  | 'bibtex';

export interface ResourceLink {
  kind: LinkKind;
  href: string;
  /** Overrides the default label for this kind (e.g. "Workshop"). */
  label?: string;
}

/**
 * Something that is known to be missing. Gaps are never shown on the
 * production site; in `npm run dev` they appear as small dashed notes so you
 * can see at a glance what still needs to be filled in.
 */
export type ContentGap = string;

/**
 * Public-disclosure state for work done inside a company or under embargo.
 * - `pending`  – only a high-level description is published; no metrics,
 *                internal names or unpublished results.
 * - `approved` – the text has been cleared for public release.
 */
export interface Disclosure {
  status: 'pending' | 'approved';
  note: string;
}

/* ------------------------------------------------------------------ */
/* Publications                                                        */
/* ------------------------------------------------------------------ */

export type PublicationType = 'conference' | 'journal' | 'workshop' | 'preprint';

export type PublicationStatus =
  | 'published'
  | 'accepted'
  | 'to-appear'
  | 'preprint'
  | 'under-review';

export interface Publication {
  /** Stable id, also used as the HTML anchor (`#pub-<id>`). */
  id: string;
  /** Exact official title. */
  title: string;
  /**
   * Authors in official order, exactly as they appear on the paper.
   * Any name listed in `site.author.citationNames` is highlighted.
   */
  authors: string[];
  /**
   * Authors with equal contribution, spelled exactly as in `authors`.
   * They get a `*` marker and the list gets an explanatory footnote.
   */
  equalContribution?: string[];
  /** Full venue name. */
  venue: string;
  /** Short venue tag shown in the left column, e.g. "IROS 2026". */
  venueShort: string;
  /** Volume / issue / pages / article number, if any. */
  details?: string;
  year: number;
  type: PublicationType;
  status: PublicationStatus;
  /** Venue a preprint is under review at, e.g. "ICRA 2027". Shown as "Under review at …". */
  submittedTo?: string;
  links: ResourceLink[];
  /** Short note displayed under the citation (e.g. "Oral presentation"). */
  note?: string;
  gaps?: ContentGap[];
}

export interface Patent {
  id: string;
  title: string;
  inventors: string[];
  /** e.g. "U.S. Patent Application Publication US 2026/0127397 A1" */
  publication: string;
  year: number;
  links: ResourceLink[];
  gaps?: ContentGap[];
}

/* ------------------------------------------------------------------ */
/* Research projects                                                   */
/* ------------------------------------------------------------------ */

export interface ProjectFigure {
  /**
   * File name inside `src/assets/research/` (e.g. `ambit-overview.png`).
   * Images there are optimised automatically at build time. If the file is
   * missing, a neutral placeholder is rendered instead.
   */
  file: string;
  /** Describe what the figure actually shows, for screen readers. */
  alt: string;
  caption?: string;
}

export interface ProjectVideo {
  /**
   * Either an external URL (YouTube, project page…) which is rendered as a
   * link, or a path inside `public/` (e.g. `media/ambit-demo.mp4`) which is
   * rendered as an inline, lazily-loaded video player.
   */
  src: string;
  /** Optional poster image path inside `public/` for local videos. */
  poster?: string;
  label?: string;
}

export interface ResearchProject {
  /** Stable id, also used as the HTML anchor (`#research-<id>`). */
  id: string;
  /**
   * Plain-language headline: what the work does, readable at a glance.
   * Shown as the main heading; must not claim results that are not public.
   */
  headline: string;
  /** Official project or paper title where one exists (shown under the headline). */
  title: string;
  /** Short name used in the trajectory strip and compact contexts. */
  shortTitle: string;
  /** Research areas, most specific first. */
  areas: string[];
  /** Where the work was done, e.g. "AIRoA" or "Robot Danger Lab, Georgia Tech". */
  context: string;
  period: string;
  status: 'ongoing' | 'completed';
  /** The research problem and approach, 2–4 sentences. */
  summary: string;
  /** What *I* did. Kept separate from the summary on purpose. */
  contributions: string[];
  /**
   * The single most important public result, shown right under the headline.
   * Public, citable results only; never unpublished company numbers.
   */
  keyResult?: string;
  /** Further public results, listed under "Results". Same rules as `keyResult`. */
  highlights?: string[];
  /** Ids from `publications.ts` / `patents` describing this project. */
  publicationIds?: string[];
  figure?: ProjectFigure;
  /** Words shown in the figure placeholder until a real figure exists. */
  placeholderKeywords: string[];
  video?: ProjectVideo;
  links: ResourceLink[];
  disclosure?: Disclosure;
  gaps?: ContentGap[];
}

export interface ResearchGroup {
  id: string;
  /** Short label, e.g. "Current work". */
  title: string;
  subtitle: string;
  lead: string;
  projectIds: string[];
}

/* ------------------------------------------------------------------ */
/* Experience & education                                              */
/* ------------------------------------------------------------------ */

export interface Experience {
  id: string;
  organization: string;
  /** Lab or team inside the organization. */
  unit?: string;
  role: string;
  /** Omit when the CV does not state it. */
  location?: string;
  start: string;
  end: string;
  /** e.g. "Advisor: Prof. Kazuhiro Nakadai" */
  supervision?: string;
  points: string[];
  /** Links to projects on this page (`ResearchProject.id`). */
  projectIds?: string[];
  disclosure?: Disclosure;
  gaps?: ContentGap[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start?: string;
  end: string;
  advisor?: string;
  notes: string[];
}

export interface Honor {
  text: string;
  /** Optional date or period; omitted when not useful. */
  year?: string;
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export interface TrajectoryStage {
  period: string;
  theme: string;
  context: string;
  /** What this stage contributed to the overall direction. */
  takeaway: string;
  /** Anchor of the related research entry, if any. */
  projectId?: string;
  /** The final, forward-looking stage is drawn differently. */
  future?: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

/* ------------------------------------------------------------------ */
/* Misc page                                                           */
/* ------------------------------------------------------------------ */

export interface MiscEntry {
  /** Short heading, e.g. "Running" or "Film photography". */
  title: string;
  /** A few sentences in your own voice. `*text*` is italicised. */
  text: string;
  /** Optional, e.g. "Since 2019". */
  period?: string;
  /**
   * Optional photo: file name inside `src/assets/misc/`.
   * Use your own photos only.
   */
  image?: {
    file: string;
    alt: string;
    caption?: string;
  };
  /** Several photos shown side by side under the text (use instead of `image`). */
  images?: { file: string; alt: string }[];
  links?: ResourceLink[];
  gaps?: ContentGap[];
}

/* ------------------------------------------------------------------ */
/* Project pages (/projects/<slug>/)                                   */
/* ------------------------------------------------------------------ */

export interface ProjectAuthor {
  /** Full name as on the paper. Names in `site.author.citationNames` are highlighted. */
  name: string;
  /** 1-based indices into `ProjectPage.affiliations`; rendered with that affiliation's marker. */
  affiliations?: number[];
  /** Marks equal contribution with `‡` (explain it in `notes`). */
  equal?: boolean;
  /** Marks a corresponding author with `*` (explain it in `notes`). */
  corresponding?: boolean;
  /** Optional homepage. */
  url?: string;
}

/** A local file (path inside `public/`) or an absolute URL. */
export type MediaSrc = string;

/**
 * Building blocks of a project page. Use any number, in any order.
 * Images live in `src/assets/projects/<slug>/` and are referenced by file name.
 */
export interface ProjectImage {
  /** File name inside `src/assets/projects/<slug>/`. */
  file: string;
  alt: string;
  caption?: string;
}

export interface ProjectTable {
  columns: string[];
  rows: string[][];
  caption?: string;
}

/** A sub-headed block inside a `text` section (Nerfies-style h3). */
export interface ProjectSubsection {
  title: string;
  paragraphs?: string[];
  figure?: ProjectImage;
  table?: ProjectTable;
  list?: string[];
}

export type ProjectSection =
  | {
      kind: 'text';
      title: string;
      id?: string;
      paragraphs?: string[];
      /** Bullet list after the paragraphs (e.g. Limitations). */
      list?: string[];
      subsections?: ProjectSubsection[];
    }
  | { kind: 'stats'; title: string; id?: string; items: { value: string; label: string }[]; note?: string }
  | {
      kind: 'video';
      title: string;
      id?: string;
      /** MP4 in `public/` or an absolute URL. */
      src?: MediaSrc;
      /** Alternatively a YouTube video id (embedded via youtube-nocookie.com). */
      youtube?: string;
      poster?: MediaSrc;
      caption?: string;
    }
  | { kind: 'figure'; title: string; id?: string; file: string; alt: string; caption?: string }
  | {
      kind: 'gallery';
      title: string;
      id?: string;
      intro?: string;
      items: { file: string; alt: string; caption?: string }[];
    }
  | {
      kind: 'audio';
      title: string;
      id?: string;
      intro?: string;
      items: { label: string; transcript?: string; src: MediaSrc }[];
    };

export interface ProjectAffiliation {
  name: string;
  /** Superscript marker, e.g. '*' or '†'. Defaults to the 1-based position. */
  marker?: string;
  /** Optional contact line shown under the affiliation, as on the original page. */
  emails?: string[];
}

export interface ProjectPage {
  /** URL segment: the page is served at /projects/<slug>/. */
  slug: string;
  /** Links the page to its entry in `research.ts` (adds a "Project page" button there). */
  projectId?: string;
  /** Links the page to its entry in `publications.ts` (adds a "Project page" link there). */
  publicationId?: string;
  /** Exact paper title. */
  title: string;
  /** Venue line under the title, e.g. "IROS 2026". Optional; the original page has none. */
  venue?: string;
  /** Optional teaser figure under the header, as in the Nerfies template. */
  teaser?: ProjectImage;
  /** Optional subtitle under the teaser (Nerfies "teaser" line). */
  tldr?: string;
  /** Show a small link back to the homepage in the footer (default: true). */
  homeLink?: boolean;
  /** For search engines and link previews. */
  description: string;
  authors: ProjectAuthor[];
  affiliations?: ProjectAffiliation[];
  /** Small print under the authors, e.g. "* Equal contribution". */
  notes?: string[];
  links: ResourceLink[];
  sections: ProjectSection[];
  bibtex?: string;
  gaps?: ContentGap[];
}
