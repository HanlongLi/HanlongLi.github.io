import type { MiscEntry } from './types';

/**
 * The "Outside the lab" page (/misc).
 *
 * The page, its nav link and its sitemap entry only appear once `entries`
 * contains at least one item, so it is safe to leave this empty.
 *
 * Example entry:
 *
 *   {
 *     title: 'Bouldering',
 *     period: 'Since 2022',
 *     text: 'Two or three evenings a week. Reading a problem from the ground and then finding out what my body actually does on the wall feels a lot like sim-to-real.',
 *     image: { file: 'bouldering.jpg', alt: 'Me on an indoor bouldering wall' },
 *     links: [{ kind: 'website', label: 'My gym', href: 'https://…' }],
 *   },
 */
export const misc = {
  title: 'Outside the lab',
  lead: '',
  entries: [
    {
      title: 'Adventures',
      text: 'I love adventures, and snowboarding is one of my favorites.',
      images: [
        { file: 'snowboarding-jump.jpg', alt: 'Me in mid-air on a snowboard, with snow-covered pine trees behind' },
        { file: 'snowboarding-ridge.jpg', alt: 'Me hiking along a snowy ridge with my snowboard, forested mountains in the distance' },
      ],
    },
  ] as MiscEntry[],
};

export const showMisc = misc.entries.length > 0;
