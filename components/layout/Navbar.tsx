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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-2xl font-semibold text-brand-800 tracking-wide shrink-0"
          >
            RoEstate
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-brand-800 ${
                  pathname === href ? "text-brand-800" : "text-slate-600"
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {/* Right: Language switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gold-400 hover:bg-gold-500 text-white transition-colors whitespace-nowrap"
            >
              {t("scheduleViewing")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-slate-600 hover:text-brand-800 hover:bg-slate-100"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 end-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200">
          <span className="font-heading text-xl font-semibold text-brand-800">RoEstate</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md text-slate-500 hover:text-brand-800"
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
              className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand-800 ${
                pathname === href ? "bg-brand-50 text-brand-800" : "text-slate-700"
              }`}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="px-4 pb-6 flex flex-col gap-3 border-t border-slate-100 pt-4">
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center px-4 py-3 rounded-lg text-sm font-semibold bg-gold-400 hover:bg-gold-500 text-white transition-colors"
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
