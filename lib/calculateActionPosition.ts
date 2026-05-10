import { TestAnswer, ActionPosition, Quadrant } from '@/types/test';

const CONSTRAINT_BOOSTERS = new Set([
  'pressure_stay', 'org_stuck', 'ai_anxiety',
  'income_drop', 'conflict', 'accumulation', 'industry_change',
  'health_risk', 'org_drain', 'income_passive', 'family_impact',
  'bound', 'income_loss', 'identity_loss', 'family_stability',
  'org_position', 'org_strategy', 'org_fix',
]);

const ENERGY_BOOSTERS = new Set([
  'side_start', 'too_many', 'experiment', 'inventory',
  'benchmark', 'express', 'consult',
  '3_5h', '5_10h', '10h_plus',
  'first_step', 'monetize_path', 'validate',
]);

const ENERGY_REDUCERS = new Set([
  'overthink', 'exhausted', 'scattered',
  'burnout', 'psychological', 'wasted_effort',
  'none', 'rest', 'anxiety_reduce',
  'preparing', 'waiting',
]);

export function calculateActionPosition(answers: TestAnswer[]): ActionPosition {
  let constraintRaw = 0;
  let energyRaw = 0;
  let constraintCount = 0;
  let energyBoostCount = 0;
  let energyReduceCount = 0;

  for (const a of answers) {
    if (CONSTRAINT_BOOSTERS.has(a.value)) {
      constraintRaw += 15;
      constraintCount++;
    }
    if (ENERGY_BOOSTERS.has(a.value)) {
      energyRaw += 15;
      energyBoostCount++;
    }
    if (ENERGY_REDUCERS.has(a.value)) {
      energyRaw -= 12;
      energyReduceCount++;
    }
  }

  // Time answer special handling
  const q7 = answers.find((a) => a.questionId === 'q7');
  if (q7) {
    if (q7.value === '1_2h') energyRaw += 5;
    if (q7.value === '3_5h') energyRaw += 12;
    if (q7.value === '5_10h') energyRaw += 18;
    if (q7.value === '10h_plus') energyRaw += 22;
    if (q7.value === 'none') constraintRaw += 10;
  }

  const externalConstraintScore = Math.max(0, Math.min(100, 30 + constraintRaw));
  const actionEnergyScore = Math.max(0, Math.min(100, 50 + energyRaw));

  let quadrant: Quadrant;
  let explanation: string;

  if (externalConstraintScore < 50 && actionEnergyScore >= 50) {
    quadrant = '主动探索区';
    explanation = '你具备较好的行动条件，外部约束相对较低。可以更主动地测试新方向、外部机会或第二曲线。';
  } else if (externalConstraintScore >= 50 && actionEnergyScore >= 50) {
    quadrant = '低风险试验区';
    explanation = '你有行动能力，但外部约束明显。当前适合保留主业安全，同时启动一个低风险的外部验证。';
  } else if (externalConstraintScore < 50 && actionEnergyScore < 50) {
    quadrant = '恢复启动区';
    explanation = '外部约束不是最大问题，真正限制你的是行动能量不足。现在不需要大计划，先恢复节奏、完成一个小动作。';
  } else {
    quadrant = '先稳定再行动区';
    explanation = '外部约束较强，同时可用行动能量偏低。当前不适合激进转型，更适合先降低压力、缩小问题、做一个非常小的动作。';
  }

  return { externalConstraintScore, actionEnergyScore, quadrant, explanation };
}
