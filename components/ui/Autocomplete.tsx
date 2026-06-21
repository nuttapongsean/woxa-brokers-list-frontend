'use client';

import { useState, useRef, useEffect, useId, useCallback } from 'react';
import { Search, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AutocompleteProps {
  label?: string;
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  id?: string;
}

export function Autocomplete({
  label,
  options,
  value = '',
  onChange,
  onSelect,
  placeholder = 'Search…',
  error,
  className,
  id,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const uid = useId();
  const inputId = id ?? uid;
  const listId = `${inputId}-list`;

  const filtered = options.filter(
    (o) => !value || o.label.toLowerCase().includes(value.toLowerCase())
  );

  const selectedOption = options.find((o) => o.value === value || o.label === value);

  // Close on outside click
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

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlighted < 0 || !listRef.current) return;
    const item = listRef.current.children[highlighted] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [highlighted]);

  const selectOption = useCallback(
    (opt: AutocompleteOption) => {
      onChange?.(opt.label);
      onSelect?.(opt);
      setOpen(false);
      setHighlighted(-1);
      inputRef.current?.blur();
    },
    [onChange, onSelect]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true);
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlighted >= 0 && filtered[highlighted] && !filtered[highlighted].disabled) {
          selectOption(filtered[highlighted]);
        }
        break;
      case 'Escape':
        setOpen(false);
        setHighlighted(-1);
        inputRef.current?.blur();
        break;
    }
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange?.('');
    onSelect?.(undefined as never);
    setOpen(false);
    inputRef.current?.focus();
  }

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

      {/* Input + floating dropdown wrapper */}
      <div className="relative flex items-center">
        <Search
          size={15}
          className="absolute left-[14px] text-ink-dim pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={highlighted >= 0 ? `${listId}-${highlighted}` : undefined}
          aria-invalid={error ? 'true' : undefined}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange?.(e.target.value);
            setOpen(true);
            setHighlighted(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full bg-input border border-line rounded-lg pl-10 pr-9 py-[13px] text-sm text-ink-muted placeholder:text-ink-dim',
            'transition-colors focus:outline-none focus:border-line-focus focus:bg-input-focus focus:text-ink',
            error ? 'border-red-500 focus:border-red-500' : ''
          )}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear"
            className="absolute right-[10px] text-ink-dim hover:text-ink transition-colors"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}

        {/* Dropdown — absolute so it floats above surrounding elements */}
        {open && filtered.length > 0 && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label}
            className="absolute top-full left-0 right-0 mt-1 z-50 max-h-56 overflow-y-auto scrollbar-theme bg-surface border border-line rounded-lg shadow-lg"
          >
            {filtered.map((opt, i) => {
              const isHighlighted = i === highlighted;
              const isSelected = opt.value === selectedOption?.value;
              return (
                <li
                  key={opt.value}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    if (!opt.disabled) selectOption(opt);
                  }}
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

        {open && value && filtered.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 z-50 px-4 py-3 bg-surface border border-line rounded-lg shadow-lg text-sm text-ink-dim">
            No results for &ldquo;{value}&rdquo;
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
