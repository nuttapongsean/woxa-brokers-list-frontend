import { Activity } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function StatusPage() {
  return (
    <UnderMaintenance
      icon={<Activity size={28} />}
      title="System Status"
      description="Real-time uptime monitoring, incident reports, and platform health metrics."
    />
  );
}
