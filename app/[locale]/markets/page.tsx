import { BarChart2 } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function MarketsPage() {
  return (
    <UnderMaintenance
      icon={<BarChart2 size={28} />}
      title="Markets"
      description="Real-time market data, asset prices, and global liquidity overview are coming soon."
    />
  );
}
