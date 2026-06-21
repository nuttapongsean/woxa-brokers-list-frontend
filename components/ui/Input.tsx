import { type InputHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  tooltip?: string;
  labelClassName?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  rightAction?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, tooltip, labelClassName, error, iconLeft, iconRight, rightAction, className, id, required, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-2">
        {(label || hint || tooltip) && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {label && (
                <label
                  htmlFor={inputId}
                  className={cn('text-[11px] font-semibold uppercase tracking-widest text-logo', labelClassName)}
                >
                  {label}
                  {required && <span className="text-red-400 ml-0.5">*</span>}
                </label>
              )}
              {tooltip && (
                <span className="relative group/tip">
                  <span className="flex items-center justify-center w-3.5 h-3.5 rounded-full border border-ink-dim text-ink-dim text-[9px] font-bold cursor-default select-none leading-none">
                    ?
                  </span>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[220px] rounded-lg bg-surface border border-line px-3 py-2 text-[12px] text-ink-body leading-relaxed shadow-lg opacity-0 group-hover/tip:opacity-100 transition-opacity z-50"
                  >
                    {tooltip}
                  </span>
                </span>
              )}
            </div>
            {hint && <span className="text-[11px] text-ink-dim">{hint}</span>}
          </div>
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
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none',
              iconLeft ? 'pl-10 pr-4' : 'px-4',
              iconRight || rightAction ? 'pr-10' : '',
              error ? 'border-red-500 focus:border-red-500' : '',
              className
            )}
            required={required}
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
