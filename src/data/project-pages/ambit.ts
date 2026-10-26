import type { ProjectPage } from '../types';

/*
 * Content from the AMBIT project website prepared with the paper
 * and the arXiv abstract.
 */
export default {
  slug: 'ambit',
  projectId: 'ambit',
  publicationId: 'ambit',
  title: 'AMBIT: Anticipatory Multimodal Body Recruitment for Bimanual Tracking on a Humanoid',
  description:
    'AMBIT learns the set of valid whole-body recruitment strategies for humanoid bimanual tracking, picks one with a non-learned verifier, and commits to it before the arms run out of reach.',
  authors: [
    { name: 'Hanlong Li' },
    { name: 'Sihan Tan' },
    { name: 'Takeshi Ashizawa' },
    { name: 'Benjamin Yen' },
    { name: 'Kazuhiro Nakadai' },
  ],
  affiliations: [{ name: 'Institute of Science Tokyo', marker: '' }],
  links: [
    { kind: 'paper', href: 'https://arxiv.org/pdf/2609.33484' },
    { kind: 'arxiv', href: 'https://arxiv.org/abs/2609.33484' },
    { kind: 'video', href: '#video' },
  ],
  teaser: {
    file: 'fig1_overview.png',
    alt: 'Four MuJoCo renders of the Unitree R1 on the same lateral task: with pelvis and waist frozen the hands miss their targets; three valid recruitment strategies lean, lower or twist the body and reach them.',
    caption:
      'One bimanual task, four bodies. With pelvis and waist frozen the 5-DoF arms saturate and the hands miss their targets (left). The same task admits several dynamically valid recruitment strategies that lean, lower or twist the body (right; MuJoCo, Unitree R1). AMBIT learns their conditional distribution, selects among samples with a non-learned verifier, and executes the chosen one as the reference of a standard whole-body tracker.',
  },
  tldr: 'A humanoid with 5-DoF arms cannot track bimanual hand trajectories with its arms alone. It has to move its pelvis and waist, and there are many valid ways to do so. AMBIT learns that set of strategies, picks one with a non-learned verifier, and commits to it before the arms run out of reach.',
  sections: [
    {
      kind: 'text',
      title: 'Abstract',
      paragraphs: [
        'A humanoid with 5-DoF arms cannot track generic bimanual end-effector trajectories with its arms alone; pelvis and waist motion must be recruited, but which motion, and when, is not uniquely determined. On a Unitree R1 in fixed double support, the set of dynamically valid recruitment strategies (pelvis pose and waist trajectories) for a task is a diverse continuous manifold, and a deterministic regressor trained on it mode-averages into strategies valid only 35% of the time, against 52% for a conditional variational autoencoder (CVAE) and 82% for the best of 16 CVAE samples. We introduce AMBIT: the CVAE proposes strategies from a preview of the commanded trajectory, a non-learned selector filters, ranks and verifies them, and a receding-horizon loop commits to one with hysteresis. The committed strategy is the reference of the same whole-body differential-IK QP a reactive tracker runs, which keeps authority over residual error.',
        'On 160 held-out episodes that admit a valid strategy, in full MuJoCo dynamics under a torque controller, AMBIT reaches 85% success at a 3 cm/15 deg tolerance against 74% for the tracker (disjoint confidence intervals) and recruits the body before the arms saturate in 48% of episodes against 35%. Because diversity is preserved, constraints unknown at training time are enforced by selection alone: under five zero-shot shifts AMBIT beats the warm-started tracker on every shift and matches a test-time re-optimisation baseline 17x more expensive. On a Unitree G1, with hyperparameters unchanged, the protocol reproduces the structure of the valid set and widens the gap over the tracker to 0.85 against 0.53. Five selected strategies execute on the externally supported physical R1, distinct in pelvis excursion and tracking the planned end-effector motion to a median of 11 mm by encoder forward kinematics, which establishes kinematic realisability, not balance.',
      ],
    },
    {
      kind: 'video',
      id: 'video',
      title: 'Video',
      src: 'projects/ambit/ambit_video.mp4',
      poster: 'projects/ambit/video_poster.jpg',
      caption:
        '57 s: the five selected strategies executed on the externally supported physical R1, played at 2× speed. The hardware result is kinematic realisability of the planned strategies, not balance.',
    },
    {
      kind: 'text',
      title: 'How AMBIT Works',
      subsections: [
        {
          title: 'Sample recruitment strategies',
          paragraphs: [
            'A CVAE conditioned on the robot state and a preview of the commanded hand trajectory samples K = 16 strategies over the horizon: a pelvis pose and waist trajectory, encoded as 8 coordinates × 16 DCT coefficients. It is trained on an oracle dataset of dynamically validated strategies, so it learns the whole valid set rather than one average.',
          ],
        },
        {
          title: 'Filter, rank, verify',
          paragraphs: [
            'A non-learned selector drops samples that violate constraints, including ones first known at test time (a torso obstacle, a keep-out region, a payload), ranks the rest by an analytic cost, and verifies the survivors kinematically. Nothing is retrained when a new constraint appears.',
          ],
        },
        {
          title: 'Commit, then let the tracker finish',
          paragraphs: [
            'A receding-horizon loop replans every 0.5 s and switches strategies only with hysteresis, so the body does not chatter. The committed strategy becomes the posture reference of the same whole-body differential-IK QP a reactive tracker runs, so the tracker keeps authority over residual hand error.',
          ],
        },
      ],
    },
    {
      kind: 'text',
      title: 'Findings',
      subsections: [
        {
          title: 'The valid set is a diverse manifold, not a few modes',
          paragraphs: [
            'Among the task episodes that a balanced body can solve, the oracle finds 9.2 physically distinct strategies per episode and 92% of episodes are multimodal. Descriptor space has weak clusters and an intrinsic dimension of about 4.3: a continuous manifold.',
            'The physics sets the timing. Dynamic validity collapses above roughly 0.2 m/s of pelvis speed, so a strategy that starts early can be slow, and slow is what survives full dynamics.',
          ],
          figure: {
            file: 'e0_speed_validity.png',
            alt: 'Plots of dynamic validity against pelvis speed and anticipation margin.',
            caption:
              'Dynamic validity against pelvis speed and anticipation margin. Strategies that recruit 0.3 to 1 s before the arms saturate are valid 87% of the time; reactive ones 16%.',
          },
        },
        {
          title: 'Regression averages the modes away',
          paragraphs: [
            "Trained on the same oracle data, a deterministic regressor outputs a strategy that lies between the valid ones and is itself valid only 35% of the time. The CVAE's individual samples are valid 52% of the time, and its 16 samples contain a valid strategy in 82% of episodes. That gap is what a learned distribution buys.",
          ],
          figure: {
            file: 'e1_mode_averaging_qualitative.png',
            alt: 'Pelvis top view and waist yaw over time for one episode: oracle strategies fan out, the regressor stays near zero.',
            caption:
              'One lateral episode with 36 valid strategies. The oracle fans the waist from −45° to +40°; the regressor keeps it at zero and lands between the modes.',
          },
        },
        {
          title: 'Closed loop: 85% against 74%, and earlier',
          paragraphs: [
            'On 160 held-out episodes with three seeds, in full MuJoCo dynamics under a whole-body torque controller, AMBIT succeeds in 85% of runs at the 3 cm/15° tolerance and 74% at the strict 2 cm/10° one. The reactive tracker, which runs the very same QP with a home posture as reference, reaches 74% and 51%. AMBIT recruits the body before the arms saturate in 48% of episodes against 35%.',
            'The preview is necessary. With future targets masked and everything else unchanged, success drops from 0.82 to 0.56.',
          ],
          table: {
            columns: ['Method', 'Success, mild [95% CI]', 'Strict', 'Anticipatory'],
            rows: [
              ['AMBIT (soft execution + reactive fallback)', '0.85 [0.81, 0.88]', '0.74', '48%'],
              ['AMBIT (soft execution)', '0.82 [0.79, 0.86]', '0.66', '48%'],
              ['No-preview ablation (same model, preview masked)', '0.56 [0.52, 0.61]', '0.45', '30%'],
              ['B3 per-pose generative IK + smoothing', '0.25 [0.22, 0.29]', '0.01', '8%'],
              ['B1 reactive whole-body QP tracker', '0.74 [0.71, 0.78]', '0.51', '35%'],
            ],
            caption:
              'Mild tolerance 3 cm / 15°, strict 2 cm / 10°. 160 held-out episodes × 3 seeds. Replanning every 1.0 s costs nothing; at the measured 1.5 s latency AMBIT keeps 0.81.',
          },
          figure: {
            file: 'e4_anticipation.png',
            alt: 'Distributions of anticipation margin, boundary hand error and late corrections for AMBIT, the no-preview ablation, B3 and the reactive tracker.',
            caption:
              'Anticipation margin, hand error at the saturation boundary and late corrective motion for AMBIT, the no-preview ablation, B3 and the reactive tracker.',
          },
        },
        {
          title: 'Constraints unknown at training time, handled by selection alone',
          paragraphs: [
            'At test time we impose five shifts the model never saw: a torso obstacle that caps the pelvis height, a pelvis keep-out region, a reduced waist range, a forbidden forward lean, and a 0.75 kg payload on each wrist. AMBIT handles them by filtering and verifying its samples. It beats the warm-started tracker on all five shifts, by 6 to 18 points, and is at least as good as a test-time re-optimisation baseline that costs 25 s per plan against 1.5 s.',
          ],
          table: {
            columns: ['Shift', 'AMBIT (CVAE)', 'AMBIT (flow)', 'B1 warm-started', 'B4 re-optimisation'],
            rows: [
              ['Torso obstacle', '0.86 (0.74)', '0.81 (0.72)', '0.74 (0.51)', '0.78 (0.58)'],
              ['Pelvis keep-out', '0.87 (0.75)', '0.82 (0.72)', '0.74 (0.51)', '0.78 (0.58)'],
              ['Waist range reduced', '0.87 (0.75)', '0.82 (0.72)', '0.74 (0.51)', '0.78 (0.58)'],
              ['No forward lean', '0.67 (0.58)', '0.66 (0.59)', '0.61 (0.46)', '0.67 (0.52)'],
              ['Payload 0.75 kg per wrist', '0.61 (0.55)', '0.60 (0.55)', '0.43 (0.36)', '0.58 (0.46)'],
            ],
            caption:
              'Post-selection success at the mild tolerance (strict in parentheses), 160 held-out episodes × 3 seeds; the shift is known only at test time. Sweeping the payload from 0.5 to 1.0 kg, AMBIT stays 11 to 18 points above the load-unaware tracker at every load.',
          },
        },
        {
          title: 'Same protocol, second robot: the gap widens',
          paragraphs: [
            'Re-running everything on a Unitree G1 with every hyperparameter unchanged, only the robot description differs. The valid set has the same shape (9.0 distinct strategies per solvable episode, 89% multimodal, intrinsic dimension 4.3), regression mode-averages again, and the closed-loop advantage grows from 11 to 32 points. Under the five shifts AMBIT beats the re-optimisation baseline by 20 to 25 points, where on the R1 it merely matched it.',
          ],
          figure: {
            file: 'fig_platforms.png',
            alt: 'Renders of the Unitree R1 and G1 at the instant of the largest frozen-body miss, and one valid strategy for each that reaches the targets.',
            caption:
              'One task per platform at the instant of the largest frozen-body miss (a lateral task on the R1, a traversal on the G1). Frozen body: the hands miss their targets. One valid oracle strategy brings both hands back within millimetres by moving the pelvis and, on the R1, the waist.',
          },
        },
        {
          title: 'On the physical R1',
          paragraphs: [
            'Five selected strategies for two commands were executed on the externally supported Unitree R1. They stay distinct in pelvis excursion (3.0 to 8.3 cm) and track the planned hand motion to a mean of 10 to 14 mm, measured by encoder forward kinematics. This establishes that the planned strategies are kinematically realisable on the real joints; balance was not tested.',
          ],
          table: {
            columns: ['Episode', 'Strategy', 'Pelvis excursion', 'Hand error, mean', 'p95'],
            rows: [
              ['68', '0', '4.0 cm', '10.5 mm', '14.4 mm'],
              ['68', '1', '5.4 cm', '10.3 mm', '16.3 mm'],
              ['68', '2', '3.0 cm', '10.3 mm', '15.6 mm'],
              ['399', '1', '8.3 cm', '13.1 mm', '18.4 mm'],
              ['399', '3', '6.5 cm', '13.6 mm', '24.3 mm'],
            ],
          },
          figure: {
            file: 'fig_hardware.png',
            alt: 'Measured pelvis and hand trajectories of the five hardware executions.',
            caption: 'The five hardware executions, measured by encoder forward kinematics.',
          },
        },
      ],
    },
    {
      kind: 'text',
      title: 'Limitations',
      list: [
        'Fixed flat-foot double support: no stepping, no grasping, no object contact.',
        'The hardware result is kinematic realisability on an externally supported robot; balance on the physical R1 is future work.',
        "52% of the task episodes admit no valid strategy at the mild tolerance (targets beyond a balanced body's reach); models are trained and evaluated on the solvable ones.",
        'Planning takes 1.5 s per replan with candidates verified in parallel. State drift during planning is not modelled.',
        'A preview-based whole-body MPC baseline is the missing comparison.',
      ],
    },
  ],
  bibtex: `@article{li2026ambit,
  author  = {Hanlong Li and Sihan Tan and Takeshi Ashizawa and Benjamin Yen and Kazuhiro Nakadai},
  title   = {AMBIT: Anticipatory Multimodal Body Recruitment for Bimanual Tracking on a Humanoid},
  journal = {arXiv preprint arXiv:2609.33484},
  year    = {2026},
}`,
  gaps: ['Code link, if released'],
} satisfies ProjectPage;
