import { Code } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function DocsPage() {
  return (
    <UnderMaintenance
      icon={<Code size={28} />}
      title="API Documentation"
      description="Full REST API reference, authentication guides, and integration examples."
    />
  );
}
