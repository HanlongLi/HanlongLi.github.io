import type { Education, Experience, Honor } from './types';

/** Research experience, most recent first. */
export const experience: Experience[] = [
  {
    id: 'airoa',
    organization: 'AIRoA',
    role: 'Research Engineer Intern',
    location: 'Tokyo, Japan',
    start: 'Aug 2026',
    end: 'Present',
    supervision: 'Mentors: Nicola Scianca and Yueh-Hua (Kris) Wu',
    points: [
      'Initiated and lead an RL project on low-level execution of VLA action chunks: a MuJoCo/MJLab OpenArm benchmark with PPO, domain randomization, imperfect command streams and matched PD baselines (preliminary: ~2.4% vs. ~4.6% tracking error, pending verification).',
      'Designed and hardware-validated a real-time VLA execution stack: asynchronous, time-aligned action-chunk re-inference with interpolated high-frequency control.',
      'Led 60 real-robot VLA evaluation sessions (177 trial segments) on a dual-arm Franka platform: protocols, metrics, trajectory analysis tools and policy behavior analysis.',
    ],
    projectIds: ['openarm-rl', 'vla-real-world'],
    disclosure: {
      status: 'approved',
      note: 'Cleared for publication by AIRoA (2026-10-26).',
    },
  },
  {
    id: 'nakadai-lab',
    organization: 'Institute of Science Tokyo',
    unit: 'Nakadai Laboratory',
    role: 'Graduate Researcher',
    location: 'Tokyo, Japan',
    start: 'Oct 2025',
    end: 'Present',
    supervision: 'Advisor: Prof. Kazuhiro Nakadai',
    points: [
      'Lead AMBIT, a CVAE-based framework for anticipatory whole-body recruitment in humanoid bimanual tracking, from formulation to simulation evaluation and hardware demonstrations.',
      'Lead a study of instruction reliance and robustness in VLA policies: paraphrase consensus, a wrong-instruction probe and paraphrase post-training across three policies and four LIBERO suites (arXiv 2026).',
      'Co-author on sign language generation work with spectral optimal transport (ECCV 2026 MoCha Workshop).',
    ],
    projectIds: ['ambit', 'lcc'],
  },
  {
    id: 'safe-robotics-lab',
    organization: 'Georgia Institute of Technology',
    unit: 'Robot Danger Lab',
    role: 'Visiting Researcher',
    start: 'Jun 2024',
    end: 'Sep 2025',
    supervision: 'Advisor: Prof. Shreyas Kousik',
    points: [
      'Developed an end-to-end learned acoustic communication system for robot-to-robot interaction, with a noise-aware training curriculum for robustness to channel distortion.',
      'First-author paper at IROS 2026.',
    ],
    projectIds: ['talking-robot'],
  },
  {
    id: 'sdm-lab',
    organization: 'Georgia Institute of Technology',
    unit: 'Sustainable Design & Manufacturing Lab',
    role: 'Undergraduate Researcher, then Part-Time Researcher',
    start: 'Sep 2023',
    end: 'Aug 2025',
    supervision: 'Advisor: Prof. Bert Bras',
    points: [
      'Co-developed bio-inspired UAV visual communication combining motion/LED signaling, perception and LLM/RAG-based symbolic responses.',
      'Built ROS and computer-vision components for low-bandwidth robot signaling, including an AprilTag/YOLO perception pipeline.',
      'Contributed to a journal article, a conference paper and a U.S. patent application.',
    ],
    projectIds: ['bio-agentic'],
    gaps: [
      'Confirm the lab name: the CV says “Systems Design & Management (SDM) Lab”, the site brief says “Sustainable Design and Manufacturing Lab” (used here)',
    ],
  },
];

/** Software-engineering background, shown as one sentence under Experience. Set to '' to hide. */
export const industrySummary =
  'Before moving into full-time robotics research, I worked as a full-time software engineer (2024–2025), building full-stack features for AI-powered administrator tools and integrating machine-learning outputs into production web and iOS applications.';

export const education: Education[] = [
  {
    id: 'science-tokyo',
    institution: 'Institute of Science Tokyo',
    degree: 'M.Eng.',
    field: 'Systems and Control Engineering',
    start: '2025',
    end: '2027 (expected)',
    advisor: 'Prof. Kazuhiro Nakadai',
    notes: [],
  },
  {
    id: 'georgia-tech',
    institution: 'Georgia Institute of Technology',
    degree: 'B.S.',
    field: 'Computer Science',
    end: '2024',
    notes: ['Threads: Intelligence & People', 'Graduated with High Honor'],
  },
];

export const teaching: Honor[] = [
  { text: 'Teaching Assistant, Global PBL Foundation, Institute of Science Tokyo', year: '2025' },
];

export const honors: Honor[] = [
  { text: 'High Honor, Georgia Institute of Technology', year: '2024' },
  { text: 'Dean’s List, Georgia Institute of Technology' },
];
