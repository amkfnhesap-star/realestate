import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { agents, testimonials } from '@/lib/sampleData';
import type { Property } from '@/lib/sampleData';
import { getProperties } from '@/lib/supabase';
import PropertyCard from '@/components/PropertyCard';
import AgentCard from '@/components/AgentCard';
import TestimonialCard from '@/components/TestimonialCard';
import SectionHeading from '@/components/SectionHeading';
import InquiryForm from '@/components/InquiryForm';
import HeroSearch from '@/components/HeroSearch';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const properties = await getProperties();
  return <HomeContent properties={properties} />;
}

/* ─── Icon helpers ─── */

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function HandshakeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l1.06 1.06L12 21.23l7.36-7.94 1.06-1.06a5.4 5.4 0 0 0 0-7.65z"/>
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2"/>
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>
    </svg>
  );
}
function StoreIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20l-2 7H4L2 3zM4 10v11h16V10"/>
      <path d="M9 10v11M15 10v11"/>
    </svg>
  );
}
function TreeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 14l-5-10-5 10h10zM12 14v7M9 21h6"/>
    </svg>
  );
}

/* ─── Main content ─── */

function HomeContent({ properties }: { properties: Property[] }) {
  const t = useTranslations('home');
  const tProp = useTranslations('properties');
  const featured = properties.filter((p) => p.featured);
  const aptCount = properties.filter((p) => p.type === 'apartment').length;
  const houseCount = properties.filter((p) => p.type === 'house').length;
  const commCount = properties.filter((p) => p.type === 'commercial').length;
  const landCount = properties.filter((p) => p.type === 'land').length;

  const WHY_US = [
    { icon: <ShieldIcon />, title: t('whyUs.verified.title'), desc: t('whyUs.verified.desc') },
    { icon: <BoltIcon />, title: t('whyUs.communication.title'), desc: t('whyUs.communication.desc') },
    { icon: <MapPinIcon />, title: t('whyUs.expertise.title'), desc: t('whyUs.expertise.desc') },
    { icon: <HandshakeIcon />, title: t('whyUs.negotiation.title'), desc: t('whyUs.negotiation.desc') },
  ];

  const CATEGORIES = [
    {
      icon: <BuildingIcon />,
      label: t('categories.apartments'),
      count: aptCount,
      type: 'apartment',
      photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    {
      icon: <HomeIcon />,
      label: t('categories.houses'),
      count: houseCount,
      type: 'house',
      photo: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    },
    {
      icon: <StoreIcon />,
      label: t('categories.commercial'),
      count: commCount,
      type: 'commercial',
      photo: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80',
    },
    {
      icon: <TreeIcon />,
      label: t('categories.land'),
      count: landCount,
      type: 'land',
      photo: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
    },
  ];

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative min-h-[85vh] flex flex-col">
        {/* Background image + dark overlay */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(14,14,16,0.55) 0%, rgba(14,14,16,0.85) 100%)' }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
            <div className="max-w-2xl">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-brand-800 leading-[1.1] mb-6">
                {t('hero.titleBefore')}{' '}
                <em className="text-gold-400">{t('hero.titleAccent')}</em>
                {' '}{t('hero.titleAfter')}
              </h1>
              <p className="text-brand-500 text-lg md:text-xl mb-10 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/properties"
                  className="inline-block bg-gold-400 text-brand-900 px-7 py-3.5 rounded-xl font-semibold hover:bg-gold-500 transition-colors shadow-[0_4px_20px_rgba(201,163,94,0.35)]"
                >
                  {t('hero.viewProperties')}
                </Link>
                <Link
                  href="/contact"
                  className="inline-block border border-white/30 text-white px-7 py-3.5 rounded-xl font-medium hover:bg-white/10 hover:border-white/50 transition-colors"
                >
                  {t('hero.scheduleViewing')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search card — dark pill */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 -mb-10">
          <div className="max-w-5xl mx-auto bg-brand-100 backdrop-blur-xl rounded-2xl border border-brand-200 p-5 md:p-6 shadow-2xl" style={{ boxShadow: '0 25px 50px rgba(8,8,9,0.6)' }}>
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED PROPERTIES ── */}
      <section className="bg-brand-900 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('featured.heading')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/properties"
              className="inline-block border border-brand-500 text-brand-600 px-8 py-3.5 rounded-xl font-medium hover:bg-brand-100 hover:border-brand-600 hover:text-brand-800 transition-colors"
            >
              {t('featured.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. CATEGORIES ── */}
      <section className="bg-brand-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('categories.heading')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.type}
                href={`/properties?type=${cat.type}`}
                className="group relative rounded-2xl overflow-hidden h-56 border border-brand-200 hover:border-gold-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.photo}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,14,16,0.90) 0%, rgba(14,14,16,0.28) 100%)' }} />
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-brand-800">
                  <div className="mb-2 text-gold-400">{cat.icon}</div>
                  <h3 className="font-heading text-2xl font-semibold">{cat.label}</h3>
                  <p className="text-brand-500 text-sm">{tProp('found', { count: cat.count })}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE US ── */}
      <section className="bg-brand-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('whyUs.heading')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_US.map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 text-gold-400 rounded-2xl mb-5 border border-gold-300" style={{ background: 'rgba(201,163,94,0.10)' }}>
                  {item.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-brand-800 mb-2">{item.title}</h3>
                <p className="text-brand-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. AGENT TEAM ── */}
      <section className="bg-brand-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('team.heading')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} contactLabel={t('team.contact')} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ── */}
      <section className="bg-brand-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t('testimonials.heading')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA / LEAD CAPTURE ── */}
      <section className="bg-brand-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-brand-800 mb-4">
            {t('cta.heading')}
          </h2>
          <div className="w-10 h-[1px] bg-gold-400/50 mx-auto mb-6" />
          <p className="text-brand-500 text-lg mb-10">{t('cta.subtitle')}</p>
          <div className="bg-brand-100 rounded-2xl border border-brand-200 p-6 md:p-8 text-start">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
