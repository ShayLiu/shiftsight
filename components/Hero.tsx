import Link from 'next/link';
import { Target, ShieldCheck, Footprints } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a365d] leading-snug tracking-tight">
          把模糊的不确定感，转化为可判断的行动问题。
        </h1>

        <div className="mt-8 mx-auto max-w-xl space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            识变初测通过结构化选择，帮助你区分当前困境的类型——
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['职业方向不清', '组织受限', '收入焦虑', '价值未外化', 'AI 冲击', '心理能量不足', '行动启动困难'].map((tag) => (
              <span key={tag} className="inline-block rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            并给出初步行动建议。
          </p>
        </div>

        <p className="mt-6 text-xs text-gray-400">10 个问题，约 3 分钟完成</p>

        <div className="mt-6">
          <Link
            href="/test"
            className="inline-block rounded-md bg-[#1a365d] px-8 py-3 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors"
          >
            进行初步诊断
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ebf4ff]">
            <Target size={24} className="text-[#1a365d]" />
          </div>
          <h3 className="text-base font-semibold text-[#1a365d]">看清卡点</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            定位问题的核心矛盾，而非停留在模糊焦虑。
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ebf4ff]">
            <ShieldCheck size={24} className="text-[#1a365d]" />
          </div>
          <h3 className="text-base font-semibold text-[#1a365d]">识别风险</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            区分真实风险与被放大的恐惧，避免冲动决策。
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ebf4ff]">
            <Footprints size={24} className="text-[#1a365d]" />
          </div>
          <h3 className="text-base font-semibold text-[#1a365d]">给出一步</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            一个 24 小时内可完成的最小行动，打破僵局。
          </p>
        </div>
      </div>
    </section>
  );
}
