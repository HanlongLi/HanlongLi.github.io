import type { ProjectPage } from '../types';

const transcripts = [
  'robot beta report status',
  'all systems nominal',
  'move forward 5 meters',
  'acknowledged',
  'obstacle detected at 3 meters',
  'stop immediately',
  'turn left 90 degrees',
  'heading updated',
  'navigate to waypoint 42',
  'waypoint 42 reached',
  'return to base',
  'mission complete',
];

export default {
  slug: 'talking-robot',
  projectId: 'talking-robot',
  publicationId: 'talking-robot',
  title: 'The Talking Robot: Distortion-Robust Acoustic Models for Robot-Robot Communication',
  description: 'The Talking Robot: Distortion-Robust Acoustic Models for Robot-Robot Communication.',
  authors: [
    { name: 'Hanlong Li', affiliations: [1] },
    { name: 'Karishma Kamalahasan', affiliations: [2] },
    { name: 'Jiahui Li', affiliations: [1] },
    { name: 'Kazuhiro Nakadai', affiliations: [1] },
    { name: 'Shreyas Kousik', affiliations: [2] },
  ],
  affiliations: [
    {
      name: 'Institute of Science Tokyo',
      marker: '*',
      emails: ['li.h.5ead@m.isct.ac.jp', 'lijiahui@ra.sc.eng.isct.ac.jp', 'nakadai@ra.sc.e.titech.ac.jp'],
    },
    {
      name: 'Georgia Institute of Technology',
      marker: '†',
      emails: ['kkamalahasan3@gatech.edu', 'shreyas.kousik@me.gatech.edu'],
    },
  ],
  links: [
    { kind: 'arxiv', href: 'https://arxiv.org/abs/2603.07072' },
    { kind: 'code', href: 'https://github.com/HanlongLi/Talking-Robot' },
  ],
  sections: [
    {
      kind: 'text',
      title: 'Abstract',
      paragraphs: [
        'We present Artoo, a learned acoustic communication system for robots that replaces hand-designed signal processing with end-to-end co-trained neural networks. Our system pairs a lightweight text-to-speech (TTS) transmitter (1.18M parameters) with a conformer-based automatic speech recognition (ASR) receiver (938K parameters), jointly optimized through a differentiable channel. Unlike human speech, robot-to-robot communication is paralinguistics-free: the system need not preserve timbre, prosody, or naturalness, only maximize decoding accuracy under channel distortion. Through a three-phase co-training curriculum, the TTS transmitter learns to produce distortion-robust acoustic encodings that surpass the baseline under noise, achieving 8.3% CER at 0 dB SNR. The entire system requires only 2.1M parameters (8.4 MB) and runs in under 13 ms end-to-end on a CPU, making it suitable for deployment on resource-constrained robotic platforms.',
      ],
    },
    {
      kind: 'video',
      id: 'video',
      title: 'Demo Video',
      src: 'projects/talking-robot/demo.mp4',
      poster: 'projects/talking-robot/poster.jpg',
    },
    {
      kind: 'audio',
      title: 'Acoustic Communication Examples',
      intro:
        'Listen to 12 examples of our co-trained acoustic signals. Notice how they sound different from typical human speech, as they are optimized purely for machine comprehension and noise robustness.',
      items: transcripts.map((transcript, i) => ({
        label: `Example ${i + 1}`,
        transcript,
        src: `projects/talking-robot/audio/msg_${String(i + 1).padStart(2, '0')}.wav`,
      })),
    },
  ],
  bibtex: `@article{li2026talkingrobot,
  author    = {Hanlong Li and Karishma Kamalahasan and Jiahui Li and Kazuhiro Nakadai and Shreyas Kousik},
  title     = {The Talking Robot: Distortion-Robust Acoustic Models for Robot-Robot Communication},
  journal   = {arXiv preprint arXiv:2603.07072},
  year      = {2026},
}`,
  gaps: ['System diagram figure (add a `figure` section)', 'IEEE Xplore / DOI link once proceedings are online'],
} satisfies ProjectPage;
