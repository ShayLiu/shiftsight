import { InitialResult } from '@/types/test';
import {
  Target, AlertTriangle, Zap, Shield, Eye,
  GitBranch, ListChecks, MessageCircle, Timer,
} from 'lucide-react';

export default function ResultCard({ result }: { result: InitialResult }) {
  return (
    <div className="space-y-6">
      {/* Type badge + identity */}
      <div className="text-center space-y-2">
        <span className="inline-block rounded-full bg-[#ebf4ff] px-5 py-2 text-base font-bold text-[#1a365d]">
          {result.title}
        </span>
      </div>

      {/* Summary */}
      <div className="rounded-lg border border-[#1a365d]/20 bg-[#1a365d]/5 p-6">
        <p className="text-sm text-gray-800 leading-relaxed">{result.summary}</p>
      </div>

      {/* Core Conflict */}
      <Section icon={Target} title="核心冲突" color="blue">
        <p className="text-sm text-gray-700 leading-relaxed">{result.coreConflict}</p>
      </Section>

      {/* Real Risk vs Amplified Fear */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Section icon={Eye} title="真实风险" color="slate">
          <p className="text-sm text-gray-700 leading-relaxed">{result.realRisk}</p>
        </Section>
        <Section icon={Shield} title="被放大的恐惧" color="slate">
          <p className="text-sm text-gray-700 leading-relaxed">{result.amplifiedFear}</p>
        </Section>
      </div>

      {/* Key Variables */}
      <Section icon={GitBranch} title="影响你结果的关键变量" color="blue">
        <ul className="space-y-2">
          {result.keyVariables.map((v, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
              <span className="w-5 h-5 rounded-full bg-[#1a365d]/10 text-[#1a365d] flex items-center justify-center text-xs shrink-0 mt-0.5 font-medium">
                {i + 1}
              </span>
              <span className="leading-relaxed">{v}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Not Recommended */}
      <Section icon={AlertTriangle} title="当前不建议做的事" color="amber">
        <ul className="space-y-2">
          {result.notRecommended.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
              <span className="text-amber-500 mt-1 shrink-0">✕</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 24h Action */}
      <Section icon={Zap} title="24 小时最小行动" color="green">
        <p className="text-sm text-gray-800 leading-relaxed font-medium">{result.minimalAction}</p>
      </Section>

      {/* 7-day Experiment */}
      <Section icon={Timer} title="7 天行动实验" color="blue">
        <p className="text-sm text-gray-700 leading-relaxed">{result.sevenDayExperiment}</p>
      </Section>

      {/* Reflection Questions */}
      <Section icon={MessageCircle} title="复盘自问" color="slate">
        <ul className="space-y-3">
          {result.reflectionQuestions.map((q, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <ListChecks className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{q}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Disclaimer */}
      <div className="rounded-lg bg-gray-50 border border-gray-200 p-5 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          本结果基于你的选择自动生成，仅供自我梳理参考。不替代专业咨询、心理治疗或医疗建议。
          每一个建议都强调低风险验证，而非冲动决策。
        </p>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  color,
  children,
}: {
  icon: React.ElementType;
  title: string;
  color: 'blue' | 'amber' | 'green' | 'slate';
  children: React.ReactNode;
}) {
  const styles = {
    blue: { border: 'border-gray-200', bg: 'bg-white', icon: 'text-[#1a365d]', title: 'text-[#1a365d]' },
    amber: { border: 'border-amber-200', bg: 'bg-amber-50', icon: 'text-amber-600', title: 'text-amber-800' },
    green: { border: 'border-emerald-200', bg: 'bg-emerald-50', icon: 'text-emerald-600', title: 'text-emerald-800' },
    slate: { border: 'border-gray-200', bg: 'bg-white', icon: 'text-gray-500', title: 'text-gray-700' },
  };
  const s = styles[color];

  return (
    <div className={`rounded-lg border ${s.border} ${s.bg} p-6`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} className={s.icon} />
        <h3 className={`text-sm font-semibold ${s.title}`}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
