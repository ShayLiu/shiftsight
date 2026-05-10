'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEST_QUESTIONS } from '@/lib/testQuestions';
import { TestAnswer } from '@/types/test';
import { generateInitialResult } from '@/lib/generateInitialResult';
import { calculateDashboardScores } from '@/lib/calculateDashboardScores';
import { calculateConstraintScores } from '@/lib/calculateConstraintScores';
import { getSupabase } from '@/lib/supabaseClient';
import OptionCard from './OptionCard';
import ProgressBar from './ProgressBar';
import { Loader2, ChevronLeft } from 'lucide-react';

export default function TestForm() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [optionalText, setOptionalText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const totalQuestions = TEST_QUESTIONS.length;
  const currentQuestion = TEST_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);

  function handleSelectOption(value: string, tags: string[], label: string) {
    const newAnswer: TestAnswer = { questionId: currentQuestion.id, value, label, tags };
    const idx = answers.findIndex((a) => a.questionId === currentQuestion.id);
    const newAnswers = idx >= 0 ? answers.map((a, i) => i === idx ? newAnswer : a) : [...answers, newAnswer];
    setAnswers(newAnswers);
    if (!isLastQuestion) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  }

  function handleBack() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  async function handleSubmit() {
    if (!currentAnswer) return;
    setSubmitting(true);
    setError('');

    try {
      const result = generateInitialResult(answers, optionalText);
      const dashboardScores = calculateDashboardScores(answers);
      const constraintScores = calculateConstraintScores(answers);
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

      sessionStorage.setItem(`test-result-${id}`, JSON.stringify({
        ...result,
        dashboardScores,
        constraintScores,
      }));

      // Save to Supabase
      const db = getSupabase();
      if (db) {
        const { error: dbErr } = await db.from('test_sessions').insert({
          user_id: null,
          answers_json: answers,
          optional_text: optionalText,
          result_type: result.resultType,
          initial_result_json: result,
          dashboard_scores_json: dashboardScores,
          constraint_scores_json: constraintScores,
        });
        if (dbErr) {
          console.error('Supabase error:', dbErr.message);
        }
      }

      router.push(`/result?id=${id}`);
    } catch {
      setError('提交失败，请重试。');
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      <div className="mt-6">
        {currentIndex > 0 && (
          <button type="button" onClick={handleBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#1a365d] transition-colors mb-4">
            <ChevronLeft size={16} /> 上一题
          </button>
        )}
        <h2 className="text-xl font-semibold text-[#1a365d] mb-6">{currentQuestion.title}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <OptionCard key={option.value} label={option.label} selected={currentAnswer?.value === option.value} onClick={() => handleSelectOption(option.value, option.tags, option.label)} />
          ))}
        </div>
        {isLastQuestion && (
          <>
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">还有什么想补充的？（选填）</label>
              <textarea value={optionalText} onChange={(e) => setOptionalText(e.target.value)} placeholder="如果您觉得以上选项没有完全覆盖您的情况，可以在这里简要描述..." className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#1a365d] focus:outline-none focus:ring-1 focus:ring-[#1a365d] min-h-[100px] resize-y" />
            </div>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <div className="mt-8 flex justify-end">
              <button type="button" onClick={handleSubmit} disabled={!currentAnswer || submitting} className={`rounded-md px-8 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${currentAnswer && !submitting ? 'bg-[#1a365d] text-white hover:bg-[#2a4a7f]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitting ? '正在分析...' : '查看结果'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
