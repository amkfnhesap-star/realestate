'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { createClient } from '@/utils/supabase/client';

const PROPERTY_TYPES = ['apartment', 'house', 'commercial', 'land'] as const;
const CITIES = ['București', 'Cluj-Napoca', 'Brașov', 'Constanța'] as const;

type FormState = {
  title: string;
  price: string;
  city: string;
  neighborhood: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  year_built: string;
  description: string;
  photos: string;
  featured: boolean;
};

const EMPTY_FORM: FormState = {
  title: '',
  price: '',
  city: '',
  neighborhood: '',
  type: 'apartment',
  bedrooms: '',
  bathrooms: '',
  area: '',
  year_built: '',
  description: '',
  photos: '',
  featured: false,
};

function rowToForm(row: Record<string, unknown>): FormState {
  return {
    title: String(row.title ?? ''),
    price: String(row.price ?? ''),
    city: String(row.city ?? ''),
    neighborhood: String(row.neighborhood ?? ''),
    type: String(row.type ?? 'apartment'),
    bedrooms: String(row.bedrooms ?? ''),
    bathrooms: String(row.bathrooms ?? ''),
    area: String(row.area ?? ''),
    year_built: String(row.year_built ?? ''),
    description: String(row.description ?? ''),
    photos: Array.isArray(row.photos) ? (row.photos as string[]).join(', ') : '',
    featured: Boolean(row.featured),
  };
}

export default function PropertyForm({
  id,
  initialData,
}: {
  id?: string;
  initialData?: Record<string, unknown>;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(
    initialData ? rowToForm(initialData) : EMPTY_FORM,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      title: form.title.trim(),
      price: Number(form.price) || 0,
      city: form.city,
      neighborhood: form.neighborhood.trim(),
      type: form.type,
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      area: Number(form.area) || 0,
      year_built: Number(form.year_built) || null,
      description: form.description.trim(),
      photos: form.photos
        .split(',')
        .map((u) => u.trim())
        .filter(Boolean),
      featured: form.featured,
    };

    const supabase = createClient();
    let err: { message: string } | null = null;

    if (id) {
      ({ error: err } = await supabase.from('properties').update(payload).eq('id', id));
    } else {
      ({ error: err } = await supabase.from('properties').insert(payload));
    }

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    router.push('/admin');
  }

  const inputCls =
    'w-full px-4 py-3 rounded-xl bg-brand-100 border border-brand-200 text-brand-800 text-sm ' +
    'placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-gold-400 ' +
    'focus:border-gold-400 transition-colors';

  const labelCls =
    'block text-[11px] font-semibold text-brand-500 mb-1.5 tracking-widest uppercase';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {/* Title — full width */}
        <div className="md:col-span-2">
          <label className={labelCls}>Title</label>
          <input
            type="text"
            required
            placeholder="e.g. 3-Bedroom Apartment in Floreasca"
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Price */}
        <div>
          <label className={labelCls}>Price (€)</label>
          <input
            type="number"
            required
            min="0"
            placeholder="245000"
            value={form.price}
            onChange={(e) => set('price', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Type */}
        <div>
          <label className={labelCls}>Type</label>
          <select
            required
            value={form.type}
            onChange={(e) => set('type', e.target.value)}
            className={inputCls}
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t} className="bg-brand-100 capitalize">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className={labelCls}>City</label>
          <select
            required
            value={form.city}
            onChange={(e) => set('city', e.target.value)}
            className={inputCls}
          >
            <option value="" className="bg-brand-100">
              Select city…
            </option>
            {CITIES.map((c) => (
              <option key={c} value={c} className="bg-brand-100">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Neighborhood */}
        <div>
          <label className={labelCls}>Neighborhood</label>
          <input
            type="text"
            placeholder="e.g. Floreasca"
            value={form.neighborhood}
            onChange={(e) => set('neighborhood', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label className={labelCls}>Bedrooms</label>
          <input
            type="number"
            min="0"
            placeholder="3"
            value={form.bedrooms}
            onChange={(e) => set('bedrooms', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label className={labelCls}>Bathrooms</label>
          <input
            type="number"
            min="0"
            placeholder="2"
            value={form.bathrooms}
            onChange={(e) => set('bathrooms', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Area */}
        <div>
          <label className={labelCls}>Area (m²)</label>
          <input
            type="number"
            min="0"
            placeholder="95"
            value={form.area}
            onChange={(e) => set('area', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Year built */}
        <div>
          <label className={labelCls}>Year Built</label>
          <input
            type="number"
            min="1800"
            max="2030"
            placeholder="2019"
            value={form.year_built}
            onChange={(e) => set('year_built', e.target.value)}
            className={inputCls}
          />
        </div>

        {/* Description — full width */}
        <div className="md:col-span-2">
          <label className={labelCls}>Description</label>
          <textarea
            required
            rows={5}
            placeholder="Describe the property…"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            className={`${inputCls} resize-none`}
          />
        </div>

        {/* Photos — full width */}
        <div className="md:col-span-2">
          <label className={labelCls}>Photo URLs (comma-separated)</label>
          <textarea
            rows={3}
            placeholder="https://images.example.com/photo1.jpg, https://…"
            value={form.photos}
            onChange={(e) => set('photos', e.target.value)}
            className={`${inputCls} resize-none font-mono text-xs`}
          />
          <p className="text-brand-400 text-xs mt-1.5">
            Paste one or more image URLs separated by commas.
          </p>
        </div>

        {/* Featured toggle — full width */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3.5 cursor-pointer select-none group w-fit">
            <div
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                form.featured ? 'bg-gold-400' : 'bg-brand-200'
              }`}
              onClick={() => set('featured', !form.featured)}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                  form.featured ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </div>
            <span className="text-sm text-brand-600 group-hover:text-brand-800 transition-colors">
              Mark as featured property
            </span>
          </label>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-800/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-gold-400 text-brand-900 rounded-xl font-semibold text-sm
            hover:bg-gold-500 active:scale-[0.98] transition-all
            disabled:opacity-60 disabled:cursor-not-allowed
            shadow-[0_4px_16px_rgba(201,163,94,0.3)]"
        >
          {loading ? 'Saving…' : id ? 'Update Property' : 'Add Property'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-6 py-3 bg-brand-100 text-brand-600 rounded-xl font-medium text-sm
            hover:bg-brand-200 hover:text-brand-800 transition-colors border border-brand-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
