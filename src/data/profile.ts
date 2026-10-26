import type { SkillGroup, TrajectoryStage } from './types';

/**
 * Hero, About and research-direction copy.
 *
 * Inline emphasis: `**text**` is bold, `*text*` is italic. No other
 * markdown is interpreted, which keeps the copy safe to edit.
 */
export const profile = {
  /** Research identity line in the hero. */
  tagline: 'Robot Learning · Manipulation · Embodied AI',

  currentRole: [
    {
      role: 'M.Eng. student',
      place: 'Institute of Science Tokyo',
      detail: 'Advisor: Prof. Kazuhiro Nakadai',
    },
    {
      role: 'B.S. in Computer Science',
      place: 'Georgia Institute of Technology',
      detail: 'Threads: Intelligence & People · Graduated with High Honor',
    },
    {
      role: 'Research Engineer Intern',
      place: 'AIRoA',
      detail: 'Real-robot VLA and RL research and engineering',
    },
  ],

  /**
   * Portrait: put a square-ish photo (≥ 800 px) in `src/assets/portrait/`
   * and set the file name here. Leave empty to show the monogram tile.
   */
  portrait: {
    file: 'hanlong-li.jpg',
    alt: 'Portrait of Hanlong Li',
  },

  /**
   * One-sentence research statement, set large under the name. This is the
   * line a visitor should remember. `*text*` is shown in the accent colour.
   */
  statement:
    'I study how robots learn manipulation skills that *work on real hardware* and *generalize* across tasks and embodiments.',

  intro: [
    'My research focuses on **robot learning**, particularly reinforcement and imitation learning: how robots can acquire, adapt, and reliably execute complex behaviors in the physical world. At AIRoA, I work on learning-based control and real-time deployment of vision-language-action (VLA) policies, with the goal of making learned policies reliable on physical robots.',
    "At the Institute of Science Tokyo, I lead my lab’s work on learning-based **whole-body planning and control for humanoid robots**, toward loco-manipulation. This includes AMBIT, a generative approach to whole-body planning for bimanual tracking. I also study how robust VLA policies are to variations in their language instructions.",
  ],

  interests: [
    {
      title: 'Robot manipulation learning',
      text: 'Skills that transfer across objects, tasks and scenes rather than being tuned for one setup.',
    },
    {
      title: 'Reinforcement & imitation learning',
      text: 'Combining demonstrations with RL, from high-level policies down to low-level control.',
    },
    {
      title: 'Vision-language-action models',
      text: 'How VLA policies are executed, adapted and evaluated on real robots.',
    },
    {
      title: 'Embodiment-aware learning & control',
      text: 'Treating the robot’s body (its kinematics, dynamics and controller) as part of the learning problem.',
    },
    {
      title: 'Multimodal robotic systems',
      text: 'Integrating vision, sound and language into systems that act robustly in noisy environments.',
    },
  ],

  about: [
    'My first research projects were about robots communicating with each other. In Prof. Bert Bras’s lab at Georgia Tech I worked on bio-inspired visual signaling, where UAVs exchange information through motion and light the way many animals do. In Prof. Shreyas Kousik’s Robot Danger Lab I built a learned acoustic channel that lets two robots talk over sound, and trained it to stay intelligible under heavy noise. Neither project was about manipulation. Both taught me the lesson that has shaped my work since: a learned model is only as good as its behavior under the conditions it will actually face, and those conditions have to be designed into training and evaluation from the start.',
    'In Prof. Kazuhiro Nakadai’s lab I moved from communication to action. AMBIT starts from a question humans answer without thinking: when you track something with both hands, which parts of your body should join in, and when? Framing this as generative planning, with diverse whole-body strategies from a CVAE filtered by constraints and executed by a QP controller, made it concrete for me how strongly the body shapes what a good action is.',
    'At AIRoA I work with VLA policies on real robots. Running and analyzing real-robot evaluations showed me how much of a policy’s behavior is decided *after* the model outputs an action: in how action chunks are timed, represented and tracked by the controller. That observation is what led me to start a project on reinforcement learning for the low-level execution of VLA actions.',
    'In my PhD I want to work on manipulation learning that generalizes. I am interested in combining reinforcement and imitation learning so that skills carry over across tasks, objects and embodiments, with the embodiment treated as part of the learning problem rather than an afterthought. I care about careful real-world evaluation, and I enjoy research that goes all the way from a question to a robot that does the thing.',
  ],

  skills: [
    {
      label: 'Robot learning & control',
      items: ['PyTorch', 'PPO / RL', 'CVAE', 'VLA evaluation', 'QP / IK', 'ROS / ROS 2', 'MuJoCo / MJLab', 'Gazebo', 'Isaac Sim'],
    },
    {
      label: 'Programming & systems',
      items: ['Python', 'C/C++', 'Java', 'JavaScript / TypeScript', 'Linux', 'Docker', 'Git', 'Jetson', 'OpenCV'],
    },
  ] satisfies SkillGroup[],
};

/**
 * The research trajectory shown under the hero. Each stage links to the
 * corresponding research entry.
 */
export const trajectory: TrajectoryStage[] = [
  {
    period: '2023 – 2025',
    theme: 'Bio-inspired visual communication',
    context: 'SDM Lab, Georgia Tech',
    takeaway: 'Perception and planning for multi-robot systems',
    projectId: 'bio-agentic',
  },
  {
    period: '2024 – 2025',
    theme: 'Machine learning for robot-to-robot interaction',
    context: 'Robot Danger Lab, Georgia Tech',
    takeaway: 'End-to-end learning that is robust to real-world noise',
    projectId: 'talking-robot',
  },
  {
    period: '2025 – 2026',
    theme: 'Generative whole-body planning and control',
    context: 'Nakadai Lab, Science Tokyo',
    takeaway: 'Embodiment-aware action generation on a humanoid',
    projectId: 'ambit',
  },
  {
    period: '2026 – now',
    theme: 'Real-world VLA & RL control',
    context: 'AIRoA',
    takeaway: 'Learned policies executed and evaluated on real robots',
    projectId: 'openarm-rl',
  },
  {
    period: 'PhD · Fall 2027',
    theme: 'Generalizable manipulation learning',
    context: 'Next',
    takeaway: 'RL + IL for skills that transfer across tasks and embodiments',
    future: true,
  },
];
