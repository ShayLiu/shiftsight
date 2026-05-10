import { InitialResult } from '@/types/test';

export default function ShareResultCard({ result }: { result: InitialResult }) {
  return (
    <div className="mx-auto max-w-sm sm:max-w-md">
      <div
        className="rounded-2xl border border-gray-200 bg-gradient-to-b from-[#f8f9fb] to-white p-6 sm:p-8 shadow-sm"
        style={{ aspectRatio: '4/5' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-medium text-[#1a365d] tracking-wider">识变 ShiftSight</span>
          <span className="text-xs text-gray-400">初测结果</span>
        </div>

        <div className="h-px bg-gray-200 mb-6" />

        {/* Result Type */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-2">我的识变初测结果</p>
          <span className="inline-block rounded-md bg-[#1a365d] px-3 py-1.5 text-sm font-semibold text-white">
            {result.title}
          </span>
        </div>

        {/* Core Conflict */}
        <div className="mb-5">
          <p className="text-xs font-medium text-[#1a365d] mb-1.5">核心冲突</p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">{result.coreConflict}</p>
        </div>

        {/* Not Recommended */}
        <div className="mb-5">
          <p className="text-xs font-medium text-[#c8952e] mb-1.5">当前不建议</p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{result.notRecommended[0]}</p>
        </div>

        {/* Minimal Action */}
        <div className="mb-6">
          <p className="text-xs font-medium text-[#1a365d] mb-1.5">24 小时行动</p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{result.minimalAction}</p>
        </div>

        {/* Footer */}
        <div className="h-px bg-gray-200 mb-4" />
        <div className="text-center">
          <p className="text-xs text-gray-400">识变初测｜3 分钟识别当前行动卡点</p>
          <p className="text-xs text-gray-300 mt-1">适合博士 / 医生 / 高管 / 专业人士</p>
        </div>
      </div>
    </div>
  );
}
