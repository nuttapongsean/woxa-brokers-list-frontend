'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Building2, ArrowRight,
  Shield, TrendingUp, Landmark, BarChart2, Zap, Lock, Star, Globe,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { Broker } from '@/lib/schemas/broker';

const ICON_MAP: Record<string, LucideIcon> = {
  shield: Shield,
  'trending-up': TrendingUp,
  landmark: Landmark,
  'bar-chart': BarChart2,
  zap: Zap,
  lock: Lock,
  star: Star,
  globe: Globe,
};

interface BrokerCardProps {
  broker: Broker;
  locale: string;
  priority?: boolean;
}

export function BrokerCard({ broker, locale, priority = false }: BrokerCardProps) {
  const t = useTranslations('brokers.card');
  const TagIcon: LucideIcon = broker.icon ? (ICON_MAP[broker.icon] ?? Shield) : Shield;

  return (
    <article className="bg-surface rounded-xl overflow-hidden group cursor-pointer transition-all hover:border-line-light hover:-translate-y-0.5 flex flex-col">
      {/* Image */}
      <div className="relative h-[320px] overflow-hidden bg-surface-2 shrink-0">
        {broker.imageUrl ? (
          <Image
            src={broker.imageUrl}
            alt={broker.name}
            fill
            className="object-cover brightness-75 grayscale group-hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
            priority={priority}
            loading={priority ? undefined : 'lazy'}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-2 to-base flex items-center justify-center">
            <Building2 size={40} stroke="#1e3a5a" strokeWidth={1} aria-hidden="true" />
          </div>
        )}
        {broker.badge && (
          <div className="absolute top-3 right-3">
            <Badge variant="premium">{broker.badge}</Badge>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-[17px] font-semibold text-ink mb-2">{broker.name}</h3>
        <p className="text-[13px] text-ink-muted leading-[1.55] mb-4 line-clamp-3 flex-1">
          {broker.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          {broker.tag && (
            <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase text-ink-dim">
              <TagIcon size={14} className="text-ink-body" aria-hidden="true" />
              {broker.tag}
            </span>
          )}
          <Link
            href={`/${locale}/brokers/${broker.slug}`}
            className="text-logo flex items-center gap-1.5 text-[13px] font-bold text-ink-body hover:text-logo/80 transition-colors ml-auto"
            aria-label={`View details for ${broker.name}`}
          >
            {t('viewDetails')} <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
