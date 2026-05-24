import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { properties } from '@/lib/sampleData';
import PropertyCard from '@/components/PropertyCard';
import SectionHeading from '@/components/SectionHeading';

export default async function BuyersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BuyersContent />;
}

function BuyersContent() {
  const t = useTranslations('buyers');
  const featured = properties.filter((p) => p.featured);

  const STEPS = [
    { num: '01', title: t('process.s1.title'), desc: t('process.s1.desc') },
    { num: '02', title: t('process.s2.title'), desc: t('process.s2.desc') },
    { num: '03', title: t('process.s3.title'), desc: t('process.s3.desc') },
    { num: '04', title: t('process.s4.title'), desc: t('process.s4.desc') },
    { num: '05', title: t('process.s5.title'), desc: t('process.s5.desc') },
  ];

  const WHY_ITEMS = [
    { title: t('whyRomania.eu.title'), desc: t('whyRomania.eu.desc') },
    { title: t('whyRomania.foreign.title'), desc: t('whyRomania.foreign.desc') },
    { title: t('whyRomania.growth.title'), desc: t('whyRomania.growth.desc') },
    { title: t('whyRomania.lifestyle.title'), desc: t('whyRomania.lifestyle.desc') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80"
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

      {/* Buying process */}
      <section className="bg-brand-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('process.heading')} />
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden lg:block absolute top-8 start-0 end-0 h-px bg-gold-400/30 z-0 mx-16" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {STEPS.map((step) => (
                <div key={step.num} className="bg-brand-100 rounded-2xl p-5 border border-brand-200 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold-400 text-brand-900 font-bold text-sm flex items-center justify-center">
                    {step.num}
                  </div>
                  <h3 className="font-heading text-base font-semibold text-brand-800 mb-2">{step.title}</h3>
                  <p className="text-brand-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why buy in Romania */}
      <section className="bg-brand-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('whyRomania.heading')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="bg-brand-50 rounded-2xl p-6 border border-brand-200">
                <h3 className="font-heading text-xl font-semibold text-brand-800 mb-2">{item.title}</h3>
                <p className="text-brand-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured properties strip */}
      <section className="bg-brand-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('featured.heading')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/properties"
              className="inline-block border-2 border-brand-500 text-brand-600 px-8 py-3.5 rounded-xl font-medium hover:bg-brand-100 hover:border-brand-400 hover:text-brand-800 transition-colors"
            >
              {t('cta.browse')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-semibold text-white mb-3">{t('cta.heading')}</h2>
          <p className="text-white/70 text-lg mb-8">{t('cta.subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/properties"
              className="inline-block bg-gold-400 text-white px-7 py-3.5 rounded-xl font-medium hover:bg-gold-500 transition-colors"
            >
              {t('cta.browse')}
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-7 py-3.5 rounded-xl font-medium hover:bg-white hover:text-brand-900 transition-colors"
            >
              {t('cta.contact')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
