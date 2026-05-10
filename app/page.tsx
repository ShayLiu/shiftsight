import Link from 'next/link';
import Hero from '@/components/Hero';
import { ArrowRight } from 'lucide-react';

const AUDIENCES = ['博士/博士生', '高管/管理者', '医生', '咨询顾问', '创业者', '高学历职场人'];

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
      <Hero />

      {/* Audience - compact */}
      <section id="audience" className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs text-gray-400 mb-3">适合人群</p>
          <div className="flex flex-wrap justify-center gap-2">
            {AUDIENCES.map((a) => (
              <span key={a} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Example questions */}
      <section id="about" className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-lg font-semibold text-[#1a365d] text-center mb-8">
            这些问题你是否也遇到过？
          </h2>
          <div className="space-y-3">
            {EXAMPLE_QUESTIONS.map((q, i) => (
              <Link key={i} href={`/test`} className="flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 hover:border-[#1a365d]/30 transition-colors group">
                <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#ebf4ff] text-[10px] font-semibold text-[#1a365d]">{i + 1}</span>
                <p className="text-sm text-gray-700 group-hover:text-[#1a365d] transition-colors flex-1">{q}</p>
                <ArrowRight size={14} className="text-gray-300 group-hover:text-[#1a365d] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-gray-500 mb-5">10 个问题，约 3 分钟完成</p>
          <Link href="/test" className="inline-block rounded-md bg-[#1a365d] px-8 py-3 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors">
            进行初步诊断
          </Link>
        </div>
      </section>
    </main>
  );
}
