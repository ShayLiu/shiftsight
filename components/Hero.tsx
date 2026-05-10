import Link from 'next/link';
import { Target, ShieldCheck, Footprints } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] leading-tight tracking-tight">
          识变
        </h1>
        <p className="mt-6 text-base text-gray-500 max-w-md mx-auto">
          3 分钟，看清你卡在哪里。
        </p>
        <div className="mt-10">
          <Link
            href="/test"
            className="inline-block rounded-md bg-[#1a365d] px-8 py-3 text-base font-medium text-white hover:bg-[#2a4a7f] transition-colors"
          >
            免费开始测试
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
