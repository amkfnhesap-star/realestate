'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const STORAGE_KEY = 'cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('cookieBanner');
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setVisible(true);
  }, [pathname]);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  }

  if (!visible || pathname.startsWith('/admin')) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 border-t border-brand-200"
      style={{ background: '#1b1b20' }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-7 flex flex-col sm:flex-row sm:items-center gap-5">
        <p className="flex-1 text-base text-brand-500 leading-relaxed">
          {t('message')}{' '}
          <Link href="/cookies" className="text-gold-400 hover:underline">
            {t('learnMore')}
          </Link>
        </p>
        <div className="flex items-center gap-4 sm:shrink-0">
          <button
            onClick={reject}
            className="flex-1 sm:flex-none text-sm font-medium text-brand-500 border border-brand-200 rounded-xl px-7 py-3 hover:border-brand-400 transition-colors"
          >
            {t('reject')}
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none text-sm font-semibold text-brand-900 bg-gold-400 hover:bg-gold-500 rounded-xl px-7 py-3 transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
