import Link from 'next/link';
import { ArrowRight, Target, ShieldCheck, Footprints } from 'lucide-react';

const TAGS = ['职业方向不清', '组织受限', '收入焦虑', '价值未外化', 'AI 冲击', '心理能量不足', '行动启动困难'];

export default function Hero() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Main card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-12 shadow-sm">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a365d] leading-snug tracking-tight text-center">
            把模糊的不确定感，<br className="sm:hidden" />转化为可判断的行动问题。
          </h1>

          {/* Divider */}
          <div className="mx-auto w-12 h-px bg-[#1a365d]/20 my-6 sm:my-8" />

          {/* Description */}
          <p className="text-center text-sm text-gray-500 leading-relaxed max-w-lg mx-auto">
            识变初测通过结构化选择，帮助你区分当前困境的类型，并给出初步行动建议。
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#ebf4ff] px-3 py-1 text-xs font-medium text-[#1a365d]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA area */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
            <Link
              href="/test"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-8 py-3.5 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors"
            >
              进行初步诊断
              <ArrowRight size={16} />
            </Link>
            <span className="text-xs text-gray-400">10 个问题 · 约 3 分钟</span>
          </div>
        </div>

        {/* Three value points */}
        <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Target, title: '看清卡点', desc: '定位核心矛盾' },
            { icon: ShieldCheck, title: '识别风险', desc: '区分真实与放大' },
            { icon: Footprints, title: '给出一步', desc: '24h 可完成行动' },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#ebf4ff]">
                <item.icon size={18} className="text-[#1a365d]" />
              </div>
              <p className="text-xs font-semibold text-[#1a365d]">{item.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
