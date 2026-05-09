export interface TestOption {
  label: string;
  value: string;
  tags: string[];
}

export interface TestQuestion {
  id: string;
  title: string;
  options: TestOption[];
}

export interface TestAnswer {
  questionId: string;
  value: string;
  tags: string[];
}

export type StuckType =
  | 'high_pressure_low_action'
  | 'capable_not_externalized'
  | 'clear_but_bound'
  | 'want_transition_low_risk'
  | 'want_monetize_unclear'
  | 'org_constrained';

export const STUCK_TYPE_LABELS: Record<StuckType, string> = {
  high_pressure_low_action: '高压低行动型',
  capable_not_externalized: '有能力但未外化型',
  clear_but_bound: '清晰但被绑定型',
  want_transition_low_risk: '想转型但风险承受低型',
  want_monetize_unclear: '想变现但目标不清型',
  org_constrained: '组织处境受限型',
};

export interface InitialResult {
  resultType: StuckType;
  title: string;
  coreConflict: string;
  notRecommended: string;
  minimalAction: string;
  ctaText: string;
}

export interface TestSession {
  id: string;
  userId: string | null;
  answersJson: TestAnswer[];
  optionalText: string;
  resultType: StuckType;
  initialResultJson: InitialResult;
  createdAt: string;
}
