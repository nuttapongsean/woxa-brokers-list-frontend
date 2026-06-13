import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-line p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <span
        className="flex items-center w-[49px] h-7 font-bold text-[20px] leading-7 text-logo shrink-0"
        style={{ letterSpacing: '-1.2px', fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
      >
        Woxa
      </span>

      <ul className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-6 list-none">
        {[
          { key: 'privacyPolicy', href: `/${locale}/privacy` },
          { key: 'termsOfService', href: `/${locale}/terms` },
          { key: 'riskDisclosure', href: `/${locale}/risk-disclosure` },
          { key: 'contact', href: `/${locale}/contact` },
        ].map(({ key, href }) => (
          <li key={key}>
            <Link
              href={href}
              className="text-xs font-medium text-ink-dim uppercase tracking-widest hover:text-ink-muted transition-colors"
            >
              {t(key as 'privacyPolicy' | 'termsOfService' | 'riskDisclosure' | 'contact')}
            </Link>
          </li>
        ))}
      </ul>

      <span className="text-[11px] text-ink-dim uppercase tracking-wide">
        {t('copyright')}
      </span>
    </footer>
  );
}
