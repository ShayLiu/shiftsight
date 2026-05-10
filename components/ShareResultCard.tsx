import { InitialResult } from '@/types/test';

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + '…' : text;
}

export default function ShareResultCard({ result }: { result: InitialResult }) {
  const { actionPosition, constraintScores } = result;
  const x = actionPosition.externalConstraintScore;
  const y = 100 - actionPosition.actionEnergyScore;
  const top3 = constraintScores.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-[390px]">
      <div className="rounded-3xl border border-slate-200 bg-[#F8F5EF] px-6 py-7 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-semibold text-[#1a365d] tracking-wide">识变 ShiftSight</span>
          <span className="rounded-full bg-[#1a365d]/10 px-2 py-0.5 text-[10px] font-medium text-[#1a365d]">初步诊断</span>
        </div>

        <p className="text-base font-bold text-[#1a365d] mb-4">我的行动坐标</p>

        {/* Mini coordinate map */}
        <div className="relative w-full aspect-square max-w-[200px] mx-auto border border-slate-300/60 rounded-lg bg-white/60 mb-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200" />
          <div className="absolute top-1.5 left-2 text-[8px] text-slate-400">探索</div>
          <div className="absolute top-1.5 right-2 text-[8px] text-slate-400">试验</div>
          <div className="absolute bottom-1.5 left-2 text-[8px] text-slate-400">恢复</div>
          <div className="absolute bottom-1.5 right-2 text-[8px] text-slate-400">稳定</div>
          <div
            className="absolute w-3 h-3 rounded-full bg-[#1a365d] shadow-sm -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        </div>

        <div className="text-center mb-4">
          <span className="inline-block rounded-md bg-[#1a365d] px-3 py-1 text-xs font-semibold text-white">
            {actionPosition.quadrant}
          </span>
        </div>

        <div className="h-px bg-slate-300/40 mb-4" />

        {/* Top 3 constraints */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">主要制约</p>
          <div className="space-y-1.5">
            {top3.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <span className="text-xs text-slate-700">{c.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-[#1a365d]" style={{ width: `${c.score}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500 w-5 text-right">{c.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-300/40 mb-3" />

        {/* Type + action */}
        <div className="mb-3">
          <p className="text-[10px] text-slate-500 mb-0.5">当前类型</p>
          <p className="text-xs font-medium text-slate-800">{result.title}</p>
        </div>
        <div className="mb-4">
          <p className="text-[10px] text-[#c8952e] mb-0.5">24 小时行动</p>
          <p className="text-[11px] text-slate-700 leading-relaxed">{truncate(result.minimalAction, 60)}</p>
        </div>

        <div className="h-px bg-slate-300/40 mb-3" />
        <p className="text-center text-[10px] text-slate-400">识变初测｜3 分钟识别行动制约点</p>
      </div>
    </div>
  );
}
