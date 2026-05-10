import { TestAnswer, DashboardScores } from '@/types/test';

const CONSTRAINT_VALUES = new Set([
  'pressure_stay', 'org_stuck', 'ai_anxiety',
  'income_drop', 'conflict', 'accumulation', 'industry_change',
  'health_risk', 'org_drain', 'income_passive', 'family_impact',
  'bound', 'income_loss', 'identity_loss', 'family_stability',
  'org_position', 'psychological',
]);

const ENERGY_BOOST = new Set([
  '1_2h', '3_5h', '5_10h', '10h_plus',
  'experiment', 'express', 'consult',
  'inventory', 'benchmark', 'first_step',
]);

const ENERGY_DRAIN = new Set([
  'exhausted', 'burnout', 'overthink', 'scattered',
  'none', 'rest', 'anxiety_reduce',
  'psychological', 'wasted_effort', 'waiting',
]);

const EXTERN_HIGH = new Set([
  'communication', 'expertise', 'network', 'thinking',
  'management', 'credentials',
  'express', 'inventory', 'experiment',
  'benchmark', 'consult',
]);

const EXTERN_LOW = new Set([
  'invisible', 'unclear', 'preparing',
  'side_start', 'monetize_path',
]);

export function calculateDashboardScores(answers: TestAnswer[]): DashboardScores {
  let constraint = 0;
  let energy = 0;
  let externalize = 0;

  for (const a of answers) {
    if (CONSTRAINT_VALUES.has(a.value)) constraint += 12;
    if (ENERGY_BOOST.has(a.value)) energy += 14;
    if (ENERGY_DRAIN.has(a.value)) energy -= 10;
    if (EXTERN_HIGH.has(a.value)) externalize += 14;
    if (EXTERN_LOW.has(a.value)) externalize -= 8;
  }

  return {
    constraintIntensity: Math.max(0, Math.min(100, 25 + constraint)),
    actionEnergy: Math.max(0, Math.min(100, 45 + energy)),
    valueExternalization: Math.max(0, Math.min(100, 40 + externalize)),
  };
}
