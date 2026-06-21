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
  tooltip?: string;
  required?: boolean;
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
  tooltip,
  required,
  options,
  value,
  onChange,
  error,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {(label || tooltip) && (
        <div className="flex items-center gap-1.5">
          {label && (
            <span className="text-[11px] font-semibold uppercase tracking-widest text-logo">
              {label}
              {required && <span className="text-red-400 ml-0.5">*</span>}
            </span>
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
      )}
      <div
        role="radiogroup"
        aria-label={label}
        className={cn(
          'gap-3',
          orientation === 'vertical' ? 'flex flex-col' : 'grid grid-cols-1 sm:flex sm:flex-row'
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
                orientation === 'horizontal' && 'sm:flex-1',
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
