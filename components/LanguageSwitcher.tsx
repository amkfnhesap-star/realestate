"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const LOCALE_KEY = "preferred_locale";
const COOKIE_NAME = "NEXT_LOCALE";

const LANGUAGES = [
  { code: "en", countryCode: "gb", label: "EN" },
  { code: "ro", countryCode: "ro", label: "RO" },
  { code: "tr", countryCode: "tr", label: "TR" },
  { code: "ar", countryCode: "sa", label: "AR" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(code: string) {
    localStorage.setItem(LOCALE_KEY, code);
    document.cookie = `${COOKIE_NAME}=${code}; path=/; max-age=31536000; SameSite=Lax`;
    setOpen(false);
    router.replace(pathname, { locale: code as "en" | "ro" | "tr" | "ar" });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-200 hover:border-brand-300 bg-brand-100 hover:bg-brand-50 text-sm font-medium text-brand-700 transition-colors"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span
          className={`fi fi-${current.countryCode}`}
          style={{ width: "1.25rem", height: "0.9375rem", backgroundSize: "cover", display: "inline-block" }}
          aria-hidden="true"
        />
        <span>{current.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-brand-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute end-0 mt-1.5 w-36 bg-brand-100 rounded-xl border border-brand-200 shadow-2xl shadow-brand-950/60 overflow-hidden z-50"
          role="listbox"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              role="option"
              aria-selected={lang.code === locale}
              className={`
                w-full flex items-center gap-2 px-3 py-2.5 text-sm text-start transition-colors
                hover:bg-brand-50 hover:text-brand-800
                ${lang.code === locale ? "bg-brand-50 text-gold-400 font-medium" : "text-brand-600"}
              `}
            >
              <span
                className={`fi fi-${lang.countryCode}`}
                style={{ width: "1.25rem", height: "0.9375rem", backgroundSize: "cover", display: "inline-block" }}
                aria-hidden="true"
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
