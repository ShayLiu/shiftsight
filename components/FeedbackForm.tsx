'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

const ACCURACY = ['很准', '基本准', '一般', '不太准', '完全不准'];
const ADVICE = ['职业选择', '副业 / 第二收入', '个人品牌', 'AI 能力提升', '组织处境', '情绪与行动启动', '想先有人帮我拆问题'];
const WILLINGNESS = ['愿意参与内测', '想先看看示例', '暂时不需要'];

function Chips({ options, selected, onSelect }: { options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button key={opt} onClick={() => onSelect(opt)}
          className={`rounded-full px-3 py-1 text-xs border transition-colors ${selected === opt ? 'bg-[#1a365d] text-white border-[#1a365d]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a365d]/40'}`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

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
      const { getSupabase } = await import('@/lib/supabaseClient');
      const db = getSupabase();
      if (db) {
        await db.from('feedback_entries').insert({
          test_session_id: testSessionId || null,
          result_type: resultType || null,
          accuracy_rating: accuracy,
          desired_advice: advice || null,
          mismatch_text: mismatch || null,
          willingness: willingness || null,
          contact: contact || null,
          source: 'result_page',
        });
      }
      setStatus('done');
    } catch {
      setStatus('done');
    }
  };

  if (status === 'done') {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <Check size={20} className="text-emerald-500 mx-auto mb-2" />
        <p className="text-sm text-[#1a365d]">已收到，感谢您的反馈。</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="text-sm font-semibold text-[#1a365d]">意见反馈</h3>
      <p className="text-xs text-gray-400 mt-1 mb-6">您的反馈将用于改进后续版本。</p>

      <div className="space-y-5">
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">这个结果和您当前状态匹配吗？<span className="text-red-400">*</span></p>
          <Chips options={ACCURACY} selected={accuracy} onSelect={setAccuracy} />
        </div>

        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">您最想获得哪类下一步建议？</p>
          <Chips options={ADVICE} selected={advice} onSelect={setAdvice} />
        </div>

        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">哪里没有说准？<span className="text-gray-400 font-normal">（选填）</span></p>
          <textarea value={mismatch} onChange={(e) => setMismatch(e.target.value)}
            placeholder="可以简单写几句：哪里不像您、哪里太模糊、您真正卡住的点是什么。"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:border-[#1a365d] focus:outline-none focus:ring-1 focus:ring-[#1a365d] min-h-[60px] resize-y" />
        </div>

        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">如果开放完整行动咨询内测，您愿意体验吗？</p>
          <Chips options={WILLINGNESS} selected={willingness} onSelect={setWillingness} />
        </div>

        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">可选联系方式</p>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
            placeholder="微信 / 邮箱 / 小红书号均可"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:border-[#1a365d] focus:outline-none focus:ring-1 focus:ring-[#1a365d]" />
        </div>

        <button onClick={handleSubmit} disabled={!accuracy || status === 'submitting'}
          className={`w-full rounded-md py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${accuracy ? 'bg-[#1a365d] text-white hover:bg-[#2a4a7f]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
          {status === 'submitting' && <Loader2 size={14} className="animate-spin" />}
          {status === 'submitting' ? '提交中...' : '提交反馈'}
        </button>
      </div>
    </div>
  );
}
