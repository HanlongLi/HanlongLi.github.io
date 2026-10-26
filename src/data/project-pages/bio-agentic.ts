import type { ProjectPage } from '../types';

/*
 * Source: Starbuck et al., Biomimetics 10(9):605, 2025 (open access, CC BY 4.0).
 * Figures are reproduced from the article with attribution.
 */
const credit = 'Figure reproduced from Starbuck et al., Biomimetics 2025 (CC BY 4.0).';

export default {
  slug: 'bio-agentic',
  projectId: 'bio-agentic',
  publicationId: 'bio-agentic-biomimetics',
  title: 'A Concept for Bio-Agentic Visual Communication: Bridging Swarm Intelligence with Biological Analogues',
  venue: 'Biomimetics, 2025',
  description:
    'A generative visual language for UAV swarms in RF-denied environments, built from bee waggle dancing, deer tail-flagging and peacock displays, with an LLM + RAG translation layer.',
  authors: [
    { name: 'Bryan Starbuck', affiliations: [1], corresponding: true },
    { name: 'Hanlong Li', affiliations: [1], corresponding: true },
    { name: 'Bryan Cochran', affiliations: [1] },
    { name: 'Marc Weissburg', affiliations: [2] },
    { name: 'Bert Bras', affiliations: [1] },
  ],
  affiliations: [
    { name: 'George W. Woodruff School of Mechanical Engineering, Georgia Institute of Technology' },
    { name: 'School of Biological Sciences, Georgia Institute of Technology' },
  ],
  notes: ['* Corresponding authors'],
  links: [{ kind: 'paper', href: 'https://doi.org/10.3390/biomimetics10090605' }],
  teaser: {
    file: 'fig1_overview.png',
    alt: 'Left: RF jamming, adversarial UAVs and urban RF saturation cause UAV swarm signal loss. Right: bio-strategies (bee, peacock, deer) precondition a GenAI translation layer so UAVs exchange LED-based messages and maneuver sequences.',
    caption: `(A) RF-denied environments disrupting threat interception capability. (B) Bio-Agentic visual communication enabling threat interception through LED and maneuver-based signaling. The blue arrows illustrate how the Bio-Strategies precondition the GenAI Translation Layer and enable the UAVs to propagate visual signals bidirectionally. ${credit}`,
  },
  sections: [
    {
      kind: 'text',
      title: 'Abstract',
      paragraphs: [
        'Biological swarms communicate through decentralized, adaptive behaviors shaped by local interactions, selective attention, and symbolic signaling. These principles of animal communication enable robust coordination without centralized control or persistent connectivity. This work presents a proof of concept that identifies, evaluates, and translates biological communication strategies into a generative visual language for unmanned aerial vehicle (UAV) swarm agents operating in radio-frequency (RF)-denied environments. Drawing from natural exemplars such as bee waggle dancing, white-tailed deer flagging, and peacock feather displays, we construct a configuration space that encodes visual messages through trajectories and LED patterns. A large language model (LLM), preconditioned using retrieval-augmented generation (RAG), serves as a generative translation layer that interprets perception data and produces symbolic UAV responses. Five test cases evaluate the system’s ability to preserve and adapt signal meaning through within-modality fidelity (maintaining symbolic structure in the same modality) and cross-modal translation (transferring meaning across motion and light). Covariance and eigenvalue-decomposition analysis demonstrate that this bio-agentic approach supports clear, expressive, and decentralized communication, with motion-based signaling achieving near-perfect clarity and expressiveness (0.992, 1.000), while LED-only and multi-signal cases showed partial success, maintaining high expressiveness (~1.000) but with much lower clarity (≤0.298).',
      ],
    },
    {
      kind: 'figure',
      title: 'Bio-Inspired Visual Signals',
      file: 'fig3_signals.png',
      alt: 'Three 3D trajectory plots: a honey bee waggle dance pointing toward a threat, a peacock feather display for role signaling, and white-tailed deer flagging with red LEDs past an obstacle.',
      caption: `Bio-inspired visual signals encoded in configuration space: (A) bee waggle dance for a threat at 30, (B) peacock display for role signaling, (C) deer tail-flagging for an obstacle on the left. ${credit}`,
    },
    {
      kind: 'text',
      title: 'Related Outputs',
      list: [
        'B. Starbuck, H. Li (equal contribution), B. Bras. *Toward Bio-Agentic Visual Communication and Control: Implicit Semantic Manifolds and Invariant State Estimation.* ASME IMECE, accepted, 2026.',
        'B. Bras, M. Weissburg, B. Cochran, H. Li, B. Starbuck. *Biologically Inspired Active Visual Communication System and Method.* U.S. Patent Application Publication US 2026/0127397 A1, 2026.',
      ],
    },
  ],
  bibtex: `@article{starbuck2025bioagentic,
  author  = {Bryan Starbuck and Hanlong Li and Bryan Cochran and Marc Weissburg and Bert Bras},
  title   = {A Concept for Bio-Agentic Visual Communication: Bridging Swarm Intelligence with Biological Analogues},
  journal = {Biomimetics},
  volume  = {10},
  number  = {9},
  pages   = {605},
  year    = {2025},
  doi     = {10.3390/biomimetics10090605},
}`,
  gaps: ['Photo or video of the physical UAV signaling setup, if one exists'],
} satisfies ProjectPage;
