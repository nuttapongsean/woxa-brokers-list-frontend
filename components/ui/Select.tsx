'use client';

import { useState, useRef, useEffect, useId, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Select({
  label,
  error,
  placeholder = 'Select…',
  options,
  value,
  onChange,
  disabled,
  className,
  id,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const uid = useId();
  const inputId = id ?? uid;
  const listId = `${inputId}-list`;

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlighted(-1);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  useEffect(() => {
    if (highlighted < 0 || !listRef.current) return;
    const item = listRef.current.children[highlighted] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [highlighted]);

  const selectOption = useCallback(
    (opt: SelectOption) => {
      onChange?.(opt.value);
      setOpen(false);
      setHighlighted(-1);
    },
    [onChange]
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      setOpen(true);
      setHighlighted(options.findIndex((o) => o.value === value));
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (highlighted >= 0 && options[highlighted] && !options[highlighted].disabled) {
          selectOption(options[highlighted]);
        }
        break;
      case 'Escape':
        setOpen(false);
        setHighlighted(-1);
        break;
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} ref={containerRef}>
      {label && (
        <label
          id={`${inputId}-label`}
          htmlFor={inputId}
          className="text-[11px] font-semibold uppercase tracking-widest text-logo"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Trigger */}
        <div
          id={inputId}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          aria-labelledby={label ? `${inputId}-label` : undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex items-center justify-between w-full bg-input border border-line rounded-lg px-4 py-[13px] pr-10',
            'text-sm transition-colors cursor-pointer select-none',
            open ? 'border-line-focus bg-input-focus text-ink' : 'text-ink-muted',
            error ? 'border-red-500' : '',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span className={selected ? 'text-ink' : 'text-ink-dim'}>
            {selected ? selected.label : placeholder}
          </span>
        </div>

        <ChevronDown
          size={16}
          className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2 text-ink-dim pointer-events-none transition-transform duration-200',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />

        {/* Dropdown */}
        {open && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label}
            className="absolute top-full left-0 right-0 mt-1 z-50 max-h-56 overflow-y-auto scrollbar-theme bg-surface border border-line rounded-lg shadow-lg"
          >
            {options.map((opt, i) => {
              const isHighlighted = i === highlighted;
              const isSelected = opt.value === value;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    if (!opt.disabled) selectOption(opt);
                  }}
                  onPointerEnter={() => !opt.disabled && setHighlighted(i)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-colors',
                    isHighlighted ? 'bg-input-focus text-ink' : 'text-ink-muted hover:bg-input hover:text-ink',
                    opt.disabled && 'opacity-40 cursor-not-allowed'
                  )}
                >
                  {opt.label}
                  {isSelected && (
                    <Check size={13} className="text-accent shrink-0" aria-hidden="true" />
                  )}
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
