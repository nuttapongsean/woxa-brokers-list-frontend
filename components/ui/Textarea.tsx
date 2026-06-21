import { type TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, id, required, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-2">
        {(label || hint) && (
          <div className="flex items-center justify-between gap-2">
            {label && (
              <label
                htmlFor={inputId}
                className="text-[11px] font-semibold uppercase tracking-widest text-logo"
              >
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
              </label>
            )}
            {hint && <span className="text-[11px] text-ink-dim">{hint}</span>}
          </div>
        )}
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            'w-full bg-input border border-line rounded-lg px-4 py-3 text-sm text-ink-muted placeholder:text-ink-dim resize-none',
            'transition-colors focus:outline-none focus:border-line-focus focus:bg-input-focus focus:text-ink',
            error ? 'border-red-500 focus:border-red-500' : '',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
