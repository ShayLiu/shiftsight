import { TestAnswer, StuckType } from '@/types/test';

interface ScoreBoard {
  high_pressure: number;
  externalize: number;
  org_constrained: number;
  transition_risk: number;
  monetize: number;
  execution_block: number;
}

export function determineStuckType(answers: TestAnswer[]): StuckType {
  const scores: ScoreBoard = {
    high_pressure: 0,
    externalize: 0,
    org_constrained: 0,
    transition_risk: 0,
    monetize: 0,
    execution_block: 0,
  };

  for (const answer of answers) {
    for (const tag of answer.tags) {
      if (tag in scores) {
        scores[tag as keyof ScoreBoard]++;
      }
    }
  }

  // 交叉加权：特定组合加分
  // 高压 + 执行卡住 = 更强的高压信号
  if (scores.high_pressure >= 2 && scores.execution_block >= 2) {
    scores.high_pressure += 1;
  }
  // 外化 + 变现 = 变现方向更明确
  if (scores.externalize >= 2 && scores.monetize >= 2) {
    scores.monetize += 1;
  }
  // 组织 + 转型 = 清晰但被绑定
  if (scores.org_constrained >= 1 && scores.transition_risk >= 1) {
    scores.org_constrained += 1;
  }

  // 从用户主诉问题（q2）加强权重
  const q2 = answers.find((a) => a.questionId === 'q2');
  if (q2) {
    for (const tag of q2.tags) {
      if (tag in scores) {
        scores[tag as keyof ScoreBoard] += 1; // q2 额外加权
      }
    }
  }

  // 映射到结果类型
  const typeScores: [StuckType, number][] = [
    ['high_pressure_low_action', scores.high_pressure + scores.execution_block * 0.5],
    ['capable_not_externalized', scores.externalize],
    ['want_monetize_unclear', scores.monetize],
    ['want_transition_low_risk', scores.transition_risk],
    ['org_constrained', scores.org_constrained >= 3 ? scores.org_constrained : 0],
    ['clear_but_bound', scores.org_constrained >= 1 && scores.org_constrained < 3 ? scores.org_constrained + scores.transition_risk * 0.3 : 0],
  ];

  // 按分数排序，同分按优先级
  const priorityMap: Record<StuckType, number> = {
    high_pressure_low_action: 6,
    org_constrained: 5,
    clear_but_bound: 4,
    want_monetize_unclear: 3,
    capable_not_externalized: 2,
    want_transition_low_risk: 1,
  };

  typeScores.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return priorityMap[b[0]] - priorityMap[a[0]];
  });

  return typeScores[0][1] > 0 ? typeScores[0][0] : 'high_pressure_low_action';
}

export function getSecondaryType(answers: TestAnswer[], primaryType: StuckType): StuckType | null {
  const scores: ScoreBoard = {
    high_pressure: 0,
    externalize: 0,
    org_constrained: 0,
    transition_risk: 0,
    monetize: 0,
    execution_block: 0,
  };

  for (const answer of answers) {
    for (const tag of answer.tags) {
      if (tag in scores) scores[tag as keyof ScoreBoard]++;
    }
  }

  const tagToType: [string, StuckType][] = [
    ['high_pressure', 'high_pressure_low_action'],
    ['externalize', 'capable_not_externalized'],
    ['monetize', 'want_monetize_unclear'],
    ['transition_risk', 'want_transition_low_risk'],
    ['org_constrained', 'org_constrained'],
  ];

  let best: StuckType | null = null;
  let bestScore = 0;

  for (const [tag, type] of tagToType) {
    if (type === primaryType) continue;
    const s = scores[tag as keyof ScoreBoard];
    if (s > bestScore) {
      bestScore = s;
      best = type;
    }
  }

  return bestScore >= 2 ? best : null;
}
