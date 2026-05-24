"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const LOCALE_KEY = "preferred_locale";
const COOKIE_NAME = "NEXT_LOCALE";

const LANGUAGES = [
  {
    code: "en",
    countryCode: "gb",
    name: "English",
    photo: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80",
  },
  {
    code: "ro",
    countryCode: "ro",
    name: "Română",
    photo: "/bucharest.jpg",
  },
  {
    code: "tr",
    countryCode: "tr",
    name: "Türkçe",
    photo: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80",
  },
  {
    code: "ar",
    countryCode: "sa",
    name: "العربية",
    photo: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&q=80",
  },
] as const;

export default function LanguagePicker() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const t = useTranslations("languagePicker");

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_KEY);
    if (!saved) setShow(true);
  }, []);

  function choose(code: string) {
    localStorage.setItem(LOCALE_KEY, code);
    document.cookie = `${COOKIE_NAME}=${code}; path=/; max-age=31536000; SameSite=Lax`;
    setShow(false);
    router.push("/", { locale: code as "en" | "ro" | "tr" | "ar" });
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md">
      <style>{`
        @keyframes lpFadeUp {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div
        className="bg-brand-100 rounded-2xl border border-brand-200 max-w-md w-full mx-4 p-8"
        style={{
          boxShadow: "0 32px 64px rgba(8,8,9,0.8), 0 0 0 1px rgba(201,163,94,0.08)",
          animation: "lpFadeUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {/* Header */}
        <div className="text-center mb-7">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-8"
              style={{ background: "linear-gradient(to right, transparent, rgba(201,163,94,0.9))" }}
            />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold-400 rounded-[1px] shrink-0" />
            <div
              className="h-px w-8"
              style={{ background: "linear-gradient(to left, transparent, rgba(201,163,94,0.9))" }}
            />
          </div>
          <h2 className="font-heading text-3xl font-semibold text-brand-800 mb-1.5">
            {t("title")}
          </h2>
          <p className="text-brand-500 text-sm">{t("subtitle")}</p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => choose(lang.code)}
              dir={lang.code === "ar" ? "rtl" : "ltr"}
              className="group relative flex flex-col items-center justify-center gap-3 h-32 rounded-xl overflow-hidden border border-brand-200 hover:border-gold-400/70 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:border-gold-400 transition-all duration-200"
              style={{
                boxShadow: "0 0 0 0 rgba(201,163,94,0)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 0 1px rgba(201,163,94,0.25), 0 8px 28px rgba(201,163,94,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 0 0 rgba(201,163,94,0)";
              }}
            >
              {/* Country photo */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${lang.photo})` }}
              />

              {/* Dark overlay — lightens on hover to reveal more photo */}
              <div className="absolute inset-0 bg-brand-900/68 group-hover:bg-brand-900/50 transition-colors duration-300" />

              {/* Flag */}
              <span
                className={`relative fi fi-${lang.countryCode} rounded-sm shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.5)]`}
                style={{
                  width: "3rem",
                  height: "2.25rem",
                  backgroundSize: "cover",
                  display: "inline-block",
                }}
                aria-hidden="true"
              />

              {/* Language name */}
              <span className="relative text-sm font-medium text-brand-600 group-hover:text-brand-800 transition-colors duration-200">
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
