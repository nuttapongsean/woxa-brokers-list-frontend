'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function MultiSelect({
  label,
  options,
  value = [],
  onChange,
  error,
  placeholder = 'Select options…',
  className,
  id,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const inputId = id ?? uid;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggle(optValue: string) {
    const next = value.includes(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue];
    onChange?.(next);
  }

  function remove(optValue: string, e: React.MouseEvent) {
    e.stopPropagation();
    onChange?.(value.filter((v) => v !== optValue));
  }

  const selectedLabels = options.filter((o) => value.includes(o.value));

  return (
    <div className={cn('flex flex-col gap-2', className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[11px] font-semibold uppercase tracking-widest text-logo"
        >
          {label}
        </label>
      )}

      {/* Trigger + floating dropdown wrapper */}
      <div className="relative">
        <div
          id={inputId}
          role="button"
          tabIndex={0}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            'w-full flex items-center gap-2 h-[46px] bg-input border rounded-lg px-3 py-2 text-left transition-colors cursor-pointer overflow-hidden',
            open ? 'border-line-focus bg-input-focus' : 'border-line hover:border-line-light',
            error ? 'border-red-500' : ''
          )}
        >
          {/* Chips */}
          <span className="flex gap-1.5 flex-1 overflow-hidden">
            {selectedLabels.length === 0 ? (
              <span className="text-sm text-ink-dim">{placeholder}</span>
            ) : (
              selectedLabels.map((opt) => (
                <span
                  key={opt.value}
                  className="inline-flex items-center gap-1 bg-chip text-ink text-[11px] font-medium rounded px-2 py-0.5"
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => remove(opt.value, e)}
                    aria-label={`Remove ${opt.label}`}
                    className="text-ink-dim hover:text-ink transition-colors"
                  >
                    <X size={10} aria-hidden="true" />
                  </button>
                </span>
              ))
            )}
          </span>
          <ChevronDown
            size={16}
            className={cn('shrink-0 text-ink-dim transition-transform', open && 'rotate-180')}
            aria-hidden="true"
          />
        </div>

        {/* Dropdown — absolute so it floats above surrounding elements */}
        {open && (
          <ul
            role="listbox"
            aria-multiselectable="true"
            aria-label={label}
            className="absolute top-full left-0 right-0 mt-1 z-50 max-h-56 overflow-y-auto scrollbar-theme bg-surface border border-line rounded-lg shadow-lg"
          >
          {options.map((opt) => {
            const isSelected = value.includes(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled}
                onClick={() => !opt.disabled && toggle(opt.value)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors',
                  isSelected
                    ? 'bg-input-focus text-ink'
                    : 'text-ink-muted hover:bg-input hover:text-ink',
                  opt.disabled && 'opacity-40 cursor-not-allowed'
                )}
              >
                <span
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                    isSelected ? 'bg-accent border-accent' : 'border-line-light'
                  )}
                  aria-hidden="true"
                >
                  {isSelected && <Check size={10} strokeWidth={3} className="text-white" />}
                </span>
                {opt.label}
              </li>
            );
          })}
          </ul>
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
