# Add Translation

Add a new i18n key to both `messages/en.json` and `messages/th.json`.

## Usage
```
/add-translation <namespace>.<key> "<english value>"
```

**Examples:**
- `/add-translation brokers.filters.forex "Forex"`
- `/add-translation common.loadingMore "Loading more..."`
- `/add-translation brokerDetail.noMetrics "No performance data available"`

## What This Does

1. Opens `messages/en.json` and adds the key at the correct namespace path
2. Opens `messages/th.json` and adds the Thai translation at the same path
3. If the namespace doesn't exist in either file, creates it
4. Verifies that the key structure stays consistent between both files

## Rules

- **Always update both files** — a key in `en.json` without a matching key in `th.json` will throw a runtime error from next-intl
- **Nested keys use dot notation** in the command, map to nested JSON objects in the file
- **Thai copy must be formal** (ภาษาทางการ) — appropriate for an institutional financial platform
- **Short UI labels in Thai** — Thai is naturally more compact; don't over-translate
- **Financial terms**: use Thai SEC/BOT official terminology

## Common Thai Financial Terms

| English | Thai |
|---------|------|
| Broker | โบรกเกอร์ |
| Institutional | สถาบัน |
| Capital Markets | ตลาดทุน |
| Submit | ส่ง / ยื่น |
| Register | ลงทะเบียน |
| Login | เข้าสู่ระบบ |
| Verified | ยืนยันแล้ว |
| Loading | กำลังโหลด |
| Error | เกิดข้อผิดพลาด |

## Post-Command Step

After adding the key, replace the hardcoded string in the component:

```tsx
// Before
<p>Loading more...</p>

// After (Server Component)
const t = await getTranslations('common');
<p>{t('loadingMore')}</p>

// After (Client Component)
const t = useTranslations('common');
<p>{t('loadingMore')}</p>
```
