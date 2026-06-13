import { TrendingUp } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function AnalysisPage() {
  return (
    <UnderMaintenance
      icon={<TrendingUp size={28} />}
      title="Analysis"
      description="In-depth institutional research, broker performance analysis, and portfolio insights are coming soon."
    />
  );
}
