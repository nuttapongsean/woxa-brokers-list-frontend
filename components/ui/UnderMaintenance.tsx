import { Construction } from 'lucide-react';
import type { ReactNode } from 'react';

interface UnderMaintenanceProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function UnderMaintenance({ icon, title, description }: UnderMaintenanceProps) {
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4 text-center animate-fade-up">
      <div className="flex items-center gap-2 mb-6 text-warning">
        <Construction size={16} aria-hidden="true" />
        <span className="text-[11px] font-semibold uppercase tracking-widest">Under Maintenance</span>
      </div>
      <div className="text-ink-dim mb-4" aria-hidden="true">{icon}</div>
      <h1 className="font-display text-2xl font-bold text-ink mb-3">{title}</h1>
      <p className="text-[13px] text-ink-muted max-w-[340px] leading-relaxed">{description}</p>
    </div>
  );
}
