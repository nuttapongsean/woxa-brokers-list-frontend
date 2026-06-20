import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  labelContent?: ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, labelContent, description, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn('flex items-start gap-3 cursor-pointer', props.disabled && 'opacity-50 cursor-not-allowed')}
        >
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={cn('mt-1 checkbox-custom shrink-0', className)}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : description ? `${inputId}-desc` : undefined}
            {...props}
          />
          {(label || labelContent || description) && (
            <div className="flex flex-col gap-0.5">
              {(label || labelContent) && (
                <span className="text-sm text-ink leading-relaxed">
                  {labelContent ?? label}
                </span>
              )}
              {description && (
                <span id={`${inputId}-desc`} className="text-[12px] text-ink-dim">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400 ml-7" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
