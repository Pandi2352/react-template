import { FileText } from 'lucide-react';

interface DummyPageProps {
  title: string;
  description?: string;
}

export function DummyPage({ title, description }: DummyPageProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <FileText className="h-6 w-6" />
      </div>
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        {description ?? 'Dummy page for navigation verification.'}
      </p>
    </section>
  );
}
