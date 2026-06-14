import { getTranslations } from 'next-intl/server';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { PerformanceMetrics as Metrics } from '@/lib/schemas/broker';

interface PerformanceMetricsProps {
  metrics: Metrics;
}

export async function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const t = await getTranslations('brokerDetail');
  const tm = await getTranslations('brokerDetail.metrics');

  return (
    <div className="bg-sub rounded-xl p-6 mb-8">
      <h3 className="text-[18px] font-display font-semibold text-logo mb-4">{t('performanceMetrics')}</h3>

      {metrics.aumGrowthYoY && (
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1">
            {tm('aumGrowth')}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-display text-[26px] font-bold text-logo">{metrics.aumGrowthYoY}</span>
            <TrendUpIcon />
          </div>
        </div>
      )}

      {metrics.liquidityAccess && (
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1">
            {tm('liquidityAccess')}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-display text-[26px] font-bold text-logo">{metrics.liquidityAccess}</span>
            {metrics.liquidityAccessSub && (
              <span className="text-[11px] text-ink-dim">{metrics.liquidityAccessSub}</span>
            )}
          </div>
        </div>
      )}

      {metrics.clientRetention && (
        <div className="mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-1">
            {tm('clientRetention')}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-display text-[26px] font-bold text-logo">{metrics.clientRetention}</span>
            {metrics.clientRetentionPeriod && (
              <span className="text-[11px] text-ink-dim">{metrics.clientRetentionPeriod}</span>
            )}
          </div>
        </div>
      )}

      <Button variant="outline" size="md" className="w-full text-logo rounded border-[0.5px] border-logo hover:border-logo/50 hover:text-logo/50">
        {t('viewAuditReport')}
      </Button>
    </div>
  );
}

function TrendUpIcon() {
  return (
    <div className="w-20 h-9 rounded bg-chip flex items-center justify-center">
      <TrendingUp size={16} aria-hidden="true" className="text-logo" />
    </div>
  );
}
