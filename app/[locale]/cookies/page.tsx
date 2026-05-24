import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookiesContent />;
}

function CookiesContent() {
  const t = useTranslations('cookies');

  const sections = [
    { heading: t('s1Heading'), body: t('s1Body') },
    { heading: t('s2Heading'), body: t('s2Body') },
    { heading: t('s3Heading'), body: t('s3Body') },
    { heading: t('s4Heading'), body: t('s4Body') },
    { heading: t('s5Heading'), body: t('s5Body') },
  ];

  return (
    <>
      <section className="bg-brand-900 border-b border-brand-200 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-10 h-px bg-gold-400 mx-auto mb-6 rounded-full" />
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-brand-800 mb-4">
            {t('title')}
          </h1>
          <p className="text-brand-500 text-sm">{t('effectiveDate')}</p>
        </div>
      </section>

      <section className="bg-brand-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-500 leading-relaxed mb-12">{t('intro')}</p>
          <div className="divide-y divide-brand-200">
            {sections.map((s, i) => (
              <div key={i} className="py-8 first:pt-0">
                <h2 className="font-heading text-2xl font-semibold text-gold-400 mb-3">
                  {s.heading}
                </h2>
                <p className="text-brand-500 leading-relaxed whitespace-pre-line">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
