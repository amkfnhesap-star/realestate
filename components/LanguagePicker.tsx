"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const LOCALE_KEY = "preferred_locale";
const COOKIE_NAME = "NEXT_LOCALE";

const LANGUAGES = [
  { code: "en", flag: "🇬🇧", name: "English", native: "English" },
  { code: "ro", flag: "🇷🇴", name: "Română", native: "Română" },
  { code: "tr", flag: "🇹🇷", name: "Türkçe", native: "Türkçe" },
  { code: "ar", flag: "🇸🇦", name: "العربية", native: "العربية" },
];

export default function LanguagePicker() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const t = useTranslations("languagePicker");

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_KEY);
    if (!saved) {
      setShow(true);
    }
  }, []);

  function choose(code: string) {
    localStorage.setItem(LOCALE_KEY, code);
    document.cookie = `${COOKIE_NAME}=${code}; path=/; max-age=31536000; SameSite=Lax`;
    setShow(false);
    router.push("/", { locale: code as "en" | "ro" | "tr" | "ar" });
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
        <h2 className="font-heading text-2xl font-semibold text-brand-800 text-center mb-1">
          {t("title")}
        </h2>
        <p className="text-slate-500 text-sm text-center mb-6">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => choose(lang.code)}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200
                bg-white hover:bg-brand-50 hover:border-brand-300
                transition-all duration-150 cursor-pointer group
                ${lang.code === "ar" ? "text-right" : ""}
              `}
              dir={lang.code === "ar" ? "rtl" : "ltr"}
            >
              <span className="text-3xl">{lang.flag}</span>
              <span className="text-sm font-medium text-slate-800 group-hover:text-brand-800">
                {lang.native}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
