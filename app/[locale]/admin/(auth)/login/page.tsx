'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { createClient } from '@/utils/supabase/client';

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center shadow-[0_0_18px_rgba(201,163,94,0.45)]">
        <span className="font-heading text-base font-bold text-brand-900 leading-none select-none">
          R
        </span>
      </div>
      <span className="font-heading text-3xl tracking-wide leading-none">
        <span className="text-gold-400 font-semibold">Ro</span>
        <span className="text-brand-800 font-medium">Estate</span>
      </span>
    </div>
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/admin');
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-brand-100 border border-brand-200 text-brand-800 text-sm ' +
    'placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-gold-400 ' +
    'focus:border-gold-400 transition-colors';

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-brand-900">
      <div className="w-full max-w-md">
        <div className="bg-brand-50 rounded-2xl border border-brand-200 shadow-[0_8px_48px_rgba(0,0,0,0.7)] px-8 py-10 space-y-8">
          <div className="flex justify-center">
            <LogoMark />
          </div>

          <div className="text-center space-y-1">
            <h1 className="font-heading text-3xl font-semibold text-brand-800 tracking-wide">
              Admin Portal
            </h1>
            <p className="text-brand-500 text-sm">Sign in to manage your listings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-brand-500 mb-1.5 tracking-widest uppercase">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-brand-500 mb-1.5 tracking-widest uppercase">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-800/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-400 text-brand-900 py-3.5 rounded-xl font-semibold text-sm
                hover:bg-gold-500 active:scale-[0.98] transition-all
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-[0_4px_16px_rgba(201,163,94,0.35)]"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-brand-400 text-xs mt-6 tracking-wide">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
