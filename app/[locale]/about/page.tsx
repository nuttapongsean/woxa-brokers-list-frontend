import { Landmark } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function AboutPage() {
  return (
    <UnderMaintenance
      icon={<Landmark size={28} />}
      title="About Woxa"
      description="Learn about our mission to connect elite financial institutions with the world's deepest liquidity pools."
    />
  );
}
