'use client';

import { useState } from 'react';
import { Download, Check, Loader2 } from 'lucide-react';

export default function SaveImageButton({ targetId }: { targetId: string }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');

  const handleSave = async () => {
    setStatus('saving');
    try {
      const { toPng } = await import('html-to-image');
      const node = document.getElementById(targetId);
      if (!node) return;

      const dataUrl = await toPng(node, {
        pixelRatio: 3,
        backgroundColor: '#F8F5EF',
      });

      const link = document.createElement('a');
      link.download = 'shiftsight-result.png';
      link.href = dataUrl;
      link.click();

      setStatus('done');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('idle');
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={status === 'saving'}
      className="inline-flex items-center gap-1.5 rounded-md bg-[#1a365d] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors disabled:opacity-60"
    >
      {status === 'saving' ? <Loader2 size={16} className="animate-spin" /> : status === 'done' ? <Check size={16} /> : <Download size={16} />}
      {status === 'saving' ? '生成中...' : status === 'done' ? '已保存' : '保存为图片'}
    </button>
  );
}
