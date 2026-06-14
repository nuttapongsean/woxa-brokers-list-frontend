import { useTranslations } from 'next-intl';
import { MapPin, Mail, Globe } from 'lucide-react';
import type { ContactInfo } from '@/types';

interface ContactCardProps {
  contact: ContactInfo;
}

export function ContactCard({ contact }: ContactCardProps) {
  const t = useTranslations('brokerDetail');

  return (
    <div className="bg-surface rounded-xl p-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink-dim mb-4">
        {t('contactDetails')}
      </h3>

      <div className="flex flex-col">
        {contact.address && (
          <div className="flex items-center gap-2.5 text-[13px]">
            <LocationIcon />
            {contact.address}
          </div>
        )}
        {contact.email && (
          <div className="flex items-center gap-2.5 text-[13px]">
            <EmailIcon />
            <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors">
              {contact.email}
            </a>
          </div>
        )}
        {contact.website && (
          <div className="flex items-center gap-2.5 text-[13px]">
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
  return <MapPin size={14} className="text-ink-dim flex-shrink-0" aria-hidden="true" />;
}

function EmailIcon() {
  return <Mail size={14} className="text-ink-dim flex-shrink-0" aria-hidden="true" />;
}

function GlobeIcon() {
  return <Globe size={14} className="text-ink-dim flex-shrink-0" aria-hidden="true" />;
}
