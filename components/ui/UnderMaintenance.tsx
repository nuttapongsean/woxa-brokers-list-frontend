import { Construction } from 'lucide-react';
import type { ReactNode } from 'react';

interface UnderMaintenanceProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function UnderMaintenance({ icon, title, description }: UnderMaintenanceProps) {
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-2xl font-bold text-ink mb-3">{title}</h1>
      <p className="text-[13px] text-ink-muted max-w-[340px] leading-relaxed">{description}</p>
    </div>
  );
}
