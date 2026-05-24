import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/utils/supabase/server';
import PropertyForm from '../../PropertyForm';

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) notFound();

  return (
    <div className="max-w-3xl space-y-7">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-brand-500">
        <Link href="/admin" className="hover:text-brand-800 transition-colors">
          Dashboard
        </Link>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-brand-700">Edit Property</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl text-brand-800 font-semibold tracking-wide">
          Edit Property
        </h1>
        <p className="text-brand-500 text-sm mt-1 line-clamp-1">{data.title}</p>
      </div>

      {/* Card */}
      <div className="bg-brand-50 rounded-2xl border border-brand-200 p-6 lg:p-8">
        <PropertyForm id={id} initialData={data as Record<string, unknown>} />
      </div>
    </div>
  );
}
