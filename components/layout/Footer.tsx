import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const ts = useTranslations("site");

  return (
    <footer className="bg-brand-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <p className="font-heading text-2xl font-semibold text-white mb-3">
              {ts("name")}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {(["properties", "about", "contact"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key === "about" ? "about" : key}`}
                    className="text-sm text-slate-400 hover:text-gold-400 transition-colors"
                  >
                    {tn(key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sellers" className="text-sm text-slate-400 hover:text-gold-400 transition-colors">
                  {tn("sellers")}
                </Link>
              </li>
              <li>
                <Link href="/buyers" className="text-sm text-slate-400 hover:text-gold-400 transition-colors">
                  {tn("buyers")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("legal")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-slate-400 hover:text-gold-400 transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-400 hover:text-gold-400 transition-colors">
                  {t("termsOfService")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-slate-400 hover:text-gold-400 transition-colors">
                  {t("cookiePolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <PhoneIcon />
                <span>{t("phone")}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MailIcon />
                <span>{t("email")}</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPinIcon />
                <span>{t("address")}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">{t("copyright")}</p>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
            <span>{ts("name")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
