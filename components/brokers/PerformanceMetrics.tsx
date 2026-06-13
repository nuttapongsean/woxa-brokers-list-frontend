import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import type { PerformanceMetrics as Metrics } from '@/types';

interface PerformanceMetricsProps {
  metrics: Metrics;
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const t = useTranslations('brokerDetail');
  const tm = useTranslations('brokerDetail.metrics');

  return (
    <div className="bg-surface border border-line rounded-xl p-6 mb-5">
      <h3 className="text-sm font-semibold text-ink mb-5">{t('performanceMetrics')}</h3>

      {metrics.aumGrowthYoY && (
        <div className="pb-4 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-dim mb-1">
            {tm('aumGrowth')}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[26px] font-bold text-positive">{metrics.aumGrowthYoY}</span>
            <TrendUpIcon />
          </div>
        </div>
      )}

      {metrics.liquidityAccess && (
        <div className="border-t border-line pt-4 pb-4 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-dim mb-1">
            {tm('liquidityAccess')}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[26px] font-bold text-ink">{metrics.liquidityAccess}</span>
            {metrics.liquidityAccessSub && (
              <span className="text-[11px] text-ink-dim">{metrics.liquidityAccessSub}</span>
            )}
          </div>
        </div>
      )}

      {metrics.clientRetention && (
        <div className="border-t border-line pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-dim mb-1">
            {tm('clientRetention')}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[26px] font-bold text-ink">{metrics.clientRetention}</span>
            {metrics.clientRetentionPeriod && (
              <span className="text-[11px] text-ink-dim">{metrics.clientRetentionPeriod}</span>
            )}
          </div>
        </div>
      )}

      <Button variant="outline" size="md" className="w-full mt-4">
        {t('viewAuditReport')}
      </Button>
    </div>
  );
}

function TrendUpIcon() {
  return (
    <div className="w-9 h-9 rounded-md bg-positive/15 border border-positive/30 flex items-center justify-center text-positive">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    </div>
  );
}
