import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  const sections = [
    {
      title: t('sections.platform'),
      links: [
        { label: t('platform.brokers'), href: `/${locale}/brokers` },
        { label: t('platform.markets'), href: `/${locale}/markets` },
        { label: t('platform.analysis'), href: `/${locale}/analysis` },
        { label: t('platform.education'), href: `/${locale}/education` },
      ],
    },
    {
      title: t('sections.company'),
      links: [
        { label: t('company.about'), href: `/${locale}/about` },
        { label: t('company.careers'), href: `/${locale}/careers` },
        { label: t('company.press'), href: `/${locale}/press` },
        { label: t('company.blog'), href: `/${locale}/blog` },
      ],
    },
    {
      title: t('sections.resources'),
      links: [
        { label: t('resources.contact'), href: `/${locale}/contact` },
        { label: t('resources.helpCenter'), href: `/${locale}/help` },
        { label: t('resources.apiDocs'), href: `/${locale}/docs` },
        { label: t('resources.status'), href: `/${locale}/status` },
      ],
    },
    {
      title: t('sections.community'),
      links: [
        { label: t('community.discord'), href: 'https://discord.com' },
        { label: t('community.newsletter'), href: `/${locale}/newsletter` },
        { label: t('community.forum'), href: `/${locale}/forum` },
        { label: t('community.submitBroker'), href: `/${locale}/brokers/submit` },
      ],
    },
  ];

  return (
    <footer className="border-t border-line/40 mt-auto">
      {/* Main grid */}
      <div className="px-8 md:px-12 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <span
            className="font-bold text-[20px] leading-7 text-logo"
            style={{ letterSpacing: '-1.2px', fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
          >
            Woxa
          </span>
          <p className="text-sm text-ink-dim leading-relaxed">
            {t('brandDesc')}
          </p>
          <div className="flex items-center gap-4">
            {[
              {
                href: 'https://linkedin.com',
                label: 'LinkedIn',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M22 3.47V20.53c0 .39-.155.765-.43 1.04a1.475 1.475 0 0 1-1.04.43H3.47a1.475 1.475 0 0 1-1.04-.43A1.475 1.475 0 0 1 2 20.53V3.47c0-.39.155-.765.43-1.04A1.475 1.475 0 0 1 3.47 2H20.53c.39 0 .765.155 1.04.43.275.275.43.65.43 1.04ZM7.882 9.647H4.941v9.412h2.941V9.647Zm.265-3.235a1.47 1.47 0 0 0-.882-1.35 1.47 1.47 0 0 0-1.6.318 1.47 1.47 0 0 0 0 2.079 1.47 1.47 0 0 0 2.482-1.047ZM19.06 13.34c0-2.829-1.8-3.929-3.588-3.929-.585-.03-1.168.097-1.69.364a2.993 2.993 0 0 0-1.159 1.066h-.082V9.647H9.647v9.412h2.941v-5.007a1.76 1.76 0 0 1 1.765-1.912c.935 0 1.629.588 1.629 2.07v4.849h2.941l.035-5.718Z" /></svg>,
              },
              {
                href: 'https://facebook.com',
                label: 'Facebook',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" /></svg>,
              },
              {
                href: 'https://instagram.com',
                label: 'Instagram',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2c-2.716 0-3.056.011-4.123.06-1.064.049-1.791.218-2.427.465a4.902 4.902 0 0 0-1.772 1.153A4.902 4.902 0 0 0 2.525 5.45C2.278 6.085 2.109 6.813 2.06 7.877 2.012 8.944 2 9.283 2 12c0 2.717.011 3.056.06 4.122.049 1.065.218 1.792.465 2.428a4.902 4.902 0 0 0 1.153 1.772 4.902 4.902 0 0 0 1.772 1.153c.636.247 1.363.416 2.428.465C8.944 21.989 9.283 22 12 22c2.716 0 3.056-.011 4.122-.06 1.065-.049 1.792-.218 2.428-.465a4.902 4.902 0 0 0 1.772-1.153 4.902 4.902 0 0 0 1.153-1.772c.247-.636.416-1.363.465-2.428C21.989 15.056 22 14.717 22 12c0-2.716-.011-3.056-.06-4.123-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 0 0-1.153-1.772A4.902 4.902 0 0 0 18.55 2.525C17.915 2.278 17.187 2.109 16.123 2.06 15.056 2.012 14.717 2 12 2Zm0 1.802c2.67 0 2.987.01 4.042.058.976.045 1.505.207 1.858.344.466.181.8.398 1.15.748.35.35.566.683.747 1.15.137.352.3.882.344 1.857.048 1.055.058 1.372.058 4.041 0 2.67-.01 2.987-.058 4.042-.045.976-.207 1.505-.344 1.858a3.1 3.1 0 0 1-.748 1.15 3.1 3.1 0 0 1-1.15.747c-.352.137-.882.3-1.857.344-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.042-.058-.976-.045-1.505-.207-1.858-.344a3.1 3.1 0 0 1-1.15-.748 3.1 3.1 0 0 1-.747-1.15c-.137-.352-.3-.882-.344-1.857C3.812 14.987 3.802 14.67 3.802 12c0-2.67.01-2.987.058-4.042.045-.976.207-1.505.344-1.858.181-.466.398-.8.748-1.15.35-.35.683-.566 1.15-.747.352-.137.882-.3 1.857-.344C9.013 3.812 9.33 3.802 12 3.802Zm0 11.535A3.337 3.337 0 1 1 12 8.663a3.337 3.337 0 0 1 0 6.674Zm0-8.477a5.14 5.14 0 1 0 0 10.28A5.14 5.14 0 0 0 12 6.86Zm6.635-.094a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 0 1 2.44 0Z" /></svg>,
              },
              {
                href: 'https://youtube.com',
                label: 'YouTube',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M20.595 4.46A2.737 2.737 0 0 1 22.54 6.405C23 8.12 23 11.7 23 11.7s0 3.581-.46 5.296a2.737 2.737 0 0 1-1.945 1.945C18.88 19.4 12 19.4 12 19.4s-6.88 0-8.595-.46a2.737 2.737 0 0 1-1.945-1.944C1 15.281 1 11.7 1 11.7s0-3.58.46-5.295A2.737 2.737 0 0 1 3.405 4.46C5.12 4 12 4 12 4s6.88 0 8.595.46ZM15.513 11.7 9.798 15v-6.6l5.715 3.3Z" /></svg>,
              },
              {
                href: 'https://tiktok.com',
                label: 'TikTok',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M16.822 5.134C16.089 4.294 15.648 3.198 15.648 2h-2.919l-.004 13.777a2.884 2.884 0 0 1-2.883 2.782 2.887 2.887 0 0 1-2.886-2.888 2.887 2.887 0 0 1 2.886-2.887c.283 0 .554.043.813.117V9.342a6.178 6.178 0 0 0-.813-.054C7.028 9.288 4 12.324 4 16.088 4 19.855 7.028 22.89 10.842 22.89c3.812 0 6.814-3.001 6.814-6.802V8.682a8.948 8.948 0 0 0 5.24 1.682V7.196a5.368 5.368 0 0 1-3.027-.96 5.36 5.36 0 0 1-2.047-3.102Z" /></svg>,
              },
              {
                href: 'https://discord.com',
                label: 'Discord',
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path d="M18.894 4.344A17.168 17.168 0 0 0 14.532 3a.064.064 0 0 0-.068.032c-.188.335-.396.771-.542 1.114a15.849 15.849 0 0 0-4.761 0 11.27 11.27 0 0 0-.55-1.114.067.067 0 0 0-.068-.032 17.13 17.13 0 0 0-4.362 1.344.06.06 0 0 0-.028.024C1.763 8.42 1.017 12.396 1.39 16.323a.071.071 0 0 0 .027.048 17.25 17.25 0 0 0 5.188 2.623.068.068 0 0 0 .074-.024c.4-.547.756-1.124 1.06-1.73a.066.066 0 0 0-.036-.092 11.368 11.368 0 0 1-1.621-.773.067.067 0 0 1-.007-.111c.109-.082.218-.167.322-.253a.065.065 0 0 1 .068-.009c3.402 1.554 7.085 1.554 10.446 0a.065.065 0 0 1 .069.008c.104.086.213.172.323.254a.067.067 0 0 1-.006.111c-.517.302-1.056.558-1.622.772a.066.066 0 0 0-.035.093c.311.605.667 1.182 1.059 1.729a.067.067 0 0 0 .074.025 17.21 17.21 0 0 0 5.196-2.623.068.068 0 0 0 .027-.047c.434-4.492-.727-8.394-3.077-11.955a.053.053 0 0 0-.027-.025ZM8.056 13.9c-1.046 0-1.908-.96-1.908-2.142 0-1.18.845-2.141 1.908-2.141 1.071 0 1.924.969 1.908 2.141 0 1.183-.845 2.142-1.908 2.142Zm7.01 0c-1.046 0-1.908-.96-1.908-2.142 0-1.18.844-2.141 1.907-2.141 1.071 0 1.924.969 1.908 2.141 0 1.183-.837 2.142-1.907 2.142Z" /></svg>,
              },
            ].map(({ href, label, svg }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-ink-dim hover:text-ink transition-colors"
              >
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* Section columns */}
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-logo">
              {section.title}
            </h3>
            <ul className="flex flex-col list-none">
              {section.links.map(({ label, href }) => (
                <li key={href}>
                  {href.startsWith('http') ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-dim hover:text-ink-muted transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-sm text-ink-dim hover:text-ink-muted transition-colors"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line/40 px-8 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[11px] text-ink-dim uppercase tracking-wide">
          {t('copyright')}
        </span>
        <div className="flex items-center gap-5">
          {[
            { label: t('legal.privacyPolicy'), href: `/${locale}/privacy` },
            { label: t('legal.termsOfService'), href: `/${locale}/terms` },
            { label: t('legal.riskDisclosure'), href: `/${locale}/risk-disclosure` },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] uppercase tracking-widest text-ink-dim hover:text-ink-muted transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
