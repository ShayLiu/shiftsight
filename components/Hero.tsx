import Link from 'next/link';
import { ArrowRight, Target, ShieldCheck, Footprints } from 'lucide-react';

const TAGS = ['职业方向不清', '组织受限', '收入焦虑', '价值未外化', 'AI 冲击', '心理能量不足', '行动启动困难'];

export default function Hero() {
  return (
    <section className="pt-20 pb-10 sm:pt-28 sm:pb-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs text-gray-400 tracking-widest mb-6">在不确定中，看清下一步的秩序。</p>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a365d] leading-snug tracking-tight">
          面对复杂选择，先把处境看清。
        </h1>

        <p className="mt-8 text-sm text-gray-500 leading-relaxed max-w-lg mx-auto">
          识变 ShiftSight 通过 10 个结构化问题，帮助您梳理职业、收入、组织、AI 变化、价值外化与行动能量之间的关系，把模糊的不确定转化为一个更稳妥的低风险行动。
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {TAGS.map((tag) => (
            <span key={tag} className="rounded-full bg-[#ebf4ff] px-3 py-1 text-xs font-medium text-[#1a365d]">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
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

      <div className="mx-auto max-w-md mt-16 grid grid-cols-3 gap-6">
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
    </section>
  );
}
