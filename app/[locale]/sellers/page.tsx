import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SellersForm from './SellersForm';

export default async function SellersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SellersContent />;
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <path d="M22 4 12 14.01l-3-3"/>
    </svg>
  );
}

function SellersContent() {
  const t = useTranslations('sellers');

  const BENEFITS = [
    { title: t('benefits.b1.title'), desc: t('benefits.b1.desc') },
    { title: t('benefits.b2.title'), desc: t('benefits.b2.desc') },
    { title: t('benefits.b3.title'), desc: t('benefits.b3.desc') },
    { title: t('benefits.b4.title'), desc: t('benefits.b4.desc') },
    { title: t('benefits.b5.title'), desc: t('benefits.b5.desc') },
  ];

  const STEPS = [
    { num: '01', title: t('process.s1.title'), desc: t('process.s1.desc') },
    { num: '02', title: t('process.s2.title'), desc: t('process.s2.desc') },
    { num: '03', title: t('process.s3.title'), desc: t('process.s3.desc') },
    { num: '04', title: t('process.s4.title'), desc: t('process.s4.desc') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,14,16,0.6) 0%, rgba(14,14,16,0.85) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-white mb-5 leading-tight">
              {t('hero.heading')}
            </h1>
            <p className="text-white/75 text-lg leading-relaxed">{t('hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-brand-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-semibold text-brand-800 mb-10 text-center">
            {t('benefits.heading')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-brand-50 rounded-2xl p-6 border border-brand-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-gold-400 mt-1">
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-brand-800 mb-1">{b.title}</h3>
                    <p className="text-brand-500 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-brand-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-semibold text-brand-800 mb-10 text-center">
            {t('process.heading')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="bg-brand-100 rounded-2xl p-6 border border-brand-200 text-center">
                <div className="font-heading text-5xl font-semibold text-gold-400/40 mb-3">{step.num}</div>
                <h3 className="font-heading text-lg font-semibold text-brand-800 mb-2">{step.title}</h3>
                <p className="text-brand-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* List your property form */}
      <section className="bg-brand-900 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-semibold text-brand-800 mb-2 text-center">
            {t('listForm.heading')}
          </h2>
          <p className="text-brand-500 text-center mb-8">{t('listForm.subtitle')}</p>
          <div className="bg-brand-50 rounded-2xl p-7 border border-brand-200">
            <SellersForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-semibold text-white mb-3">{t('cta.heading')}</h2>
          <p className="text-white/70 text-lg mb-8">{t('cta.subtitle')}</p>
          <Link
            href="/contact"
            className="inline-block bg-gold-400 text-white px-8 py-4 rounded-xl font-medium hover:bg-gold-500 transition-colors text-lg"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </>
  );
}
