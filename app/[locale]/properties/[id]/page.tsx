import { useTranslations, useMessages } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { agents } from '@/lib/sampleData';
import type { Property } from '@/lib/sampleData';
import { getPropertyById, getProperties } from '@/lib/supabase';
import PhotoGallery from './PhotoGallery';
import PropertyCard from '@/components/PropertyCard';
import AgentCard from '@/components/AgentCard';
import InquiryForm from '@/components/InquiryForm';

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const [property, allProperties] = await Promise.all([
    getPropertyById(id),
    getProperties(),
  ]);
  if (!property) return notFound();

  return <PropertyContent property={property} allProperties={allProperties} />;
}

function PropertyContent({ property, allProperties }: { property: Property; allProperties: Property[] }) {
  const t = useTranslations('property');
  const tProp = useTranslations('properties');
  const tCommon = useTranslations('common');
  const agent = agents.find((a) => a.id === property.agentId);
  const similar = allProperties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3);

  const messages = useMessages();
  const propMsgs = (messages as any)?.properties?.propertyData;
  const neighborhoodName: string = propMsgs?.neighborhoods?.[property.neighborhood] ?? property.neighborhood;
  const cityName: string = propMsgs?.cities?.[property.city] ?? property.city;

  const TYPE_LABELS: Record<string, string> = {
    apartment: tProp('types.apartment'),
    house: tProp('types.house'),
    commercial: tProp('types.commercial'),
    land: tProp('types.land'),
  };

  return (
    <div className="bg-brand-900 min-h-screen">
      {/* Back link bar */}
      <div className="bg-brand-50 border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/properties" className="text-sm text-brand-500 hover:text-gold-400 transition-colors font-medium">
            ← {t('back')}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left / main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo gallery */}
            <PhotoGallery photos={property.photos} title={property.title} />

            {/* Title + price */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                <h1 className="font-heading text-3xl md:text-4xl font-semibold text-brand-800 leading-tight">
                  {property.title}
                </h1>
                <span className="text-3xl font-semibold text-gold-400 whitespace-nowrap">
                  €{new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(property.price)}
                </span>
              </div>
              <p className="text-brand-500 text-sm flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {neighborhoodName}, {cityName}
              </p>
            </div>

            {/* Specs grid */}
            <div className="bg-brand-100 rounded-2xl p-6 border border-brand-200">
              <h2 className="font-heading text-xl font-semibold text-brand-800 mb-4">{t('details')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.bedrooms > 0 && (
                  <SpecItem label={t('bedrooms')} value={String(property.bedrooms)} />
                )}
                {property.bathrooms > 0 && (
                  <SpecItem label={t('bathrooms')} value={String(property.bathrooms)} />
                )}
                <SpecItem label={t('area')} value={`${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(property.area)} ${t('sqm')}`} />
                {property.yearBuilt > 0 && (
                  <SpecItem label={t('yearBuilt')} value={String(property.yearBuilt)} />
                )}
                <SpecItem label={t('type')} value={TYPE_LABELS[property.type] ?? property.type} />
                <SpecItem label={t('location')} value={cityName} />
              </div>
            </div>

            {/* Description */}
            <div className="bg-brand-100 rounded-2xl p-6 border border-brand-200">
              <h2 className="font-heading text-xl font-semibold text-brand-800 mb-3">{t('about')}</h2>
              <p className="text-brand-500 leading-relaxed">{property.description}</p>
            </div>

            {/* Map placeholder */}
            <div className="bg-brand-100 rounded-2xl border border-brand-200 overflow-hidden">
              <div className="h-52 flex flex-col items-center justify-center gap-2 text-brand-400">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                  <line x1="9" y1="3" x2="9" y2="18"/>
                  <line x1="15" y1="6" x2="15" y2="21"/>
                </svg>
                <p className="text-sm font-medium text-brand-500">{tCommon('mapComingSoon')}</p>
                <p className="text-xs text-brand-400">
                  {t('mapNote', { lat: property.coordinates.lat, lng: property.coordinates.lng })}
                </p>
              </div>
            </div>
          </div>

          {/* Right / sidebar column */}
          <div className="space-y-6">
            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${agent?.email ?? 'office@roestate.ro'}?subject=Schedule a Viewing — ${property.title}`}
                className="block text-center bg-gold-400 text-brand-900 py-3.5 rounded-xl font-semibold hover:bg-gold-500 transition-colors shadow-[0_4px_16px_rgba(201,163,94,0.3)]"
              >
                {t('scheduleViewing')}
              </a>
              <a
                href={`mailto:${agent?.email ?? 'office@roestate.ro'}?subject=Enquiry — ${property.title}`}
                className="block text-center border border-brand-500 text-brand-600 py-3.5 rounded-xl font-medium hover:bg-brand-100 hover:border-brand-600 hover:text-brand-800 transition-colors"
              >
                {t('contactAgent')}
              </a>
            </div>

            {/* Agent card */}
            {agent && (
              <div>
                <h3 className="font-heading text-lg font-semibold text-brand-800 mb-3">{t('consultant')}</h3>
                <AgentCard agent={agent} />
              </div>
            )}

            {/* Inquiry form */}
            <div className="bg-brand-100 rounded-2xl p-5 border border-brand-200">
              <h3 className="font-heading text-lg font-semibold text-brand-800 mb-4">{t('inquire')}</h3>
              <InquiryForm propertyTitle={property.title} />
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading text-3xl font-semibold text-brand-800 mb-6">{t('similar')}</h2>
            <div className="w-10 h-[1px] bg-gold-400/50 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-brand-50 rounded-xl p-3 border border-brand-200">
      <p className="text-xs text-brand-500 mb-0.5">{label}</p>
      <p className="font-semibold text-brand-800 text-sm">{value}</p>
    </div>
  );
}
