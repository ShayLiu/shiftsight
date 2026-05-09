import { TestAnswer, StuckType } from '@/types/test';

export function determineStuckType(answers: TestAnswer[]): StuckType {
  const tagCounts: Record<string, number> = {
    high_pressure: 0,
    externalize: 0,
    org_constrained: 0,
    transition_risk: 0,
    monetize: 0,
    execution_block: 0,
  };

  for (const answer of answers) {
    for (const tag of answer.tags) {
      if (tag in tagCounts) {
        tagCounts[tag]++;
      }
    }
  }

  // Map tags to stuck types with scoring
  const typeScores: Record<StuckType, number> = {
    high_pressure_low_action: tagCounts.high_pressure,
    capable_not_externalized: tagCounts.externalize,
    clear_but_bound: 0,
    want_transition_low_risk: tagCounts.transition_risk,
    want_monetize_unclear: tagCounts.monetize,
    org_constrained: 0,
  };

  // org_constrained tag splits into two types based on score
  if (tagCounts.org_constrained >= 3) {
    typeScores.org_constrained = tagCounts.org_constrained;
  } else if (tagCounts.org_constrained >= 1) {
    typeScores.clear_but_bound = tagCounts.org_constrained;
  }

  // Priority order for ties
  const priorityOrder: StuckType[] = [
    'high_pressure_low_action',
    'org_constrained',
    'clear_but_bound',
    'want_monetize_unclear',
    'capable_not_externalized',
    'want_transition_low_risk',
  ];

  let maxScore = 0;
  let result: StuckType = 'high_pressure_low_action';

  for (const type of priorityOrder) {
    if (typeScores[type] > maxScore) {
      maxScore = typeScores[type];
      result = type;
    }
  }

  return result;
}
