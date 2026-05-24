'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/utils/supabase/client';

type PropertyRow = {
  id: string;
  title: string;
  city: string;
  type: string;
  price: number;
  photos: string[] | null;
  featured: boolean;
};

export default function PropertiesTable({
  properties: initial,
}: {
  properties: PropertyRow[];
}) {
  const [properties, setProperties] = useState<PropertyRow[]>(initial);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    const supabase = createClient();
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
    setDeletingId(null);
  }

  if (properties.length === 0) {
    return (
      <div className="bg-brand-50 rounded-2xl border border-brand-200 p-16 text-center">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-brand-300 mb-4"
        >
          <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" />
          <path d="M9 21V12h6v9" />
        </svg>
        <p className="text-brand-500 text-sm">
          No properties yet.{' '}
          <Link
            href="/admin/properties/new"
            className="text-gold-400 hover:text-gold-500 underline underline-offset-2 transition-colors"
          >
            Add your first one.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-brand-50 rounded-2xl border border-brand-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-100 border-b border-brand-200">
              <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-brand-500 uppercase tracking-widest">
                Property
              </th>
              <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-brand-500 uppercase tracking-widest">
                City
              </th>
              <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-brand-500 uppercase tracking-widest">
                Type
              </th>
              <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-brand-500 uppercase tracking-widest">
                Price
              </th>
              <th className="px-4 py-3.5 text-left text-[11px] font-semibold text-brand-500 uppercase tracking-widest">
                Featured
              </th>
              <th className="px-4 py-3.5 text-right text-[11px] font-semibold text-brand-500 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-200/60">
            {properties.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-brand-100/40 transition-colors group"
              >
                {/* Thumbnail + title */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.photos?.[0] ? (
                      <img
                        src={p.photos[0]}
                        alt=""
                        className="w-11 h-11 rounded-lg object-cover shrink-0 bg-brand-200"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-lg bg-brand-200 shrink-0 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                    <span className="text-brand-800 font-medium leading-snug line-clamp-2 max-w-[200px]">
                      {p.title}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 text-brand-600 whitespace-nowrap">{p.city}</td>

                <td className="px-4 py-3">
                  <span className="capitalize text-brand-600">{p.type}</span>
                </td>

                <td className="px-4 py-3 text-brand-800 font-medium whitespace-nowrap">
                  €{new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(p.price ?? 0)}
                </td>

                <td className="px-4 py-3">
                  {p.featured ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gold-400/12 text-gold-400 border border-gold-400/25">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Yes
                    </span>
                  ) : (
                    <span className="text-brand-400 text-xs">—</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="px-3 py-1.5 rounded-lg bg-brand-100 text-brand-700 hover:bg-brand-200 hover:text-brand-800 text-xs font-medium transition-colors border border-brand-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      disabled={deletingId === p.id}
                      className="px-3 py-1.5 rounded-lg bg-red-950/30 text-red-400 hover:bg-red-950/50 text-xs font-medium transition-colors border border-red-800/30 disabled:opacity-50"
                    >
                      {deletingId === p.id ? '…' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Row count footer */}
      <div className="px-4 py-3 border-t border-brand-200 bg-brand-100/40">
        <p className="text-brand-500 text-xs">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'}
        </p>
      </div>
    </div>
  );
}
