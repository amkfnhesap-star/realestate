'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SellersForm() {
  const t = useTranslations('sellers.listForm');
  const tTypes = useTranslations('properties.types');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    ownerName: '',
    contactNumber: '',
    propertyType: '',
    city: '',
    description: '',
  });

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-brand-900 bg-white focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors placeholder:text-slate-400';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center text-brand-800">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-400">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <path d="M22 4 12 14.01l-3-3"/>
        </svg>
        <p className="text-lg font-medium">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        required
        placeholder={t('ownerName')}
        value={form.ownerName}
        onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
        className={inputClass}
      />
      <input
        type="tel"
        required
        placeholder={t('contactNumber')}
        value={form.contactNumber}
        onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
        className={inputClass}
      />
      <select
        value={form.propertyType}
        onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
        className={inputClass}
      >
        <option value="">{t('propertyType')}</option>
        <option value="apartment">{tTypes('apartment')}</option>
        <option value="house">{tTypes('house')}</option>
        <option value="commercial">{tTypes('commercial')}</option>
        <option value="land">{tTypes('land')}</option>
      </select>
      <select
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        className={inputClass}
      >
        <option value="">{t('city')}</option>
        <option value="București">București</option>
        <option value="Cluj-Napoca">Cluj-Napoca</option>
        <option value="Brașov">Brașov</option>
        <option value="Constanța">Constanța</option>
        <option value="other">{t('cityOther')}</option>
      </select>
      <textarea
        rows={4}
        required
        placeholder={t('propertyDesc')}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="w-full bg-gold-400 text-white py-3.5 rounded-xl font-medium hover:bg-gold-500 transition-colors"
      >
        {t('submit')}
      </button>
    </form>
  );
}
