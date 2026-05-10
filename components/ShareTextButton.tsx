'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { InitialResult } from '@/types/test';

export default function ShareTextButton({ result }: { result: InitialResult }) {
  const [copied, setCopied] = useState(false);

  const text = `我做了一个「识变初测」。

结果是：${result.title}。

它说我当前的核心冲突是：
${result.coreConflict}

给我的 24 小时行动是：
${result.minimalAction}

适合正在考虑转型、副业、个人品牌，但又不想冲动决策的人。`;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-600 hover:border-[#1a365d] hover:text-[#1a365d] transition-colors"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      {copied ? '已复制' : '复制分享文案'}
    </button>
  );
}
