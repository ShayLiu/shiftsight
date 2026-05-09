import { InitialResult } from '@/types/test';
import { AlertTriangle, Zap, Target } from 'lucide-react';

interface ResultCardProps {
  result: InitialResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="space-y-6">
      {/* Type badge */}
      <div className="text-center">
        <span className="inline-block rounded-full bg-[#ebf4ff] px-4 py-1.5 text-sm font-semibold text-[#1a365d]">
          {result.title}
        </span>
      </div>

      {/* Core conflict */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Target size={20} className="text-[#1a365d]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#1a365d] mb-2">核心冲突</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{result.coreConflict}</p>
          </div>
        </div>
      </div>

      {/* Not recommended */}
      <div className="rounded-lg border border-amber-200 bg-[#fef3c7] p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <AlertTriangle size={20} className="text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-amber-800 mb-2">当前不建议做的事</h3>
            <p className="text-sm text-amber-900 leading-relaxed">{result.notRecommended}</p>
          </div>
        </div>
      </div>

      {/* Minimal action */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Zap size={20} className="text-[#1a365d]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#1a365d] mb-2">24 小时最小行动</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{result.minimalAction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
