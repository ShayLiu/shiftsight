'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { InitialResult } from '@/types/test';
import ActionDashboard from '@/components/ActionDashboard';
import TopConstraintList from '@/components/TopConstraintList';
import ShareResultCard from '@/components/ShareResultCard';
import ShareTextButton from '@/components/ShareTextButton';
import { AlertTriangle, Zap, Target } from 'lucide-react';

function ResultContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [result, setResult] = useState<InitialResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const stored = sessionStorage.getItem(`test-result-${id}`);
      if (stored) {
        try { setResult(JSON.parse(stored)); } catch { /* */ }
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="mx-auto max-w-2xl text-center py-20"><p className="text-sm text-gray-500">正在加载...</p></div>;
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-2xl text-center py-20">
        <h1 className="text-xl font-semibold text-[#1a365d] mb-4">未找到测试结果</h1>
        <p className="text-sm text-gray-500 mb-6">可能是链接已失效或浏览器数据被清除。</p>
        <Link href="/test" className="inline-block rounded-md bg-[#1a365d] px-6 py-3 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors">重新开始测试</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* 1. Status Card */}
      <div className="text-center mb-3">
        <p className="text-xs text-gray-400 mb-3">你的初步诊断</p>
        <span className="inline-block rounded-full bg-[#ebf4ff] px-5 py-2 text-base font-bold text-[#1a365d]">
          {result.title}
        </span>
      </div>
      <div className="rounded-xl border border-[#1a365d]/15 bg-[#1a365d]/5 p-5 mb-10">
        <div className="flex items-start gap-2">
          <Target size={16} className="text-[#1a365d] shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 leading-relaxed">{result.coreConflict}</p>
        </div>
      </div>

      {/* 2. Dashboard */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-8">
        <h2 className="text-sm font-semibold text-[#1a365d] mb-5">行动制约仪表盘</h2>
        <ActionDashboard scores={result.dashboardScores} />
      </div>

      {/* 3. Top 3 Constraints */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-8">
        <h2 className="text-sm font-semibold text-[#1a365d] mb-5">当前最主要的制约因素</h2>
        <TopConstraintList scores={result.constraintScores} />
      </div>

      {/* 4. Not Recommended */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} className="text-amber-600" />
          <h2 className="text-sm font-semibold text-amber-800">当前不建议做的事</h2>
        </div>
        <ul className="space-y-2">
          {result.notRecommended.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-amber-900">
              <span className="text-amber-500 mt-0.5 shrink-0">✕</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. 24h Action */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} className="text-emerald-600" />
          <h2 className="text-sm font-semibold text-emerald-800">24 小时最小行动</h2>
        </div>
        <p className="text-xs text-slate-800 leading-relaxed">{result.minimalAction}</p>
      </div>

      {/* 6. Share Card */}
      <div className="mt-14">
        <div className="h-px bg-gray-200 mb-8" />
        <p className="text-center text-xs text-gray-400 mb-6">识变结果卡 · 已隐藏你的具体输入</p>
        <ShareResultCard result={result} />
        <div className="mt-4 flex flex-col items-center gap-2">
          <ShareTextButton result={result} />
          <p className="text-[10px] text-gray-300">可直接截图保存这张卡片</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/test" className="inline-block rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600 hover:border-[#1a365d] hover:text-[#1a365d] transition-colors">
          重新测试
        </Link>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="mx-auto max-w-2xl text-center py-20"><p className="text-sm text-gray-500">加载中...</p></div>}>
        <ResultContent />
      </Suspense>
    </main>
  );
}
