import { BookOpen } from 'lucide-react';
import { UnderMaintenance } from '@/components/ui/UnderMaintenance';

export default function BlogPage() {
  return (
    <UnderMaintenance
      icon={<BookOpen size={28} />}
      title="Insights"
      description="In-depth analysis, market intelligence, and institutional research from the Sterling Midnight desk."
    />
  );
}
