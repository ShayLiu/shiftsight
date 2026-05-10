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
  label: string;
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
  identity: string;
  summary: string;
  coreConflict: string;
  realRisk: string;
  amplifiedFear: string;
  keyVariables: string[];
  notRecommended: string[];
  minimalAction: string;
  sevenDayExperiment: string;
  reflectionQuestions: string[];
  actionPosition: ActionPosition;
  constraintScores: ConstraintScore[];
  dashboardScores: DashboardScores;
}

export type Quadrant = '主动探索区' | '低风险试验区' | '恢复启动区' | '先稳定再行动区';

export interface ActionPosition {
  externalConstraintScore: number;
  actionEnergyScore: number;
  quadrant: Quadrant;
  explanation: string;
}

export interface DashboardScores {
  constraintIntensity: number;
  actionEnergy: number;
  valueExternalization: number;
}

export interface ConstraintScore {
  name: string;
  score: number;
  explanation: string;
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
