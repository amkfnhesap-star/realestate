'use client';

import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { createClient } from '@/utils/supabase/client';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin' as const,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Properties',
    href: '/admin' as const,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    label: 'Add Property',
    href: '/admin/properties/new' as const,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  return (
    <aside className="w-60 shrink-0 flex flex-col bg-brand-50 border-r border-brand-200 h-full">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-brand-200">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center shadow-[0_0_14px_rgba(201,163,94,0.4)]">
            <span className="font-heading text-sm font-bold text-brand-900 leading-none select-none">
              R
            </span>
          </div>
          <span className="font-heading text-xl tracking-wide leading-none">
            <span className="text-gold-400 font-semibold">Ro</span>
            <span className="text-brand-800 font-medium">Estate</span>
          </span>
        </Link>
        <p className="text-brand-400 text-[11px] tracking-widest uppercase mt-2 pl-[2.375rem]">
          Admin
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ label, href, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                isActive
                  ? 'bg-gold-400/10 text-gold-400 border-gold-400/25'
                  : 'text-brand-500 hover:text-brand-800 hover:bg-brand-100 border-transparent'
              }`}
            >
              {icon}
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer: view site + logout */}
      <div className="p-3 border-t border-brand-200 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-500 hover:text-brand-800 hover:bg-brand-100 border border-transparent transition-all"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-500 hover:text-red-400 hover:bg-red-950/20 border border-transparent transition-all"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>
      </div>
    </aside>
  );
}
