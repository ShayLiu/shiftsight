import { InitialResult } from '@/types/test';

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + '…' : text;
}

function constraintLabel(s: number) { return s >= 70 ? '偏高' : s >= 40 ? '中等' : '较低'; }
function energyLabel(s: number) { return s >= 70 ? '较高' : s >= 40 ? '中等' : '偏低'; }
function externLabel(s: number) { return s >= 70 ? '较清晰' : s >= 40 ? '初步具备' : '待建立'; }

function MiniBar({ score, color }: { score: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full bg-slate-200/80 overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
    </div>
  );
}

export default function ShareResultCard({ result }: { result: InitialResult }) {
  const { dashboardScores, constraintScores } = result;
  const top3 = constraintScores.slice(0, 3);

  const gauges = [
    { name: '制约强度', score: dashboardScores.constraintIntensity, label: constraintLabel(dashboardScores.constraintIntensity), color: 'bg-[#1a365d]' },
    { name: '行动能量', score: dashboardScores.actionEnergy, label: energyLabel(dashboardScores.actionEnergy), color: 'bg-[#1a365d]' },
    { name: '价值外化度', score: dashboardScores.valueExternalization, label: externLabel(dashboardScores.valueExternalization), color: 'bg-[#c8952e]' },
  ];

  return (
    <div className="mx-auto w-full max-w-[390px]" id="share-card">
      <div className="rounded-3xl border border-slate-200 bg-[#F8F5EF] px-6 py-7 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] font-semibold text-[#1a365d] tracking-wide">识变 ShiftSight</span>
          <span className="rounded-full bg-[#1a365d]/10 px-2 py-0.5 text-[10px] font-medium text-[#1a365d]">初步诊断</span>
        </div>

        <p className="text-sm font-bold text-[#1a365d] mb-1">我的行动制约仪表盘</p>
        <p className="text-xs text-slate-500 mb-5">{result.title}</p>

        {/* Gauges */}
        <div className="space-y-3 mb-5">
          {gauges.map((g) => (
            <div key={g.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-slate-700">{g.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500">{g.label}</span>
                  <span className="text-[11px] font-bold text-[#1a365d]">{g.score}</span>
                </div>
              </div>
              <MiniBar score={g.score} color={g.color} />
            </div>
          ))}
        </div>

        <div className="h-px bg-slate-300/40 mb-4" />

        {/* Top constraints */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">主要制约</p>
          <p className="text-xs text-slate-700">
            {top3.map((c) => c.name).join(' / ')}
          </p>
        </div>

        {/* Action */}
        <div className="mb-5">
          <p className="text-[10px] font-semibold text-[#c8952e] uppercase tracking-wider mb-1">24 小时行动</p>
          <p className="text-[11px] text-slate-700 leading-relaxed">{truncate(result.minimalAction, 55)}</p>
        </div>

        <div className="h-px bg-slate-300/40 mb-3" />
        <p className="text-center text-[10px] text-slate-400">看清处境，找到下一步</p>
      </div>
    </div>
  );
}
