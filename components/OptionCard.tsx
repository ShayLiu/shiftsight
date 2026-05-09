'use client';

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({ label, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg border-2 px-5 py-4 transition-all duration-150 ${
        selected
          ? 'border-[#1a365d] bg-[#ebf4ff] text-[#1a365d] font-medium'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <span className="text-sm leading-relaxed">{label}</span>
    </button>
  );
}
