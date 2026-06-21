import { HelpCircle } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function HelpPage() {
  return (
    <UnderMaintenance
      icon={<HelpCircle size={28} />}
      title="Help Center"
      description="Guides, FAQs, and support documentation for Woxa platform users."
    />
  );
}
