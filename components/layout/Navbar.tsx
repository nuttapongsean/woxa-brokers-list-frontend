'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Bell, CircleUserRound, LogOut, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrentUser, useLogout } from '@/hooks/useAuth';

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: user } = useCurrentUser();
  const { mutate: logout } = useLogout();

  const handleLogout = () => logout(undefined, { onSuccess: () => router.push(`/${locale}/login`) });

  const navLinks = [
    { key: 'brokers', href: `/${locale}/brokers` },
    { key: 'markets', href: `/${locale}/markets` },
    { key: 'analysis', href: `/${locale}/analysis` },
    { key: 'education', href: `/${locale}/education` },
  ] as const;

  const linkClass = (href: string) =>
    cn(
      'font-display text-[16px] leading-6 tracking-[0.4px] transition-colors border-b pb-0.5',
      pathname === href || pathname.startsWith(href + '/')
        ? 'text-ink border-accent'
        : 'text-ink-body border-transparent hover:text-ink hover:border-accent'
    );

  return (
    <nav className="mt-2 z-50 relative">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 md:px-12 py-4">
        {/* Logo */}
        <Link
          href={`/${locale}/brokers`}
          className="flex items-center w-[62px] h-8 font-bold text-2xl leading-8 text-logo shrink-0"
          style={{ letterSpacing: '-1.2px', fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
        >
          Woxa
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-9 list-none">
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <Link href={href} className={linkClass(href)}>{t(key)}</Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="flex items-center justify-center text-logo hover:text-ink transition-colors"
          >
            <Bell size={20} strokeWidth={2} aria-hidden="true" />
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="flex items-center justify-center text-logo hover:text-ink transition-colors"
            >
              <LogOut size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          ) : (
            <Link
              href={`/${locale}/login`}
              aria-label="Account"
              className="flex items-center justify-center text-logo hover:text-ink transition-colors"
            >
              <CircleUserRound size={20} strokeWidth={2} aria-hidden="true" />
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden flex items-center justify-center text-logo hover:text-ink transition-colors"
          >
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <ul
          className="md:hidden flex flex-col list-none border-t border-line bg-surface px-4 py-3 gap-0"
          onClick={() => setMobileOpen(false)}
        >
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className={cn(linkClass(href), 'block py-3 border-b border-line last:border-b-0')}
              >
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
