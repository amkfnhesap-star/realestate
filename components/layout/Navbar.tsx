"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "properties", href: "/properties" },
  { key: "about", href: "/about" },
  { key: "sellers", href: "/sellers" },
  { key: "buyers", href: "/buyers" },
  { key: "contact", href: "/contact" },
] as const;

function LogoMark() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <div className="w-8 h-8 rounded-full bg-gold-400 flex items-center justify-center shadow-[0_0_14px_rgba(201,163,94,0.4)]">
        <span className="font-heading text-sm font-bold text-brand-900 leading-none select-none">R</span>
      </div>
      <span className="font-heading text-2xl tracking-wide leading-none">
        <span className="text-gold-400 font-semibold">Ro</span>
        <span className="text-brand-800 font-medium">Estate</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md border-b border-brand-200" style={{ background: 'rgba(14,14,16,0.92)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <LogoMark />

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-gold-400"
                    : "text-brand-500 hover:text-brand-800"
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gold-400 hover:bg-gold-500 text-brand-900 transition-colors whitespace-nowrap shadow-[0_2px_10px_rgba(201,163,94,0.25)]"
            >
              {t("scheduleViewing")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-brand-500 hover:text-brand-800 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-sm" style={{ background: 'rgba(8,8,9,0.7)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 end-0 h-full w-72 bg-brand-50 z-50 shadow-2xl transform transition-transform duration-300 border-s border-brand-200 ${
          mobileOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-brand-200">
          <LogoMark />
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md text-brand-500 hover:text-brand-800 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-brand-100 text-gold-400"
                  : "text-brand-500 hover:bg-brand-100 hover:text-brand-800"
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="px-4 pb-6 flex flex-col gap-3 border-t border-brand-200 pt-4">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center px-4 py-3 rounded-lg text-sm font-semibold bg-gold-400 hover:bg-gold-500 text-brand-900 transition-colors"
          >
            {t("scheduleViewing")}
          </Link>
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
