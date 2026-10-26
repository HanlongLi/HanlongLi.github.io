/**
 * Global site settings: identity, contact links and SEO defaults.
 *
 * Leave a link as an empty string if it does not exist yet. Empty links are
 * hidden on the public site and listed as content gaps in `npm run dev`.
 */
export const site = {
  author: {
    name: 'Hanlong Li',
    /** Shown under the name in the hero. Set to '' to hide. */
    alias: 'Miles',
    /** Spellings of my name in author lists; these get highlighted. */
    citationNames: ['Hanlong Li', 'H. Li'],
    location: 'Tokyo, Japan',
  },

  title: 'Hanlong Li — Robot Learning & Manipulation',
  description:
    'Hanlong Li is a Master’s student at the Institute of Science Tokyo and a Research Engineer Intern at AIRoA, working on robot manipulation learning, reinforcement and imitation learning, and vision-language-action models.',
  /** Path inside `public/` used as the default Open Graph / social card. */
  ogImage: 'og-image.png',
  locale: 'en_US',

  contact: {
    email: 'li.hanlong@outlook.com',
    github: 'https://github.com/HanlongLi',
    scholar: 'https://scholar.google.com/citations?user=7nkVEJsAAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/hanlongli0614/',
    /** Optional. */
    orcid: '',
    /** Optional. */
    x: '',
  },

  cv: {
    /**
     * Path of the PUBLIC CV inside `public/`. The CV buttons always link here;
     * the build prints a warning while the file is missing.
     *
     * Do not put the internal draft CV here – export a version without
     * unapproved AIRoA metrics first.
     */
    path: 'cv/Hanlong_Li_CV.pdf',
    /** Shown next to the CV link, e.g. "Updated Oct 2026". Optional. */
    updated: 'Oct 2026',
  },

  /** Short line in the hero; set to '' once applications are over. */
  applicationNote: 'I am applying to PhD programs in robotics and machine learning for Fall 2027.',
} as const;

export type SiteConfig = typeof site;
