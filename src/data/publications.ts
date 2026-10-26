import type { Patent, Publication } from './types';

/**
 * Publications, in the order they should appear on the page.
 *
 * Source of truth: academic CV (October 2026). Titles, author order and
 * venues are copied verbatim; do not abbreviate or "clean up" author names
 * beyond what appears on the paper itself.
 *
 * To add a paper: copy an entry, give it a unique `id`, and place it where it
 * belongs in the list. Mark equal contribution with `equalContribution`.
 */
export const publications: Publication[] = [
  {
    id: 'lcc',
    title: 'Paraphrase Consensus Is Not Self-Consistency: Instruction Reliance and Robustness in VLA Policies',
    authors: ['Hanlong Li', 'S. Tan', 'T. Ashizawa', 'B. Yen', 'K. Nakadai'],
    venue: 'arXiv preprint',
    venueShort: 'arXiv 2026',
    year: 2026,
    type: 'preprint',
    status: 'under-review',
    submittedTo: 'ACL Rolling Review (NAACL 2027 cycle)',
    links: [{ kind: 'arxiv', href: 'https://arxiv.org/abs/2610.19438' }],
    gaps: ['Not yet on the CV: add it there too'],
  },
  {
    id: 'yubi-stag',
    title: 'YUBI-STAG: Contact and Semantic-Rich Alignment for VLAs via Automated Video-Language Grounding',
    authors: ['M. Tateno', 'T. Ohkawa', 'Y.-H. Wu', 'Hanlong Li', 'T. Matsushima', 'Y. Sato', 'K. Ota'],
    venue: 'Conference on Robot Learning (CoRL), The UMI Arena Workshop',
    venueShort: 'CoRL-W 2026',
    year: 2026,
    type: 'workshop',
    status: 'accepted',
    links: [
      { kind: 'arxiv', href: 'https://arxiv.org/abs/2610.09718' },
      { kind: 'project', href: 'https://yubi-stag.airoa.io/' },
      { kind: 'website', label: 'Workshop', href: 'https://umi-arena.airoa.io/' },
    ],
    gaps: ['Not yet on the CV: add it there too'],
  },
  {
    id: 'ambit',
    title: 'AMBIT: Anticipatory Multimodal Body Recruitment for Bimanual Tracking on a Humanoid',
    authors: ['Hanlong Li', 'S. Tan', 'T. Ashizawa', 'B. Yen', 'K. Nakadai'],
    venue: 'arXiv preprint',
    venueShort: 'arXiv 2026',
    year: 2026,
    type: 'preprint',
    status: 'under-review',
    submittedTo: 'ICRA 2027',
    links: [{ kind: 'arxiv', href: 'https://arxiv.org/abs/2609.33484' }],
    gaps: ['Code repository (if it will be released)'],
  },
  {
    id: 'talking-robot',
    title: 'The Talking Robot: Distortion-Robust Acoustic Models for Robot-Robot Communication',
    authors: ['Hanlong Li', 'K. Kamalahasan', 'J. Li', 'K. Nakadai', 'S. Kousik'],
    venue: 'IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)',
    venueShort: 'IROS 2026',
    year: 2026,
    type: 'conference',
    status: 'published',
    links: [
      { kind: 'arxiv', href: 'https://arxiv.org/abs/2603.07072' },
      { kind: 'code', href: 'https://github.com/HanlongLi/Talking-Robot' },
    ],
    gaps: ['IEEE Xplore / official proceedings link (once available)'],
  },
  {
    id: 'bio-agentic-imece',
    title:
      'Toward Bio-Agentic Visual Communication and Control: Implicit Semantic Manifolds and Invariant State Estimation',
    authors: ['B. Starbuck', 'Hanlong Li', 'B. Bras'],
    equalContribution: ['B. Starbuck', 'Hanlong Li'],
    venue: 'ASME International Mechanical Engineering Congress and Exposition (IMECE)',
    venueShort: 'IMECE 2026',
    year: 2026,
    type: 'conference',
    status: 'accepted',
    links: [
      {
        kind: 'website',
        label: 'Conference page',
        href: 'https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24750/application/191193',
      },
    ],
    gaps: ['Paper PDF or DOI once the IMECE proceedings are published'],
  },
  {
    id: 'spectral-ot',
    title: 'Spectral Optimal Transport for Dynamics-Aware Sign Language Generation',
    authors: ['N. Khan', 'B. Wu', 'R. Shi', 'Hanlong Li', 'B. Yen', 'C. T. Ishi', 'K. Nakadai'],
    venue: 'European Conference on Computer Vision (ECCV), MoCha Workshop',
    venueShort: 'ECCV-W 2026',
    year: 2026,
    type: 'workshop',
    status: 'published',
    links: [{ kind: 'website', label: 'Workshop', href: 'https://mocha.care-pd.ca/' }],
    gaps: ['Paper PDF / arXiv / OpenReview link (the current link is the workshop website)'],
  },
  {
    id: 'bio-agentic-biomimetics',
    title:
      'A Concept for Bio-Agentic Visual Communication: Bridging Swarm Intelligence with Biological Analogues',
    authors: ['B. Starbuck', 'Hanlong Li', 'B. Cochran', 'M. Weissburg', 'B. Bras'],
    venue: 'Biomimetics',
    venueShort: 'Biomimetics 2025',
    details: '10(9):605',
    year: 2025,
    type: 'journal',
    status: 'published',
    note: 'Co-corresponding author.',
    links: [{ kind: 'doi', href: 'https://doi.org/10.3390/biomimetics10090605' }],
  },
];

export const patents: Patent[] = [
  {
    id: 'bio-visual-patent',
    title: 'Biologically Inspired Active Visual Communication System and Method',
    inventors: ['B. Bras', 'M. Weissburg', 'B. Cochran', 'Hanlong Li', 'B. Starbuck'],
    publication: 'U.S. Patent Application Publication US 2026/0127397 A1',
    year: 2026,
    links: [{ kind: 'patent', href: 'https://patents.justia.com/patent/20260127397' }],
  },
];

/**
 * Note shown above the list while some work is not public yet (e.g. papers
 * under double-blind review that are not on arXiv). Set to '' to hide it.
 */
export const publicationsNote =
  'A few manuscripts currently under review will be added here once they are public.';

export const publicationTypeLabel: Record<Publication['type'], string> = {
  conference: 'Conference',
  journal: 'Journal',
  workshop: 'Workshop',
  preprint: 'Preprint',
};

export const publicationStatusLabel: Record<Publication['status'], string | null> = {
  published: null,
  accepted: 'Accepted',
  'to-appear': 'To appear',
  preprint: null,
  'under-review': 'Under review',
};
