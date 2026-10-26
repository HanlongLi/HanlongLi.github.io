import type { ProjectPage } from '../types';

/*
 * Source: arXiv:2610.19438 (abstract verified against the arXiv listing) and
 * the paper source (author list as on arXiv).
 */
export default {
  slug: 'lcc',
  projectId: 'lcc',
  publicationId: 'lcc',
  title: 'Paraphrase Consensus Is Not Self-Consistency: Instruction Reliance and Robustness in VLA Policies',
  description:
    'Rewording the instruction costs base OpenVLA 38 points on LIBERO; paraphrase consensus does not recover it, and paraphrase post-training reduces the effect without changing instruction reliance.',
  authors: [
    { name: 'Hanlong Li' },
    { name: 'Sihan Tan' },
    { name: 'Takeshi Ashizawa' },
    { name: 'Benjamin Yen' },
    { name: 'Kazuhiro Nakadai' },
  ],
  affiliations: [{ name: 'Institute of Science Tokyo', marker: '' }],
  links: [
    { kind: 'paper', href: 'https://arxiv.org/pdf/2610.19438' },
    { kind: 'arxiv', href: 'https://arxiv.org/abs/2610.19438' },
  ],
  sections: [
    {
      kind: 'text',
      title: 'Abstract',
      paragraphs: [
        "Vision-language-action (VLA) policies fine-tuned on LIBERO are trained and evaluated on the same ten instruction strings, and rewording the instruction changes base OpenVLA's success by −38.0 points. Test-time prompt ensembling, which improves language models, does not recover this loss in any setting we ran. Paraphrase consensus (the medoid action over K paraphrases) costs base OpenVLA 16.8 points when the training instruction is a member. Without it, the medoid of the paraphrases scores −32.4 points relative to the training instruction, and confidence-based selection scores −28.0. The same medoid over samples of one paraphrase improves on greedy decoding but stays −27.6 points below the training instruction, consistent with aggregation reducing variance without removing the bias the paraphrases share. A wrong-instruction probe measures how much of a policy's success depends on the instruction. Across three policies and four suites, paraphrases cost a policy only where this share is high, and the stronger policies lose a much smaller fraction of it than base OpenVLA. LoRA post-training on paraphrased instructions reduces the one-paraphrase effect to +2.0 points, against −32.0 for a matched control, reproduces across two seeds and on OpenVLA-OFT, transfers to withheld phrasings, and leaves the policy's reliance on the instruction unchanged.",
      ],
    },
  ],
  bibtex: `@article{li2026paraphrase,
  author  = {Hanlong Li and Sihan Tan and Takeshi Ashizawa and Benjamin Yen and Kazuhiro Nakadai},
  title   = {Paraphrase Consensus Is Not Self-Consistency: Instruction Reliance and Robustness in {VLA} Policies},
  journal = {arXiv preprint arXiv:2610.19438},
  year    = {2026},
}`,
  gaps: ['Teaser figure (exported from the paper figures as PNG)', 'Code link, if released'],
} satisfies ProjectPage;
