import TestForm from '@/components/TestForm';

export default function TestPage() {
  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-[#1a365d]">识变初测</h1>
          <p className="mt-3 text-sm text-gray-500">
            3 分钟看清你当前最主要的职业与行动困境。
          </p>
        </div>
        <TestForm />
      </div>
    </main>
  );
}
