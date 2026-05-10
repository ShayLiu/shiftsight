'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

const ACCURACY_OPTIONS = ['很准', '基本准', '一般', '不太准', '完全不准'];
const ADVICE_OPTIONS = ['职业选择', '副业 / 第二收入', '个人品牌', 'AI 能力提升', '组织处境', '情绪与行动启动', '不确定，想先有人帮我拆问题'];
const WILLINGNESS_OPTIONS = ['愿意参与内测', '想先看看示例', '暂时不需要'];

export default function FeedbackForm({ testSessionId, resultType }: { testSessionId: string; resultType: string }) {
  const [accuracy, setAccuracy] = useState('');
  const [advice, setAdvice] = useState('');
  const [mismatch, setMismatch] = useState('');
  const [willingness, setWillingness] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  const handleSubmit = async () => {
    if (!accuracy) return;
    setStatus('submitting');

    try {
      await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testSessionId,
          resultType,
          accuracyRating: accuracy,
          desiredAdvice: advice,
          mismatchText: mismatch,
          willingness,
          contact,
        }),
      });
      setStatus('done');
    } catch {
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <Check size={24} className="text-emerald-500 mx-auto mb-3" />
        <p className="text-sm font-medium text-[#1a365d]">已收到，谢谢你帮我校准第一版。</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-sm font-semibold text-[#1a365d] mb-1">帮我校准这个测试</h3>
      <p className="text-xs text-gray-400 mb-6">这个初测还在第一版，你的反馈会帮助我改进结果判断和后续行动建议。</p>

      <div className="space-y-6">
        {/* Accuracy */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">这个结果与你当前状态的匹配度？<span className="text-red-400">*</span></p>
          <div className="flex flex-wrap gap-2">
            {ACCURACY_OPTIONS.map((opt) => (
              <button key={opt} onClick={() => setAccuracy(opt)}
                className={`rounded-full px-3 py-1 text-xs border transition-colors ${accuracy === opt ? 'bg-[#1a365d] text-white border-[#1a365d]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a365d]/40'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Desired advice */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">你最希望下一步获得哪类具体建议？</p>
          <div className="flex flex-wrap gap-2">
            {ADVICE_OPTIONS.map((opt) => (
              <button key={opt} onClick={() => setAdvice(opt)}
                className={`rounded-full px-3 py-1 text-xs border transition-colors ${advice === opt ? 'bg-[#1a365d] text-white border-[#1a365d]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a365d]/40'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Mismatch */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">你觉得哪里没说准？（选填）</p>
          <textarea
            value={mismatch}
            onChange={(e) => setMismatch(e.target.value)}
            placeholder="如果有不准的地方，写几句帮我改进……"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:border-[#1a365d] focus:outline-none focus:ring-1 focus:ring-[#1a365d] min-h-[60px] resize-y"
          />
        </div>

        {/* Willingness */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">如果后续开放完整行动咨询单内测，你是否愿意体验？</p>
          <div className="flex flex-wrap gap-2">
            {WILLINGNESS_OPTIONS.map((opt) => (
              <button key={opt} onClick={() => setWillingness(opt)}
                className={`rounded-full px-3 py-1 text-xs border transition-colors ${willingness === opt ? 'bg-[#1a365d] text-white border-[#1a365d]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a365d]/40'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">可选联系方式</p>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="微信 / 邮箱 / 小红书号，选填"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:border-[#1a365d] focus:outline-none focus:ring-1 focus:ring-[#1a365d]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!accuracy || status === 'submitting'}
          className={`w-full rounded-md py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            accuracy && status !== 'submitting' ? 'bg-[#1a365d] text-white hover:bg-[#2a4a7f]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {status === 'submitting' && <Loader2 size={14} className="animate-spin" />}
          {status === 'submitting' ? '提交中...' : '提交反馈'}
        </button>
      </div>
    </div>
  );
}
