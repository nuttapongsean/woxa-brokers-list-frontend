'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Autocomplete } from '@/components/ui/Autocomplete';
import { Select } from '@/components/ui/Select';
import { RadioGroup } from '@/components/ui/RadioGroup';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { FileUpload } from '@/components/ui/FileUpload';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { BrokerCard } from '@/components/brokers/BrokerCard';
import { BrokerFilters } from '@/components/brokers/BrokerFilters';
import { BrokerSearchBar } from '@/components/brokers/BrokerSearchBar';
import {
  AtSign, Lock, Eye, EyeOff, Search, Globe, ImageIcon,
} from 'lucide-react';
import type { BrokerType } from '@/lib/schemas/broker';

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="font-display text-[13px] font-semibold uppercase tracking-widest text-logo shrink-0">
          {title}
        </h2>
        <div className="flex-1 border-t border-line" />
      </div>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-widest text-ink-dim font-medium">
      {children}
    </span>
  );
}

// ──────────────────────────────────────────────
// Mock broker for BrokerCard preview
// ──────────────────────────────────────────────
const MOCK_BROKER = {
  id: '1',
  name: 'Saxo Bank',
  slug: 'saxo-bank',
  description:
    'Leading multi-asset trading and investment specialist with deep institutional liquidity pools across 60,000+ instruments globally.',
  brokerType: 'cfd' as const,
  logoUrl: 'https://logo.clearbit.com/home.saxo',
  imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  website: 'https://www.home.saxo',
  badge: 'Premium TIER',
  tag: 'Regulated',
  icon: 'shield',
  grade: 'SOVEREIGN GRADE A+',
  rating: 5,
  contactAddress: 'Philip Heymans Allé 15, 2900 Hellerup, Denmark',
  contactEmail: 'institutional@saxobank.com',
};

