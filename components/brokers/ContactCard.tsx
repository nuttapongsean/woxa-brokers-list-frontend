import { useTranslations } from 'next-intl';
import type { ContactInfo } from '@/types';

interface ContactCardProps {
  contact: ContactInfo;
}

export function ContactCard({ contact }: ContactCardProps) {
  const t = useTranslations('brokerDetail');

  return (
    <div className="bg-surface border border-line rounded-xl p-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink-dim mb-4">
        {t('contactDetails')}
      </h3>

      <div className="flex flex-col divide-y divide-line">
        {contact.address && (
          <div className="flex items-center gap-2.5 py-2.5 text-[13px] text-ink-muted">
            <LocationIcon />
            {contact.address}
          </div>
        )}
        {contact.email && (
          <div className="flex items-center gap-2.5 py-2.5 text-[13px] text-ink-muted">
            <EmailIcon />
            <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors">
              {contact.email}
            </a>
          </div>
        )}
        {contact.website && (
          <div className="flex items-center gap-2.5 py-2.5 text-[13px] text-ink-muted">
            <GlobeIcon />
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {contact.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-dim flex-shrink-0" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-dim flex-shrink-0" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-dim flex-shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
