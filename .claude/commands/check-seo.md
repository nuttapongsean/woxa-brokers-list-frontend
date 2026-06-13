# Check SEO

Audit the SEO metadata implementation for a page.

## Usage
```
/check-seo <page>
```

**Examples:**
- `/check-seo brokers`
- `/check-seo brokers/[slug]`
- `/check-seo login`

## What This Does

Reads the target page file and checks:

### 1. Metadata Completeness
- [ ] `generateMetadata` (or static `metadata`) is exported
- [ ] `title` is set (50-60 chars, includes primary keyword + brand)
- [ ] `description` is set (150-160 chars)
- [ ] `openGraph.title` is set
- [ ] `openGraph.description` is set
- [ ] `openGraph.images` is set (1200×630 recommended)
- [ ] `twitter.card` is set to `summary_large_image`

### 2. Locale / hreflang
- [ ] `alternates.canonical` points to the canonical URL
- [ ] `alternates.languages` maps `en` and `th` locale URLs
- [ ] `generateMetadata` uses `getTranslations` for locale-aware titles

### 3. Structured Data (public pages only)
- [ ] `<JsonLd>` component is rendered in the page
- [ ] JSON-LD type is appropriate (`Organization`, `FinancialService`, `BreadcrumbList`)
- [ ] No validation errors (schema.org required fields)

### 4. Robots
- [ ] Public pages (`/brokers`, `/brokers/[slug]`) are indexable
- [ ] Auth pages (`/login`, `/register`, `/brokers/submit`) are in `robots.ts` disallow list

### 5. Performance (SEO signal)
- [ ] Above-fold images use `next/image` with `priority`
- [ ] Page is a Server Component (eligible for HTML pre-rendering)
- [ ] `generateStaticParams` is implemented on `[slug]` pages

## Output Format

```markdown
# SEO Audit: <Page>

## Score: X/15 checks passing

## ❌ Missing / Failing
- [ ] `openGraph.images` not set — add 1200×630 OG image
- [ ] `alternates.languages` not configured — hreflang missing for th locale

## ✅ Passing
- [x] title tag present and correct length
- [x] description within 150-160 chars

## Recommended Changes
[code snippet showing what to add/fix in generateMetadata]
```
