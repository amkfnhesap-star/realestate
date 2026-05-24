'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export default function HeroSearch() {
  const t = useTranslations('home.hero.search');
  const tTypes = useTranslations('properties.types');
  const router = useRouter();
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (city) params.set('city', city);
    if (maxPrice) params.set('maxPrice', maxPrice);
    router.push(`/properties?${params.toString()}` as '/properties');
  }

  const selectClass =
    'w-full px-4 py-3 rounded-xl border border-brand-200 text-sm text-brand-800 bg-brand-100 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/50 transition-colors';

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div>
        <label className="sr-only">{t('propertyType')}</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
          <option value="">{t('allTypes')}</option>
          <option value="apartment">{tTypes('apartment')}</option>
          <option value="house">{tTypes('house')}</option>
          <option value="commercial">{tTypes('commercial')}</option>
          <option value="land">{tTypes('land')}</option>
        </select>
      </div>
      <div>
        <label className="sr-only">{t('city')}</label>
        <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
          <option value="">{t('allCities')}</option>
          <option value="București">București</option>
          <option value="Cluj-Napoca">Cluj-Napoca</option>
          <option value="Brașov">Brașov</option>
          <option value="Constanța">Constanța</option>
        </select>
      </div>
      <div>
        <label className="sr-only">{t('priceRange')}</label>
        <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className={selectClass}>
          <option value="">{t('priceAny')}</option>
          <option value="100000">{t('price1')}</option>
          <option value="250000">{t('price2')}</option>
          <option value="500000">{t('price3')}</option>
          <option value="9999999">{t('price4')}</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-gold-400 text-brand-900 px-6 py-3 rounded-xl font-semibold hover:bg-gold-500 transition-colors w-full shadow-[0_2px_10px_rgba(201,163,94,0.3)]"
      >
        {t('button')}
      </button>
    </form>
  );
}
