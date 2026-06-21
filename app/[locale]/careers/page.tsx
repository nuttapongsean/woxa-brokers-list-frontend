import { Briefcase } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function CareersPage() {
  return (
    <UnderMaintenance
      icon={<Briefcase size={28} />}
      title="Careers"
      description="Join the team building the future of institutional broker intelligence. Open roles coming soon."
    />
  );
}
