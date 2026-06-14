import { getTranslations } from 'next-intl/server';
import { MapPin, Mail, Globe } from 'lucide-react';

interface ContactCardProps {
  address?: string | null;
  email?: string | null;
  website?: string | null;
}

export async function ContactCard({ address, email, website }: ContactCardProps) {
  const t = await getTranslations('brokerDetail');

  return (
    <div className="bg-surface rounded-xl p-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-ink-dim mb-4">
        {t('contactDetails')}
      </h3>

      <div className="flex flex-col">
        {address && (
          <div className="flex items-center gap-2.5 text-[13px]">
            <MapPin size={14} className="text-ink-dim flex-shrink-0" aria-hidden="true" />
            {address}
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2.5 text-[13px]">
            <Mail size={14} className="text-ink-dim flex-shrink-0" aria-hidden="true" />
            <a href={`mailto:${email}`} className="hover:text-accent transition-colors">
              {email}
            </a>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-2.5 text-[13px]">
            <Globe size={14} className="text-ink-dim flex-shrink-0" aria-hidden="true" />
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              {website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
