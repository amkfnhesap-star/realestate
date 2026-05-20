import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="font-heading text-5xl md:text-7xl font-semibold text-brand-800 mb-6 leading-tight">
        {t("title")}
      </h1>
      <p className="text-slate-500 text-lg md:text-xl max-w-md">
        {t("subtitle")}
      </p>
      <div className="mt-10 flex gap-3 items-center">
        <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse delay-150" />
        <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse delay-300" />
      </div>
    </div>
  );
}
