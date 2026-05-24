import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { Link } from '@/i18n/navigation';
import PropertiesTable from './PropertiesTable';

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-brand-50 rounded-2xl border border-brand-200 p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-brand-500 text-xs uppercase tracking-widest font-medium">{label}</p>
        <p className="font-heading text-3xl text-brand-800 font-semibold mt-1 leading-none">
          {value}
        </p>
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: properties } = await supabase
    .from('properties')
    .select('*');

  const rows = properties ?? [];
  const total = rows.length;
  const featuredCount = rows.filter((p) => p.featured).length;
  const avgPrice =
    total > 0
      ? Math.round(rows.reduce((sum, p) => sum + (p.price ?? 0), 0) / total)
      : 0;
  const cityCount = new Set(rows.map((p) => p.city).filter(Boolean)).size;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-brand-800 font-semibold tracking-wide">
            Dashboard
          </h1>
          <p className="text-brand-500 text-sm mt-1">Manage your property listings</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-gold-400 text-brand-900 rounded-xl text-sm font-semibold hover:bg-gold-500 active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(201,163,94,0.3)]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Property
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Properties"
          value={total}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
              <path d="M9 21V12h6v9" />
            </svg>
          }
        />
        <StatCard
          label="Featured"
          value={featuredCount}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
        />
        <StatCard
          label="Avg. Price"
          value={`€${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(avgPrice)}`}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        />
        <StatCard
          label="Cities Covered"
          value={cityCount}
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          }
        />
      </div>

      {/* Properties table */}
      <div>
        <h2 className="font-heading text-xl text-brand-700 font-medium mb-4">
          All Properties
        </h2>
        <PropertiesTable properties={rows} />
      </div>
    </div>
  );
}
