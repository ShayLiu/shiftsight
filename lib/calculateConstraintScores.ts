import { TestAnswer, ConstraintScore } from '@/types/test';

interface RawScores {
  career: number;
  income: number;
  org: number;
  ai: number;
  externalize: number;
  energy: number;
  execution: number;
}

const VALUE_TO_DIMENSIONS: Record<string, (keyof RawScores)[]> = {
  // q2
  pressure_stay: ['energy', 'career'],
  side_start: ['execution', 'externalize'],
  invisible: ['externalize'],
  transition_fear: ['career'],
  org_stuck: ['org'],
  too_many: ['energy', 'execution'],
  no_fulfillment: ['externalize', 'career'],
  ai_anxiety: ['ai'],
  // q3
  comparison: ['energy'],
  conflict: ['org', 'energy'],
  income_drop: ['income'],
  burnout: ['energy'],
  opportunity: ['career'],
  accumulation: ['org', 'energy'],
  industry_change: ['ai', 'org'],
  // q4
  health_risk: ['energy'],
  miss_timing: ['career'],
  org_drain: ['org'],
  income_passive: ['income'],
  skill_decay: ['externalize', 'ai'],
  self_doubt: ['execution', 'energy'],
  family_impact: ['income', 'energy'],
  // q5
  overthink: ['energy', 'execution'],
  preparing: ['externalize', 'execution'],
  bound: ['org'],
  ineffective: ['externalize'],
  scattered: ['execution', 'energy'],
  waiting: ['execution'],
  exhausted: ['energy'],
  // q6
  income_loss: ['income'],
  identity_loss: ['career', 'org'],
  wasted_effort: ['execution'],
  social_pressure: ['career'],
  family_stability: ['income'],
  org_position: ['org'],
  psychological: ['energy'],
  // q8
  expertise: ['externalize'],
  network: ['externalize'],
  platform: ['org'],
  credentials: ['externalize'],
  management: ['externalize'],
  thinking: ['externalize'],
  communication: ['externalize'],
  unclear: ['execution'],
  // q9
  clarity: ['career', 'execution'],
  first_step: ['execution'],
  risk_assessment: ['career'],
  monetize_path: ['income', 'externalize'],
  org_strategy: ['org'],
  anxiety_reduce: ['energy'],
  validate: ['career', 'externalize'],
  // q10
  experiment: ['execution'],
  inventory: ['externalize'],
  benchmark: ['career'],
  consult_action: ['energy'],
  org_fix: ['org'],
  express: ['externalize', 'execution'],
  rest: ['energy'],
};

const DIMENSION_NAMES: Record<keyof RawScores, string> = {
  career: '职业方向',
  income: '收入安全',
  org: '组织处境',
  ai: 'AI 冲击',
  externalize: '价值外化',
  energy: '心理能量',
  execution: '行动启动',
};

const DIMENSION_EXPLANATIONS: Record<keyof RawScores, string> = {
  career: '你对职业发展方向存在困惑或纠结，不确定当前路径是否值得继续。',
  income: '收入的稳定性或增长预期是你当前的重要顾虑，影响了你的行动自由度。',
  org: '你在组织中受到评价体系、权力关系或资源分配的限制，缺少话语权和选择权。',
  ai: '技术变化带来的不确定性正在影响你对自身专业价值的判断。',
  externalize: '你的能力主要停留在组织或学历体系内部，尚未转化为外部可识别的价值。',
  energy: '心理消耗、精力透支或持续压力正在削弱你的判断力和行动力。',
  execution: '你不缺方向或想法，但在"开始做"这一步上遇到了持续的阻力。',
};

export function calculateConstraintScores(answers: TestAnswer[]): ConstraintScore[] {
  const raw: RawScores = { career: 0, income: 0, org: 0, ai: 0, externalize: 0, energy: 0, execution: 0 };

  for (const a of answers) {
    const dims = VALUE_TO_DIMENSIONS[a.value];
    if (dims) {
      for (const d of dims) {
        raw[d] += 14;
      }
    }
  }

  const scores: ConstraintScore[] = (Object.keys(raw) as (keyof RawScores)[]).map((key) => ({
    name: DIMENSION_NAMES[key],
    score: Math.min(100, Math.max(0, raw[key])),
    explanation: DIMENSION_EXPLANATIONS[key],
  }));

  scores.sort((a, b) => b.score - a.score);
  return scores;
}
