import { DashboardScores } from '@/types/test';

function getConstraintLabel(score: number) {
  if (score >= 70) return { text: '偏高', color: 'text-red-600' };
  if (score >= 40) return { text: '中等', color: 'text-amber-600' };
  return { text: '较低', color: 'text-emerald-600' };
}

function getEnergyLabel(score: number) {
  if (score >= 70) return { text: '较高', color: 'text-emerald-600' };
  if (score >= 40) return { text: '中等', color: 'text-amber-600' };
  return { text: '偏低', color: 'text-red-600' };
}

function getExternLabel(score: number) {
  if (score >= 70) return { text: '较清晰', color: 'text-emerald-600' };
  if (score >= 40) return { text: '初步具备', color: 'text-amber-600' };
  return { text: '待建立', color: 'text-red-600' };
}

const ITEMS: {
  key: keyof DashboardScores;
  name: string;
  getLabel: (s: number) => { text: string; color: string };
  explain: (s: number) => string;
  barColor: string;
}[] = [
  {
    key: 'constraintIntensity',
    name: '制约强度',
    getLabel: getConstraintLabel,
    explain: (s) =>
      s >= 70
        ? '外部限制较明显，当前不适合做高风险决策。'
        : s >= 40
          ? '有一定外部限制，行动需要考虑现实约束。'
          : '外部限制较小，具备较多行动自由度。',
    barColor: 'bg-[#1a365d]',
  },
  {
    key: 'actionEnergy',
    name: '行动能量',
    getLabel: getEnergyLabel,
    explain: (s) =>
      s >= 70
        ? '具备较好的行动条件，可以开始推进。'
        : s >= 40
          ? '有一定行动能力，适合从小步骤开始。'
          : '可用能量有限，适合从极小的动作开始。',
    barColor: 'bg-[#1a365d]',
  },
  {
    key: 'valueExternalization',
    name: '价值外化度',
    getLabel: getExternLabel,
    explain: (s) =>
      s >= 70
        ? '已有能力初步转化为外部可见的形式。'
        : s >= 40
          ? '有一些外化基础，需要进一步整理和输出。'
          : '已有能力还需要被整理成作品、服务或机会。',
    barColor: 'bg-[#c8952e]',
  },
];

export default function ActionDashboard({ scores }: { scores: DashboardScores }) {
  return (
    <div className="space-y-5">
      {ITEMS.map((item) => {
        const score = scores[item.key];
        const label = item.getLabel(score);
        return (
          <div key={item.key}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-slate-800">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${label.color}`}>{label.text}</span>
                <span className="text-sm font-bold text-[#1a365d] w-7 text-right">{score}</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden mb-1.5">
              <div
                className={`h-full rounded-full ${item.barColor} transition-all duration-700`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">{item.explain(score)}</p>
          </div>
        );
      })}
    </div>
  );
}
