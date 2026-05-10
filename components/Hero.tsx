import Link from 'next/link';
import { Target, ShieldCheck, Footprints } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a365d] leading-tight tracking-tight">
          把模糊的不确定感，<br className="hidden sm:inline" />转化为可判断的行动问题。
        </h1>
        <p className="mt-6 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          识变初测通过结构化选择，帮助你区分自己当前更接近职业方向不清、组织受限、收入焦虑、价值未外化、AI 冲击、心理能量不足，还是行动启动困难，并给出初步行动建议。
        </p>
        <p className="mt-3 text-xs text-gray-400">10 个问题，约 3 分钟完成。</p>
        <div className="mt-8">
          <Link
            href="/test"
            className="inline-block rounded-md bg-[#1a365d] px-8 py-3 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors"
          >
            进行初步诊断
          </Link>
        </div>
      </div>

      {/* Three value cards */}
      <div className="mx-auto max-w-4xl mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ebf4ff]">
            <Target size={24} className="text-[#1a365d]" />
          </div>
          <h3 className="text-base font-semibold text-[#1a365d]">看清卡点</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            不是你缺少信息，而是没有精准定位到问题的核心矛盾。
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ebf4ff]">
            <ShieldCheck size={24} className="text-[#1a365d]" />
          </div>
          <h3 className="text-base font-semibold text-[#1a365d]">避免冲动</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            在情绪高压下做重大决定，往往会后悔。先冷静拆解。
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ebf4ff]">
            <Footprints size={24} className="text-[#1a365d]" />
          </div>
          <h3 className="text-base font-semibold text-[#1a365d]">找到一步</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            不需要完美计划，只需要一个最小行动，打破僵局。
          </p>
        </div>
      </div>
    </section>
  );
}
