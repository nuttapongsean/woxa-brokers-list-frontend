import { Mail } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function NewsletterPage() {
  return (
    <UnderMaintenance
      icon={<Mail size={28} />}
      title="Newsletter"
      description="Subscribe to the Sterling Midnight briefing — weekly institutional flow, broker moves, and market structure updates."
    />
  );
}
