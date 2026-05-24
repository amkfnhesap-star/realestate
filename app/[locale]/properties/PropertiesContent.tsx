'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import type { Property, PropertyType } from '@/lib/sampleData';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import type { Filters } from '@/components/PropertyFilters';

type SortKey = 'priceAsc' | 'priceDesc' | 'newest';

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
      <line x1="10" y1="18" x2="14" y2="18"/>
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

const CITIES = ['București', 'Cluj-Napoca', 'Brașov', 'Constanța'];

export default function PropertiesContent({ properties }: { properties: Property[] }) {
  const t = useTranslations('properties');
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    type: (searchParams.get('type') as PropertyType | '') ?? '',
    city: searchParams.get('city') ?? '',
    minPrice: '',
    maxPrice: searchParams.get('maxPrice') ?? '',
    minBedrooms: '',
    minArea: '',
  });
  const [sort, setSort] = useState<SortKey>('newest');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...properties];
    if (filters.type) list = list.filter((p) => p.type === filters.type);
    if (filters.city) list = list.filter((p) => p.city === filters.city);
    if (filters.minPrice) list = list.filter((p) => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) list = list.filter((p) => p.price <= Number(filters.maxPrice));
    if (filters.minBedrooms) list = list.filter((p) => p.bedrooms >= Number(filters.minBedrooms));
    if (filters.minArea) list = list.filter((p) => p.area >= Number(filters.minArea));

    if (sort === 'priceAsc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'priceDesc') list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => b.yearBuilt - a.yearBuilt);

    return list;
  }, [filters, sort]);

  return (
    <div className="bg-brand-900 min-h-screen">
      {/* Page header */}
      <div className="bg-brand-50 border-b border-brand-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold text-brand-800">
            {t('heading')}
          </h1>
          <div className="w-10 h-[1px] bg-gold-400/50 mt-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <PropertyFilters filters={filters} onChange={setFilters} cities={CITIES} />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-brand-500 text-sm font-medium">
                {t('found', { count: filtered.length })}
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  className="lg:hidden flex items-center gap-2 border border-brand-200 bg-brand-100 text-brand-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-50 hover:text-brand-800 transition-colors"
                  onClick={() => setDrawerOpen(true)}
                >
                  <FilterIcon />
                  {t('filters.heading')}
                </button>

                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="border border-brand-200 bg-brand-100 text-brand-800 px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold-400/40"
                >
                  <option value="newest">{t('sort.newest')}</option>
                  <option value="priceAsc">{t('sort.priceAsc')}</option>
                  <option value="priceDesc">{t('sort.priceDesc')}</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-brand-500 text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-brand-300">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <p>{t('noResults')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(8,8,9,0.7)' }} onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 start-0 w-80 max-w-full bg-brand-50 overflow-y-auto shadow-2xl border-e border-brand-200">
            <div className="flex items-center justify-between p-5 border-b border-brand-200">
              <h3 className="font-semibold text-brand-800">{t('filters.heading')}</h3>
              <button onClick={() => setDrawerOpen(false)} className="text-brand-500 hover:text-brand-800 transition-colors">
                <XIcon />
              </button>
            </div>
            <div className="p-5">
              <PropertyFilters filters={filters} onChange={setFilters} cities={CITIES} />
              <button
                className="mt-4 w-full bg-gold-400 text-brand-900 py-3 rounded-xl font-semibold hover:bg-gold-500 transition-colors"
                onClick={() => setDrawerOpen(false)}
              >
                {t('filters.heading')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
