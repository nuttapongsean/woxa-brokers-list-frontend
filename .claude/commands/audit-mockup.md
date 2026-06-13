# Audit Mockup

Compare the current implementation of a page against its HTML mockup.

## Usage
```
/audit-mockup <page>
```

**Page options:** `brokers-list` | `broker-detail` | `submit-broker` | `login` | `register`

## What This Does

1. Reads the corresponding mockup from `./mockups/<page>.html`
2. Reads the current Next.js page implementation from `app/[locale]/...`
3. Compares the two and produces a gap analysis

## Gap Analysis Output Format

```markdown
# Mockup Audit: <Page Name>

## ✅ Implemented Correctly
- [list of elements/sections that match the mockup]

## ⚠️ Partial Implementations
- [element]: [what's missing or different]

## ❌ Missing
- [list of elements in the mockup not yet in the implementation]

## 🎨 Design Deviations
- [color/spacing/typography that differs from the mockup]

## Next Steps
1. [prioritized list of what to fix first]
```

## Mockup → Page Mapping

| Mockup | Page Route |
|--------|-----------|
| `brokers-list.html` | `app/[locale]/brokers/page.tsx` |
| `broker-detail.html` | `app/[locale]/brokers/[slug]/page.tsx` |
| `submit-broker.html` | `app/[locale]/brokers/submit/page.tsx` |
| `login.html` | `app/[locale]/login/page.tsx` |
| `register.html` | `app/[locale]/register/page.tsx` |

## Key Design Tokens to Verify

Every page should use the Woxa dark-navy palette:
- Page background: `#070d1a`
- Card background: `#0d1829`
- Input background: `#0f1e33`
- Primary border: `#1b2f4e`
- Accent blue: `#4a9eff`
- Button gradient: `linear-gradient(135deg, #3b8ef0 0%, #5ba8ff 100%)`
