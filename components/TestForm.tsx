'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEST_QUESTIONS } from '@/lib/testQuestions';
import { TestAnswer } from '@/types/test';
import OptionCard from './OptionCard';
import ProgressBar from './ProgressBar';
import { Loader2 } from 'lucide-react';

export default function TestForm() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  const [optionalText, setOptionalText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const totalQuestions = TEST_QUESTIONS.length;
  const currentQuestion = TEST_QUESTIONS[currentIndex];
  const isLastQuestion = currentIndex === totalQuestions - 1;

  function handleSelectOption(value: string, tags: string[], label: string) {
    setCurrentSelection(value);
    const existingIndex = answers.findIndex((a) => a.questionId === currentQuestion.id);
    const newAnswer: TestAnswer = {
      questionId: currentQuestion.id,
      value,
      label,
      tags,
    };
    if (existingIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
  }

  function handleNext() {
    if (!currentSelection) return;
    setCurrentIndex(currentIndex + 1);
    // Restore previous selection if user goes forward and comes back (not needed in one-way flow)
    const nextAnswer = answers.find((a) => a.questionId === TEST_QUESTIONS[currentIndex + 1]?.id);
    setCurrentSelection(nextAnswer?.value || null);
  }

  async function handleSubmit() {
    if (!currentSelection && !isLastQuestion) return;
    setSubmitting(true);

    try {
      const response = await fetch('/api/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, optionalText }),
      });

      if (!response.ok) {
        throw new Error('提交失败，请重试');
      }

      const data = await response.json();
      const { id, result } = data;

      // Store result in sessionStorage for the result page
      sessionStorage.setItem(`test-result-${id}`, JSON.stringify(result));

      router.push(`/test/result/${id}`);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      alert('提交失败，请检查网络后重试。');
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#1a365d] mb-6">
          {currentQuestion.title}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={currentSelection === option.value}
              onClick={() => handleSelectOption(option.value, option.tags, option.label)}
            />
          ))}
        </div>

        {/* Optional text on last question */}
        {isLastQuestion && (
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              还有什么想补充的？（选填）
            </label>
            <textarea
              value={optionalText}
              onChange={(e) => setOptionalText(e.target.value)}
              placeholder="如果你觉得以上选项没有完全覆盖你的情况，可以在这里简要描述..."
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#1a365d] focus:outline-none focus:ring-1 focus:ring-[#1a365d] min-h-[100px] resize-y"
            />
          </div>
        )}

        <div className="mt-8 flex justify-end">
          {!isLastQuestion ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!currentSelection}
              className={`rounded-md px-6 py-3 text-sm font-medium transition-colors ${
                currentSelection
                  ? 'bg-[#1a365d] text-white hover:bg-[#2a4a7f]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              下一题
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!currentSelection || submitting}
              className={`rounded-md px-8 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${
                currentSelection && !submitting
                  ? 'bg-[#1a365d] text-white hover:bg-[#2a4a7f]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? '正在分析...' : '提交'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
