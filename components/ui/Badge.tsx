import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'premium' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-2xl text-[10px] uppercase tracking-widest',
        variant === 'premium'
          ? 'px-3 bg-logo/20 border border-logo/30 text-logo backdrop-blur-sm'
          : 'px-3 bg-ink-bright/10 border border-line text-ink-dim',
        className
      )}
    >
      {children}
    </span>
  );
}


