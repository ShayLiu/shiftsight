import Link from 'next/link';
import Hero from '@/components/Hero';
import { Users, GraduationCap, Briefcase, Stethoscope, Lightbulb, Rocket, BookOpen } from 'lucide-react';

const AUDIENCES = [
  { label: '博士/博士生', icon: GraduationCap, desc: '面临学术与产业选择、毕业焦虑' },
  { label: '高管/中层管理者', icon: Briefcase, desc: '组织政治、职业天花板、转型困惑' },
  { label: '医生', icon: Stethoscope, desc: '高压执业、体制内外选择' },
  { label: '咨询顾问', icon: Lightbulb, desc: '甲方依赖、独立执业路径不清' },
  { label: '创业者', icon: Rocket, desc: '方向验证、资源有限、多重身份压力' },
  { label: '高学历职场人', icon: BookOpen, desc: '能力与岗位错配、价值感缺失' },
];

const EXAMPLE_QUESTIONS = [
  '工作压力大到影响健康，但不知道该不该换？',
  '想做副业或自由职业，但不知道从哪里开始？',
  '在组织里感觉受限，但又不敢离开？',
  'AI 发展太快，担心自己被替代？',
  '有很多想法，但总是无法落地执行？',
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <Hero />

      {/* Audience section */}
      <section id="audience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Users size={20} className="text-[#1a365d]" />
              <span className="text-sm font-medium text-[#1a365d]">适合人群</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1a365d]">
              为高知高能人群设计
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUDIENCES.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-gray-200 p-5 hover:border-[#1a365d]/30 transition-colors"
              >
                <item.icon size={20} className="text-[#1a365d] mb-3" />
                <h3 className="text-sm font-semibold text-gray-900">{item.label}</h3>
                <p className="mt-1 text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example questions / About section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#1a365d]">
              这些问题你是否也遇到过？
            </h2>
            <p className="mt-3 text-sm text-gray-500">
              识变初测帮你在 3 分钟内定位核心矛盾，给出第一步行动建议。
            </p>
          </div>
          <div className="space-y-4">
            {EXAMPLE_QUESTIONS.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4"
              >
                <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#ebf4ff] text-xs font-semibold text-[#1a365d]">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-700">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-4">
            准备好了吗？
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            10 个问题，约 3 分钟完成。
          </p>
          <Link
            href="/test"
            className="inline-block rounded-md bg-[#1a365d] px-8 py-3 text-base font-medium text-white hover:bg-[#2a4a7f] transition-colors"
          >
            免费开始测试
          </Link>
        </div>
      </section>
    </main>
  );
}
