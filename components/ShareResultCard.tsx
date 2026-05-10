import { InitialResult } from '@/types/test';

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + '…' : text;
}

function firstItem(items: string[]): string {
  return items[0] || '';
}

export default function ShareResultCard({ result }: { result: InitialResult }) {
  return (
    <div className="mx-auto w-full max-w-[390px]">
      <div className="rounded-3xl border border-slate-200 bg-[#F8F5EF] p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-semibold text-[#1a365d] tracking-wide">识变 ShiftSight</span>
          <span className="rounded-full bg-[#1a365d]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#1a365d]">初步诊断</span>
        </div>

        {/* Result Type */}
        <div className="mb-5">
          <span className="inline-block rounded-lg bg-[#1a365d] px-4 py-2 text-base font-bold text-white">
            {result.title}
          </span>
        </div>

        <div className="h-px bg-slate-300/50 mb-5" />

        {/* Core Conflict */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-[#1a365d] uppercase tracking-wider mb-1">核心冲突</p>
          <p className="text-xs text-slate-700 leading-relaxed">{truncate(result.coreConflict, 80)}</p>
        </div>

        {/* Not Recommended */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-[#c8952e] uppercase tracking-wider mb-1">当前不建议</p>
          <p className="text-xs text-slate-700 leading-relaxed">{truncate(firstItem(result.notRecommended), 60)}</p>
        </div>

        {/* Action */}
        <div className="mb-5">
          <p className="text-[10px] font-semibold text-[#1a365d] uppercase tracking-wider mb-1">24 小时行动</p>
          <p className="text-xs text-slate-700 leading-relaxed">{truncate(result.minimalAction, 70)}</p>
        </div>

        <div className="h-px bg-slate-300/50 mb-4" />

        {/* Footer */}
        <p className="text-center text-[10px] text-slate-400">
          识变初测｜3 分钟识别当前行动卡点
        </p>
      </div>
    </div>
  );
}
