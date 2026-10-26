import type { ResearchGroup, ResearchProject } from './types';

/**
 * Selected research projects.
 *
 * Figures: drop an image into `src/assets/research/` and set
 * `figure.file` to its file name. Until then a neutral placeholder is shown.
 *
 * AIRoA work: keep descriptions at the level below until the text has been
 * cleared for public release. Do not add unpublished metrics, internal
 * repository / system names, datasets or infrastructure details. When the
 * work is cleared, set `disclosure.status` to 'approved'.
 */
export const projects: ResearchProject[] = [
  {
    id: 'openarm-rl',
    headline: 'Can a learned controller execute VLA actions more faithfully than PD control?',
    title: 'OpenArm RL Execution Tracker',
    shortTitle: 'RL for VLA execution',
    areas: ['Reinforcement Learning', 'Low-Level Control', 'VLA Execution'],
    context: 'AIRoA',
    period: '2026 – present',
    status: 'ongoing',
    summary:
      'Vision-language-action policies produce short chunks of future actions, but what the robot actually does depends on the low-level controller that tracks them — typically a hand-tuned PD loop. This project asks whether a learned tracking policy can execute VLA action chunks more faithfully than conventional PD control, including when the incoming command stream is imperfect. I study this in a simulated OpenArm benchmark built with MuJoCo/MJLab, training PPO policies with domain randomization and comparing them against matched PD baselines.',
    contributions: [
      'Initiated and lead the project, mentored by Nicola Scianca: problem formulation, benchmark design with imperfect command streams, PPO training with domain randomization, and evaluation against matched PD baselines.',
    ],
    keyResult: 'Preliminary: ~2.4% tracking error with RL vs. ~4.6% with PD, a ~48% relative decrease (pending experimental verification)',
    figure: {
      file: 'openarm-rl-cover.png',
      alt: 'Schematic: a VLA policy emits action chunks with one late command (an imperfect stream); the chunks go either to a PD baseline or to a PPO-trained RL tracker that drives a simulated OpenArm along the commanded path.',
      caption: 'Schematic overview.',
    },
    placeholderKeywords: ['PPO', 'MuJoCo · MJLab', 'OpenArm', 'PD baseline'],
    links: [],
    disclosure: {
      status: 'approved',
      note: 'Cleared for publication by AIRoA (2026-10-26).',
    },
  },
  {
    id: 'vla-real-world',
    headline: 'Making VLA policies work on a real dual-arm robot: real-time execution, action design and systematic evaluation',
    title: 'Real-Time Execution, Adaptation and Evaluation of VLA Policies on Physical Robots',
    shortTitle: 'Real-world VLA',
    areas: ['Vision-Language-Action Models', 'Real-Robot Evaluation', 'Manipulation'],
    context: 'AIRoA',
    period: '2026 – present',
    status: 'ongoing',
    summary:
      'Deploying VLA policies on real hardware raises questions that offline benchmarks hide: how inference and control stay in step in real time, how actions should be represented for a given robot, and how to evaluate policy behavior systematically. I work on these questions with the AIRoA team on a dual-arm Franka platform.',
    contributions: [
      'Designed and validated a real-time VLA execution stack combining asynchronous, time-aligned action-chunk re-inference with interpolated high-frequency control and a streaming-protocol client; tested it on physical robots myself.',
      'Led 60 real-robot VLA evaluation sessions (177 recorded trial segments): defined experimental protocols and metrics, implemented trajectory recording and analysis tools, and analyzed policy behavior.',
      'Designed and hardware-tested VLA action-representation adaptation (quaternion / rotation-vector poses and observation-relative gripper actions); co-developed hierarchical Goal/Task interfaces and designed a short-horizon evaluation workflow.',
    ],
    figure: {
      file: 'vla-real-world-cover.png',
      alt: 'Schematic timeline: asynchronous VLA inference calls produce time-aligned, overlapping action chunks that are interpolated into a high-rate control signal for a dual-arm Franka platform.',
      caption: 'Schematic overview.',
    },
    placeholderKeywords: ['Action chunks', 'Asynchronous inference', 'Dual-arm Franka', 'Evaluation protocol'],
    links: [],
    disclosure: {
      status: 'approved',
      note: 'Cleared for publication by AIRoA (2026-10-26).',
    },
    gaps: ['Photo or video of the robot platform'],
  },
  {
    id: 'lcc',
    headline: 'How much do VLA policies depend on the exact wording of their instruction?',
    title: 'Paraphrase Consensus Is Not Self-Consistency: Instruction Reliance and Robustness in VLA Policies',
    shortTitle: 'Instruction reliance in VLAs',
    areas: ['Vision-Language-Action Models', 'Robustness', 'Evaluation'],
    context: 'Nakadai Lab, Institute of Science Tokyo',
    period: '2026',
    status: 'completed',
    summary:
      'VLA policies fine-tuned on LIBERO are trained and evaluated on the same ten instruction strings. This work measures what rewording the instruction costs, tests whether test-time paraphrase consensus (the medoid action over several paraphrases) recovers it, and introduces a wrong-instruction probe that measures how much of a policy’s success depends on the instruction at all, across three policies and four suites.',
    contributions: [
      'First author. Built the evaluation harness and paraphrase pipeline, and ran the consensus, probe and LoRA post-training experiments.',
    ],
    keyResult: 'Rewording the instruction costs base OpenVLA 38.0 points; paraphrase consensus does not recover it',
    highlights: [
      'LoRA post-training on paraphrased instructions reduces the one-paraphrase effect to +2.0 points, against −32.0 for a matched control, and transfers to withheld phrasings.',
    ],
    publicationIds: ['lcc'],
    figure: {
      file: 'lcc-cover.png',
      alt: 'Schematic: the training instruction and three paraphrases, plus a wrong-instruction reliance probe, feed a VLA policy; its K action chunks are aggregated by taking the medoid, which is executed on LIBERO.',
      caption: 'Schematic overview.',
    },
    placeholderKeywords: ['OpenVLA', 'LIBERO', 'Paraphrase consensus', 'LoRA'],
    links: [{ kind: 'arxiv', href: 'https://arxiv.org/abs/2610.19438' }],
    gaps: ['Code (if released)'],
  },
  {
    id: 'ambit',
    headline: 'A humanoid that plans ahead which body parts to use for two-handed tracking',
    title: 'AMBIT: Anticipatory Multimodal Body Recruitment for Bimanual Tracking on a Humanoid',
    shortTitle: 'AMBIT',
    areas: ['Humanoid Whole-Body Planning', 'Generative Models', 'Bimanual Control'],
    context: 'Nakadai Lab, Institute of Science Tokyo',
    period: '2025 – 2026',
    status: 'completed',
    summary:
      'Tracking targets with both hands on a humanoid is a whole-body problem: depending on where the targets go, the pelvis and waist may need to be recruited, and AMBIT decides this in anticipation rather than reacting after the fact. It treats body recruitment as a generative planning problem. A CVAE proposes diverse whole-body strategies, a non-learned selector filters, ranks and verifies them, and a whole-body differential-IK QP tracks the chosen strategy.',
    contributions: [
      'Led the project as first author, from problem formulation to method design and evaluation.',
      'Built the pipeline combining CVAE-based strategy generation, constraint-aware selection and whole-body QP control.',
    ],
    keyResult: '85% success vs. 74% for a reactive tracker on 160 held-out feasible simulation episodes',
    highlights: ['Hardware demonstrations on a Unitree R1 humanoid, carried out with external support.'],
    publicationIds: ['ambit'],
    figure: {
      file: 'ambit-cover.png',
      alt: 'Schematic: a humanoid with faint alternative upper-body recruitment strategies and one committed strategy reaching two hand targets; beside it the AMBIT pipeline from trajectory preview through CVAE sampling (K = 16), filter-rank-verify selection and commit with hysteresis to a whole-body QP.',
      caption: 'Schematic overview.',
    },
    placeholderKeywords: ['CVAE', 'Whole-body QP', 'Bimanual tracking', 'Unitree R1'],
    links: [{ kind: 'arxiv', href: 'https://arxiv.org/abs/2609.33484' }],
    gaps: ['Code (if released)'],
  },
  {
    id: 'talking-robot',
    headline: 'Robots that talk to each other over sound, even in heavy noise',
    title: 'The Talking Robot: Distortion-Robust Acoustic Models for Robot-Robot Communication',
    shortTitle: 'The Talking Robot',
    areas: ['Learned Communication', 'Robust Learning', 'Multi-Robot Systems'],
    context: 'Robot Danger Lab, Georgia Tech',
    period: '2024 – 2025',
    status: 'completed',
    summary:
      'Robots sharing a space can talk to each other over sound, but real acoustic channels are noisy and distorting. This work learns the channel end to end: a FastSpeech-style transmitter turns messages into audio, a Conformer-CTC receiver decodes them, and a noise-aware training curriculum keeps the pair reliable as conditions degrade, with a model small enough to run in real time on a CPU.',
    contributions: [
      'First author. Developed the end-to-end transmitter–receiver system and the noise-aware training curriculum, and ran the evaluation.',
    ],
    keyResult: '8.3% character error rate at 0 dB SNR',
    highlights: ['2.1M-parameter codec with under 13 ms CPU inference.'],
    publicationIds: ['talking-robot'],
    figure: {
      file: 'talking-robot-system.png',
      alt: 'System diagram. Inference time: a sender robot runs text-to-speech (encoder, duration predictor, length regulator, decoder) and a Griffin-Lim vocoder, and speaks over the air with added noise to a receiver robot running automatic speech recognition (convolutional subsampling, Conformer, CTC projection). Training time: the receiver is pretrained with a procedural synthesizer and ASR reconstruction loss, then sender and receiver are co-trained through added noise in three phases: pretraining, ramp and full co-training.',
      caption: 'System overview from the paper: a TTS sender and a Conformer-CTC receiver talk over a noisy over-air channel, co-trained in three phases after receiver pretraining.',
    },
    placeholderKeywords: ['FastSpeech-style TX', 'Conformer-CTC RX', 'Noise curriculum', '0 dB SNR'],
    video: {
      src: 'projects/talking-robot/demo.mp4',
      poster: 'projects/talking-robot/poster.jpg',
      label: 'Demo: two laptops, as “Robot Alpha” and “Robot Beta”, exchange messages over the air.',
    },
    links: [
      { kind: 'arxiv', href: 'https://arxiv.org/abs/2603.07072' },
      { kind: 'code', href: 'https://github.com/HanlongLi/Talking-Robot' },
    ],
  },
  {
    id: 'bio-agentic',
    headline: 'Robots that communicate the way animals do: through motion and light',
    title: 'Bio-Agentic Visual Communication and Control',
    shortTitle: 'Bio-agentic visual communication',
    areas: ['Bio-Inspired Robotics', 'Visual Communication', 'Perception'],
    context: 'Sustainable Design & Manufacturing Lab, Georgia Tech',
    period: '2023 – 2025',
    status: 'completed',
    summary:
      'Many animals coordinate through visible signals such as movement patterns and light. This project develops biologically inspired visual communication for robots: UAVs signal through motion and LED patterns, perceive the signals of others, and respond through an LLM/RAG-based module that generates symbolic responses, forming a low-bandwidth communication channel grounded in perception.',
    contributions: [
      'Co-developed the UAV visual communication system; built ROS and computer-vision components, including an AprilTag/YOLO perception pipeline.',
      'Co-author on the journal and conference papers and co-inventor on the U.S. patent application.',
    ],
    publicationIds: ['bio-agentic-imece', 'bio-agentic-biomimetics', 'bio-visual-patent'],
    figure: {
      file: 'bio-agentic-cover.png',
      alt: 'Schematic: one UAV signals with a waggle maneuver and green LEDs, a second UAV perceives it, an LLM + RAG translation layer informed by bee, deer and peacock bio-strategies generates a motion and LED response, and a third UAV relays it with red LEDs.',
      caption: 'Schematic overview.',
    },
    placeholderKeywords: ['UAV signaling', 'Motion · LED', 'AprilTag · YOLO', 'LLM / RAG'],
    links: [
      { kind: 'doi', label: 'Biomimetics', href: 'https://doi.org/10.3390/biomimetics10090605' },
      { kind: 'patent', href: 'https://patents.justia.com/patent/20260127397' },
    ],
    gaps: ['Photo of the UAV signaling setup, if one exists'],
  },
];

/**
 * How projects are grouped on the page. The grouping carries the narrative:
 * current robot-learning work first, earlier work as technical foundation.
 */
export const researchGroups: ResearchGroup[] = [
  {
    id: 'current',
    title: 'Current work',
    subtitle: 'Robot learning on real hardware',
    lead: 'How learned policies turn into reliable motion on real robots: VLA execution, evaluation and robustness, and whole-body planning on a humanoid.',
    projectIds: ['openarm-rl', 'vla-real-world', 'lcc', 'ambit'],
  },
  {
    id: 'foundations',
    title: 'Earlier work',
    subtitle: 'Learned multimodal communication',
    lead: 'Robot-to-robot communication through sound and vision. These projects are not manipulation research, but they are where I learned to build learning systems that hold up under real-world noise.',
    projectIds: ['talking-robot', 'bio-agentic'],
  },
];
