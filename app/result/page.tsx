'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { InitialResult } from '@/types/test';
import ResultCard from '@/components/ResultCard';
import ShareResultCard from '@/components/ShareResultCard';
import ShareTextButton from '@/components/ShareTextButton';
import { Suspense } from 'react';
import { Camera } from 'lucide-react';

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
        <p className="text-sm text-gray-500 mb-6">
          可能是链接已失效或浏览器数据被清除。
        </p>
        <Link
          href="/test"
          className="inline-block rounded-md bg-[#1a365d] px-6 py-3 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors"
        >
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

      {/* Share Card Section */}
      <div className="mt-16">
        <div className="h-px bg-gray-200 mb-12" />

        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-[#1a365d]">生成我的识变卡片</h2>
          <p className="mt-2 text-xs text-gray-400">
            这张卡片隐藏了你的具体输入，只保留初步诊断结果，适合截图保存或分享。
          </p>
        </div>

        <ShareResultCard result={result} />

        <div className="mt-6 flex flex-col items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-md bg-[#1a365d] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors">
            <Camera size={16} />
            请长按或截图保存这张卡片
          </button>
          <ShareTextButton result={result} />
        </div>
      </div>

      {/* Bottom actions */}
      <div className="mt-12 text-center">
        <Link
          href="/test"
          className="inline-block rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600 hover:border-[#1a365d] hover:text-[#1a365d] transition-colors"
        >
          重新测试
        </Link>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="mx-auto max-w-2xl text-center py-20">
          <p className="text-sm text-gray-500">加载中...</p>
        </div>
      }>
        <ResultContent />
      </Suspense>
    </main>
  );
}
