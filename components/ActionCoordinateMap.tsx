import { ActionPosition } from '@/types/test';

export default function ActionCoordinateMap({ position }: { position: ActionPosition }) {
  const x = position.externalConstraintScore;
  const y = 100 - position.actionEnergyScore;

  return (
    <div className="mx-auto max-w-sm">
      {/* Coordinate chart */}
      <div className="relative w-full aspect-square border border-slate-200 rounded-xl bg-white overflow-hidden">
        {/* Grid lines */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200" />

        {/* Quadrant labels */}
        <div className="absolute top-3 left-3 text-[10px] text-slate-400 leading-tight">
          主动探索区
        </div>
        <div className="absolute top-3 right-3 text-[10px] text-slate-400 leading-tight text-right">
          低风险试验区
        </div>
        <div className="absolute bottom-3 left-3 text-[10px] text-slate-400 leading-tight">
          恢复启动区
        </div>
        <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 leading-tight text-right">
          先稳定再行动
        </div>

        {/* Position dot */}
        <div
          className="absolute w-4 h-4 rounded-full bg-[#1a365d] shadow-md shadow-[#1a365d]/30 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
        <div
          className="absolute w-8 h-8 rounded-full bg-[#1a365d]/10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      </div>

      {/* Axis labels */}
      <div className="flex justify-between mt-2 text-[10px] text-slate-400">
        <span>← 低约束</span>
        <span className="font-medium text-slate-500">外部约束强度</span>
        <span>高约束 →</span>
      </div>
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-400 hidden" />

      {/* Result */}
      <div className="mt-5 text-center">
        <span className="inline-block rounded-lg bg-[#1a365d] px-4 py-1.5 text-sm font-semibold text-white">
          {position.quadrant}
        </span>
        <p className="mt-3 text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
          {position.explanation}
        </p>
      </div>
    </div>
  );
}
