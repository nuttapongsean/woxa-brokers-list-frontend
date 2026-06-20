'use client';

import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-widest text-logo">
          {label}
        </span>
      )}
      <div
        role="radiogroup"
        aria-label={label}
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
        )}
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const optId = `${name}-${opt.value}`;

          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={cn(
                'flex items-start gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors',
                isSelected
                  ? 'bg-input-focus border-accent'
                  : 'bg-input border-line hover:border-line-focus',
                opt.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <input
                type="radio"
                id={optId}
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={opt.disabled}
                onChange={() => onChange?.(opt.value)}
                className="sr-only"
                aria-describedby={opt.description ? `${optId}-desc` : undefined}
              />
              {/* Custom radio dot */}
              <span
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  isSelected ? 'border-accent' : 'border-line-light'
                )}
                aria-hidden="true"
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-accent" />
                )}
              </span>
              <div className="flex flex-col">
                <span className={cn('text-sm', isSelected ? 'text-ink' : 'text-ink-muted')}>
                  {opt.label}
                </span>
                {opt.description && (
                  <span id={`${optId}-desc`} className="text-[12px] text-ink-dim mt-0.5">
                    {opt.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
