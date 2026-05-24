'use client';

import { useTranslations } from 'next-intl';
import type { PropertyType } from '@/lib/sampleData';

export interface Filters {
  type: PropertyType | '';
  city: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  minArea: string;
}

interface Props {
  filters: Filters;
  onChange: (updated: Filters) => void;
  cities: string[];
}

const CITIES_DEFAULT = ['București', 'Cluj-Napoca', 'Brașov', 'Constanța'];

export default function PropertyFilters({ filters, onChange, cities = CITIES_DEFAULT }: Props) {
  const t = useTranslations('properties.filters');
  const tTypes = useTranslations('properties.types');

  function set(key: keyof Filters, value: string) {
    onChange({ ...filters, [key]: value });
  }

  function clear() {
    onChange({ type: '', city: '', minPrice: '', maxPrice: '', minBedrooms: '', minArea: '' });
  }

  const selectClass =
    'w-full px-3 py-2.5 rounded-xl border border-brand-200 text-sm text-brand-800 bg-brand-50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-colors';
  const inputClass =
    'w-full px-3 py-2.5 rounded-xl border border-brand-200 text-sm text-brand-800 bg-brand-50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-colors placeholder:text-brand-500';

  return (
    <div className="bg-brand-100 rounded-2xl border border-brand-200 p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-brand-800">{t('heading')}</h3>
        <button
          onClick={clear}
          className="text-xs text-gold-400 hover:text-gold-500 font-medium transition-colors"
        >
          {t('clear')}
        </button>
      </div>

      {/* Type */}
      <div>
        <label className="block text-xs font-medium text-brand-500 mb-1.5">{t('propertyType')}</label>
        <select
          value={filters.type}
          onChange={(e) => set('type', e.target.value)}
          className={selectClass}
        >
          <option value="">{t('allTypes')}</option>
          <option value="apartment">{tTypes('apartment')}</option>
          <option value="house">{tTypes('house')}</option>
          <option value="commercial">{tTypes('commercial')}</option>
          <option value="land">{tTypes('land')}</option>
        </select>
      </div>

      {/* City */}
      <div>
        <label className="block text-xs font-medium text-brand-500 mb-1.5">{t('city')}</label>
        <select
          value={filters.city}
          onChange={(e) => set('city', e.target.value)}
          className={selectClass}
        >
          <option value="">{t('allCities')}</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-xs font-medium text-brand-500 mb-1.5">{t('priceLabelEur')}</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder={t('minPlaceholder')}
            value={filters.minPrice}
            onChange={(e) => set('minPrice', e.target.value)}
            className={inputClass}
          />
          <input
            type="number"
            placeholder={t('maxPlaceholder')}
            value={filters.maxPrice}
            onChange={(e) => set('maxPrice', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Min bedrooms */}
      <div>
        <label className="block text-xs font-medium text-brand-500 mb-1.5">{t('minBedrooms')}</label>
        <select
          value={filters.minBedrooms}
          onChange={(e) => set('minBedrooms', e.target.value)}
          className={selectClass}
        >
          <option value="">{t('any')}</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Min area */}
      <div>
        <label className="block text-xs font-medium text-brand-500 mb-1.5">{t('area')}</label>
        <input
          type="number"
          placeholder={t('areaPlaceholder')}
          value={filters.minArea}
          onChange={(e) => set('minArea', e.target.value)}
          className={inputClass}
        />
      </div>
    </div>
  );
}
