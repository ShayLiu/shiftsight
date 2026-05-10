import { ConstraintScore } from '@/types/test';

export default function TopConstraintList({ scores }: { scores: ConstraintScore[] }) {
  const top3 = scores.slice(0, 3);

  return (
    <div className="space-y-4">
      {top3.map((item, i) => (
        <div key={item.name}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#1a365d]">{i + 1}.</span>
              <span className="text-sm font-medium text-slate-800">{item.name}</span>
            </div>
            <span className="text-xs font-semibold text-[#1a365d]">{item.score}</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mb-1.5">
            <div
              className="h-full rounded-full bg-[#1a365d] transition-all duration-500"
              style={{ width: `${item.score}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{item.explanation}</p>
        </div>
      ))}
    </div>
  );
}
