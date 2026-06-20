import { MessageSquare } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function ForumPage() {
  return (
    <UnderMaintenance
      icon={<MessageSquare size={28} />}
      title="Community Forum"
      description="Connect with institutional traders, broker analysts, and market structure experts."
    />
  );
}
