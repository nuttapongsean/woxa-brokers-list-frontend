import { GraduationCap } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function EducationPage() {
  return (
    <UnderMaintenance
      icon={<GraduationCap size={28} />}
      title="Education"
      description="Guides, tutorials, and institutional finance resources for verified brokers and partners are coming soon."
    />
  );
}
