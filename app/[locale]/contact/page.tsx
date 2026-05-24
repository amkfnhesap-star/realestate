import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import InquiryForm from '@/components/InquiryForm';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.86A16 16 0 0 0 15.14 16l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.5v-.58Z"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

function ContactContent() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');

  const OFFICE_ITEMS = [
    { icon: <MapPinIcon />, label: t('office.addressLabel'), value: t('office.address') },
    { icon: <PhoneIcon />, label: t('office.phoneLabel'), value: t('office.phone'), href: `tel:${t('office.phone').replace(/\s/g, '')}` },
    { icon: <MailIcon />, label: t('office.emailLabel'), value: t('office.email'), href: `mailto:${t('office.email')}` },
    { icon: <ClockIcon />, label: t('office.hoursLabel'), value: t('office.hours') },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-brand-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-semibold text-white mb-4">{t('heading')}</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="bg-brand-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
              <h2 className="font-heading text-2xl font-semibold text-brand-800 mb-6">{t('form.heading')}</h2>
              <InquiryForm />
            </div>

            {/* Office info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
                <h2 className="font-heading text-2xl font-semibold text-brand-800 mb-6">{t('office.heading')}</h2>
                <div className="space-y-5">
                  {OFFICE_ITEMS.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="text-gold-500 mt-0.5 flex-shrink-0">{item.icon}</div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-brand-800 hover:text-gold-600 transition-colors text-sm font-medium whitespace-pre-line">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-brand-800 text-sm font-medium whitespace-pre-line">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/40700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white rounded-2xl py-4 font-medium hover:opacity-90 transition-opacity shadow-sm"
              >
                <WhatsappIcon />
                {t('office.whatsapp')}
              </a>

              {/* Map placeholder */}
              <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <div className="h-52 bg-brand-100 flex flex-col items-center justify-center gap-2 text-brand-400">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                    <line x1="9" y1="3" x2="9" y2="18"/>
                    <line x1="15" y1="6" x2="15" y2="21"/>
                  </svg>
                  <p className="text-sm font-medium">{tCommon('mapComingSoon')}</p>
                  <p className="text-xs text-brand-300">{t('office.address')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
