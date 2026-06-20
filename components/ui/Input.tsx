import { type InputHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  rightAction?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelClassName, error, iconLeft, iconRight, rightAction, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn('text-[11px] font-semibold uppercase tracking-widest text-logo', labelClassName)}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {iconLeft && (
            <span className="absolute left-[14px] inset-y-0 flex items-center text-ink-dim group-focus-within:text-line-focus pointer-events-none transition-colors">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-input border border-line rounded-lg py-[13px] text-sm text-ink-muted placeholder:text-ink-dim',
              'transition-colors focus:outline-none focus:border-line-focus focus:bg-input-focus focus:text-ink',
              iconLeft ? 'pl-10 pr-4' : 'px-4',
              iconRight || rightAction ? 'pr-10' : '',
              error ? 'border-red-500 focus:border-red-500' : '',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {(iconRight || rightAction) && (
            <span className="absolute right-[14px] inset-y-0 flex items-center text-ink-dim group-focus-within:text-line-focus transition-colors">
              {iconRight ?? rightAction}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
