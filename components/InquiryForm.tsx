'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  propertyTitle?: string;
}

export default function InquiryForm({ propertyTitle }: Props) {
  const t = useTranslations('form');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-colors bg-brand-50 border-brand-200 text-brand-800 placeholder:text-brand-500`;

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
      {propertyTitle && (
        <p className="text-sm mb-2 text-brand-500">
          Re: {propertyTitle}
        </p>
      )}
      <input
        type="text"
        required
        placeholder={t('name')}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className={inputClass}
      />
      <input
        type="email"
        required
        placeholder={t('email')}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={inputClass}
      />
      <input
        type="tel"
        placeholder={t('phone')}
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className={inputClass}
      />
      <textarea
        rows={4}
        required
        placeholder={t('message')}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="w-full bg-gold-400 text-brand-900 py-3 rounded-xl font-semibold hover:bg-gold-500 transition-colors shadow-[0_2px_10px_rgba(201,163,94,0.25)]"
      >
        {t('submit')}
      </button>
    </form>
  );
}
