import { Suspense } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import PropertiesContent from './PropertiesContent';
import { getProperties } from '@/lib/supabase';

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, properties] = await Promise.all([
    getTranslations('common'),
    getProperties(),
  ]);
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-50 flex items-center justify-center"><p className="text-slate-500">{t('loading')}</p></div>}>
      <PropertiesContent properties={properties} />
    </Suspense>
  );
}
