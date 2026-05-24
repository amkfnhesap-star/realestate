'use client';

import { useState } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Property } from '@/lib/sampleData';

function BedIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16M22 4v16M2 8h20M7 8v4M17 8v4"/>
      <rect x="2" y="12" width="20" height="8" rx="1"/>
    </svg>
  );
}

function BathIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 21V9"/>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  const t = useTranslations('properties');
  const [imgError, setImgError] = useState(false);

  const TYPE_LABELS: Record<string, string> = {
    apartment: t('types.apartment'),
    house: t('types.house'),
    commercial: t('types.commercial'),
    land: t('types.land'),
  };

  const messages = useMessages();
  const propMsgs = (messages as any)?.properties?.propertyData;
  const typeName = TYPE_LABELS[property.type] ?? property.type;
  const neighborhoodName: string = propMsgs?.neighborhoods?.[property.neighborhood] ?? property.neighborhood;
  const cityName: string = propMsgs?.cities?.[property.city] ?? property.city;
  const tAny = t as unknown as (key: string, values?: Record<string, string | number>) => string;
  const title = tAny('propertyData.titleTemplate', {
    bedrooms: property.bedrooms,
    type: typeName,
    neighborhood: neighborhoodName,
  });

  return (
    <div className="group bg-brand-100 rounded-2xl overflow-hidden border border-brand-200 hover:border-gold-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Photo */}
      <div className="relative h-52 overflow-hidden bg-brand-50">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-brand-400">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className="text-xs">{typeName}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={property.photos[0]}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute top-3 start-3 bg-gold-400 text-brand-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          €{new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(property.price)}
        </div>
        <div className="absolute top-3 end-3 text-brand-800 px-2.5 py-1 rounded-full text-xs uppercase tracking-wide backdrop-blur-sm" style={{ background: 'rgba(14,14,16,0.72)' }}>
          {TYPE_LABELS[property.type] ?? property.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold text-brand-800 mb-2 leading-snug line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-brand-500 text-sm mb-4">
          <MapPinIcon />
          <span>{neighborhoodName}, {cityName}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-brand-500 border-t border-brand-200 pt-4 mb-4">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedIcon />
              {property.bedrooms} {t('card.beds')}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <BathIcon />
              {property.bathrooms} {t('card.baths')}
            </span>
          )}
          <span className="flex items-center gap-1">
            <AreaIcon />
            {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(property.area)} {t('card.sqm')}
          </span>
        </div>

        <Link
          href={`/properties/${property.id}`}
          className="block text-center bg-gold-400 text-brand-900 py-2.5 rounded-xl text-sm font-semibold hover:bg-gold-500 transition-colors shadow-[0_2px_8px_rgba(201,163,94,0.2)]"
        >
          {t('card.viewDetails')}
        </Link>
      </div>
    </div>
  );
}
