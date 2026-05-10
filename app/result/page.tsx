'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { InitialResult } from '@/types/test';
import ResultCard from '@/components/ResultCard';
import ShareResultCard from '@/components/ShareResultCard';
import ShareTextButton from '@/components/ShareTextButton';
import { Suspense } from 'react';

function ResultContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [result, setResult] = useState<InitialResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const stored = sessionStorage.getItem(`test-result-${id}`);
      if (stored) {
        try {
          setResult(JSON.parse(stored));
        } catch { /* ignore */ }
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl text-center py-20">
        <p className="text-sm text-gray-500">正在加载结果...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-2xl text-center py-20">
        <h1 className="text-xl font-semibold text-[#1a365d] mb-4">未找到测试结果</h1>
        <p className="text-sm text-gray-500 mb-6">可能是链接已失效或浏览器数据被清除。</p>
        <Link href="/test" className="inline-block rounded-md bg-[#1a365d] px-6 py-3 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors">
          重新开始测试
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-[#1a365d]">你的测试结果</h1>
      </div>

      <ResultCard result={result} />

      {/* Share card */}
      <div className="mt-14">
        <div className="h-px bg-gray-200 mb-10" />
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
