import { Newspaper } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function PressPage() {
  return (
    <UnderMaintenance
      icon={<Newspaper size={28} />}
      title="Press & Media"
      description="Media kit, press releases, and brand assets for Woxa will be available here."
    />
  );
}
