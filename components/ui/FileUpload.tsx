'use client';

import { useRef, useState, useId } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  label?: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  value?: File[];
  onChange?: (files: File[]) => void;
  className?: string;
  id?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  label,
  error,
  accept,
  multiple = false,
  maxSizeMb,
  value = [],
  onChange,
  className,
  id,
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [sizeError, setSizeError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const inputId = id ?? uid;

  const maxBytes = maxSizeMb ? maxSizeMb * 1024 * 1024 : undefined;

  function processFiles(incoming: FileList | null) {
    if (!incoming) return;
    const files = Array.from(incoming);
    if (maxBytes) {
      const oversized = files.filter((f) => f.size > maxBytes);
      if (oversized.length > 0) {
        setSizeError(`File exceeds ${maxSizeMb} MB limit`);
        return;
      }
    }
    setSizeError('');
    onChange?.(multiple ? [...value, ...files] : files.slice(0, 1));
  }

  function removeFile(index: number) {
    onChange?.(value.filter((_, i) => i !== index));
  }

  const displayError = error ?? sizeError;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[11px] font-semibold uppercase tracking-widest text-logo"
        >
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label={label ?? 'Upload file'}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          processFiles(e.dataTransfer.files);
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-8 cursor-pointer transition-colors',
          dragging
            ? 'border-accent bg-input-focus'
            : displayError
            ? 'border-red-500 bg-input hover:border-red-400'
            : 'border-line bg-input hover:border-line-focus hover:bg-input-focus'
        )}
      >
        <Upload
          size={24}
          className={cn('transition-colors', dragging ? 'text-accent' : 'text-ink-dim')}
          aria-hidden="true"
        />
        <div className="text-center">
          <p className="text-sm text-ink-muted">
            <span className="text-logo font-medium">Click to upload</span>
            {' '}or drag and drop
          </p>
          {(accept || maxSizeMb) && (
            <p className="text-[11px] text-ink-dim mt-1">
              {accept && <span>{accept.replace(/,/g, ', ')}</span>}
              {accept && maxSizeMb && ' · '}
              {maxSizeMb && <span>Max {maxSizeMb} MB</span>}
            </p>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => processFiles(e.target.files)}
        aria-hidden="true"
      />

      {/* File list */}
      {value.length > 0 && (
        <ul className="flex flex-col gap-2 mt-1">
          {value.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-2.5"
            >
              <FileText size={16} className="shrink-0 text-logo" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink truncate">{file.name}</p>
                <p className="text-[11px] text-ink-dim">{formatBytes(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className="text-ink-dim hover:text-ink transition-colors shrink-0"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {displayError && (
        <p className="text-xs text-red-400" role="alert">
          {displayError}
        </p>
      )}
    </div>
  );
}