const FILTER_TYPES = ['cfd', 'bond', 'stock', 'crypto'];

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────
export function DevGallery() {
  const [showPw, setShowPw] = useState(false);
  const [filterActive, setFilterActive] = useState<'all' | BrokerType>('all');
  const [search, setSearch] = useState('');
  const [autocompleteVal, setAutocompleteVal] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedBrokerType, setSelectedBrokerType] = useState('');
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-logo mb-2">Woxa Design System</p>
        <h1 className="font-display text-4xl font-bold text-ink-title tracking-tight">
          Component Gallery
        </h1>
        <p className="text-ink-muted mt-2 text-sm">
          Canonical reference for all shared UI primitives and broker-specific components.
        </p>
      </div>

      {/* ── Typography ── */}
      <Section title="Typography">
        <div className="space-y-3">
          <div className="flex flex-col gap-0.5">
            <Label>Display / h1</Label>
            <h1 className="font-display text-5xl font-bold text-ink-title tracking-tight">
              The Global Broker Platform
            </h1>
          </div>
          <div className="flex flex-col gap-0.5">
            <Label>Heading / h2</Label>
            <h2 className="font-display text-3xl font-semibold text-ink-title">
              Institutional-Grade Liquidity
            </h2>
          </div>
          <div className="flex flex-col gap-0.5">
            <Label>Heading / h3</Label>
            <h3 className="font-display text-xl font-semibold text-ink-title">
              Multi-Asset Coverage
            </h3>
          </div>
          <div className="flex flex-col gap-0.5">
            <Label>Body</Label>
            <p className="text-sm text-ink-body leading-relaxed max-w-prose">
              Access 60,000+ instruments across FX, equities, bonds, commodities,
              and listed derivatives from a single margin account with tight spreads.
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <Label>Muted / caption</Label>
            <p className="text-[13px] text-ink-muted">
              Regulated by FCA · EST. 1992 · $100B+ AUM
            </p>
          </div>
          <div className="flex flex-col gap-0.5">
            <Label>Field label</Label>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-logo">
              Email Address
            </span>
          </div>
        </div>
      </Section>

      {/* ── Colors ── */}
      <Section title="Color Palette">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'bg-base', cls: 'bg-base', text: 'text-ink-dim' },
            { name: 'bg-surface', cls: 'bg-surface', text: 'text-ink-muted' },
            { name: 'bg-surface-2', cls: 'bg-surface-2', text: 'text-ink-muted' },
            { name: 'bg-input', cls: 'bg-input', text: 'text-ink-muted' },
            { name: 'bg-input-focus', cls: 'bg-input-focus', text: 'text-ink-muted' },
            { name: 'bg-chip', cls: 'bg-chip', text: 'text-ink-muted' },
            { name: 'bg-filter-inactive', cls: 'bg-filter-inactive', text: 'text-ink-muted' },
            { name: 'bg-accent', cls: 'bg-accent', text: 'text-white' },
            { name: 'text-logo', cls: 'bg-logo', text: 'text-base' },
            { name: 'text-positive', cls: 'bg-positive', text: 'text-base' },
            { name: 'text-warning', cls: 'bg-warning', text: 'text-base' },
            { name: 'border-line', cls: 'bg-line', text: 'text-ink-muted' },
          ].map(({ name, cls, text }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <div className={`h-10 rounded-lg border border-line/40 ${cls}`} />
              <span className={`text-[10px] font-mono ${text === 'text-base' ? 'text-ink-dim' : 'text-ink-dim'}`}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Buttons ── */}
      <Section title="Button">
        <div className="space-y-6">
          {/* Variants */}
          <div className="space-y-2">
            <Label>Variants</Label>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          {/* Sizes */}
          <div className="space-y-2">
            <Label>Sizes</Label>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          {/* States */}
          <div className="space-y-2">
            <Label>States</Label>
            <div className="flex flex-wrap gap-3 items-center">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Input ── */}
      <Section title="Input">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Default" placeholder="Placeholder text" />
          <Input label="With icon left" placeholder="your@email.com" iconLeft={<AtSign size={15} />} />
          <Input
            label="Password with toggle"
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••"
            iconLeft={<Lock size={15} />}
            rightAction={
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="text-ink-dim hover:text-ink transition-colors"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
          />
          <Input label="Error state" placeholder="bad-value" error="This field is required" />
          <Input label="Disabled" placeholder="Not editable" disabled />
        </div>
      </Section>

      {/* ── Textarea ── */}
      <Section title="Textarea">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Textarea label="Default" placeholder="Enter a description…" rows={4} />
          <Textarea label="Error state" placeholder="…" rows={4} error="Description is required" />
        </div>
      </Section>

      {/* ── Badge ── */}
      <Section title="Badge">
        <div className="flex flex-wrap gap-3 items-center">
          <Badge variant="premium">Premium TIER</Badge>
          <Badge variant="default">Default</Badge>
          <Badge variant="premium">Sovereign Grade</Badge>
        </div>
      </Section>

      {/* ── Card ── */}
      <Section title="Card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Card className="p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-logo mb-2">Default card</p>
            <p className="text-sm text-ink-muted">
              Static card with border-line border, bg-surface background, rounded-xl corners.
            </p>
          </Card>
          <Card hover className="p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-logo mb-2">Hover card</p>
            <p className="text-sm text-ink-muted">
              Lifts on hover (–translate-y-0.5) and brightens border to border-line-light.
            </p>
          </Card>
        </div>
      </Section>

      {/* ── BrokerSearchBar ── */}
      <Section title="BrokerSearchBar">
        <BrokerSearchBar value={search} onChange={setSearch} />
        {search && (
          <p className="text-xs text-ink-dim">
            Query: <span className="text-ink-muted font-mono">&quot;{search}&quot;</span>
          </p>
        )}
      </Section>

      {/* ── BrokerFilters ── */}
      <Section title="BrokerFilters">
        <BrokerFilters
          active={filterActive}
          onChange={setFilterActive}
          types={FILTER_TYPES}
        />
        <p className="text-xs text-ink-dim">
          Active: <span className="text-ink-muted font-mono">{filterActive}</span>
        </p>
      </Section>

      {/* ── BrokerCard ── */}
      <Section title="BrokerCard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <BrokerCard broker={MOCK_BROKER as never} locale="en" priority />
          <BrokerCard broker={{ ...MOCK_BROKER, badge: undefined, imageUrl: undefined } as never} locale="en" />
        </div>
      </Section>

      {/* ── Autocomplete ── */}
      <Section title="Autocomplete">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Autocomplete
            label="Broker"
            placeholder="Search brokers…"
            value={autocompleteVal}
            onChange={setAutocompleteVal}
            options={[
              { value: 'saxo', label: 'Saxo Bank' },
              { value: 'interactive', label: 'Interactive Brokers' },
              { value: 'td', label: 'TD Ameritrade' },
              { value: 'schwab', label: 'Charles Schwab' },
              { value: 'fidelity', label: 'Fidelity Investments' },
              { value: 'etoro', label: 'eToro' },
              { value: 'ig', label: 'IG Group' },
            ]}
          />
          <Autocomplete
            label="Error state"
            placeholder="Search…"
            options={[{ value: 'a', label: 'Option A' }]}
            error="Please select a broker"
          />
        </div>
      </Section>

      {/* ── Select ── */}
      <Section title="Select">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            label="Country"
            placeholder="Select a country…"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            options={[
              { value: 'th', label: 'Thailand' },
              { value: 'sg', label: 'Singapore' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'us', label: 'United States' },
              { value: 'hk', label: 'Hong Kong' },
            ]}
          />
          <Select
            label="Error state"
            placeholder="Select…"
            options={[{ value: 'a', label: 'Option A' }]}
            error="Please select an option"
          />
          <Select
            label="Disabled"
            placeholder="Not available"
            options={[{ value: 'a', label: 'Option A' }]}
            disabled
          />
        </div>
      </Section>

      {/* ── RadioGroup ── */}
      <Section title="RadioGroup">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <RadioGroup
            name="broker-type"
            label="Broker Type"
            value={selectedBrokerType}
            onChange={setSelectedBrokerType}
            options={[
              { value: 'cfd', label: 'CFD', description: 'Contract for Difference trading' },
              { value: 'bond', label: 'Bond', description: 'Fixed income securities' },
              { value: 'stock', label: 'Stock', description: 'Equity market trading' },
              { value: 'crypto', label: 'Crypto', description: 'Digital asset trading' },
            ]}
          />
          <RadioGroup
            name="risk-level"
            label="Horizontal layout"
            value={selectedBrokerType}
            onChange={setSelectedBrokerType}
            orientation="horizontal"
            options={[
              { value: 'cfd', label: 'CFD' },
              { value: 'bond', label: 'Bond' },
              { value: 'stock', label: 'Stock' },
            ]}
          />
        </div>
        <RadioGroup
          name="broker-type-error"
          label="Error state"
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B', disabled: true },
          ]}
          error="Please select a broker type"
        />
      </Section>

      {/* ── MultiSelect ── */}
      <Section title="MultiSelect">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <MultiSelect
            label="Markets"
            placeholder="Select markets…"
            value={selectedMarkets}
            onChange={setSelectedMarkets}
            options={[
              { value: 'forex', label: 'Forex' },
              { value: 'equities', label: 'Equities' },
              { value: 'bonds', label: 'Fixed Income' },
              { value: 'commodities', label: 'Commodities' },
              { value: 'crypto', label: 'Crypto' },
              { value: 'indices', label: 'Indices' },
            ]}
          />
          <MultiSelect
            label="Error state"
            placeholder="Select…"
            options={[{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }]}
            error="At least one market is required"
          />
        </div>
        {selectedMarkets.length > 0 && (
          <p className="text-xs text-ink-dim">
            Selected: <span className="text-ink-muted font-mono">{selectedMarkets.join(', ')}</span>
          </p>
        )}
      </Section>

      {/* ── FileUpload ── */}
      <Section title="FileUpload">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FileUpload
            label="Upload Documents"
            accept=".pdf,.doc,.docx"
            multiple
            maxSizeMb={10}
            value={uploadedFiles}
            onChange={setUploadedFiles}
          />
          <FileUpload
            label="Error state"
            accept="image/*"
            error="Document is required"
          />
        </div>
      </Section>

      {/* ── Icons quick-ref ── */}
      <Section title="Icon Usage">
        <div className="flex flex-wrap gap-4 text-ink-muted">
          {[AtSign, Lock, Eye, EyeOff, Search, Globe, ImageIcon].map((Icon, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <Icon size={20} aria-hidden="true" />
              <span className="text-[10px] text-ink-dim font-mono">{Icon.displayName ?? Icon.name}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-ink-dim">
          All icons via <span className="text-logo">lucide-react</span>. Pass{' '}
          <code className="text-ink-muted font-mono">aria-hidden=&quot;true&quot;</code> on decorative icons.
        </p>
      </Section>

      <div className="border-t border-line pt-6 text-[11px] text-ink-dim">
        Dev only · not indexed · accessible at{' '}
        <span className="font-mono text-ink-muted">/[locale]/dev</span>
      </div>
    </div>
  );
}
