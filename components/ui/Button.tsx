import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-95';

    const variants = {
      primary: 'btn-gradient text-white hover:brightness-110',
      outline: 'bg-transparent border border-line-light text-ink-muted hover:border-accent hover:text-accent',
      ghost:   'bg-transparent text-ink-muted hover:text-accent hover:bg-surface-2',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-7 py-[14px] text-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading
          ? <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          : children
        }
      </button>
    );
  }
);

Button.displayName = 'Button';
