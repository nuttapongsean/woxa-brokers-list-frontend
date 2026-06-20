import { chromium } from '@playwright/test';

const BASE = 'http://localhost:3000';
const EMAIL = 'test@woxa.com';
const PASSWORD = 'password123';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  let passed = 0;
  let failed = 0;

  function ok(label: string) {
    console.log(`  ✅ ${label}`);
    passed++;
  }
  function fail(label: string, detail?: string) {
    console.log(`  ❌ ${label}${detail ? ` — ${detail}` : ''}`);
    failed++;
  }

  // ── 1. Unauthenticated: protected page redirects to login ──────────────────
  console.log('\n[1] Unauthenticated access to /brokers/submit');
  await page.goto(`${BASE}/en/brokers/submit`, { waitUntil: 'domcontentloaded' });
  const url1 = page.url();
  url1.includes('/login') ? ok('Redirected to /login') : fail('Should redirect to /login', url1);

  // ── 2. Forged cookie: manual document.cookie cannot bypass middleware ───────
  console.log('\n[2] Forged cookie bypass attempt');
  await page.goto(`${BASE}/en/login`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => { document.cookie = 'woxa_session=FORGED; path=/'; });
  await page.goto(`${BASE}/en/brokers/submit`, { waitUntil: 'domcontentloaded' });
  const url2 = page.url();
  url2.includes('/login') ? ok('Forged cookie rejected — still redirected to /login') : fail('Forged cookie should be rejected', url2);

  // ── 3. Login → session cookie issued as HttpOnly JWT ──────────────────────
  console.log('\n[3] Login flow');
  await page.goto(`${BASE}/en/login`, { waitUntil: 'networkidle' });
  await page.fill('input[type="email"]', EMAIL);
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/en\/brokers/, { timeout: 5000 }).catch(() => {});
  const url3 = page.url();
  url3.includes('/brokers') ? ok('Login succeeded — redirected to /brokers') : fail('Login should redirect to /brokers', url3);

  // ── 4. Session cookie is HttpOnly (JS cannot read it) ─────────────────────
  console.log('\n[4] Session cookie is HttpOnly');
  const cookieViaJs = await page.evaluate(() =>
    document.cookie.split(';').find(c => c.trim().startsWith('woxa_session='))
  );
  cookieViaJs === undefined ? ok('woxa_session not readable from JS (HttpOnly confirmed)') : fail('woxa_session should be HttpOnly', `got: ${cookieViaJs}`);

  // ── 5. Logged-in user cannot access /login (redirected home) ──────────────
  console.log('\n[5] Logged-in user access to /login');
  await page.goto(`${BASE}/en/login`, { waitUntil: 'domcontentloaded' });
  const url5 = page.url();
  url5.includes('/brokers') ? ok('Redirected away from /login') : fail('Logged-in user should not see /login', url5);

  // ── 6. Protected page accessible after login ──────────────────────────────
  console.log('\n[6] Access protected page after login');
  await page.goto(`${BASE}/en/brokers/submit`, { waitUntil: 'domcontentloaded' });
  const url6 = page.url();
  url6.includes('/brokers/submit') ? ok('Protected page accessible') : fail('Should be accessible after login', url6);

  // ── 7. Session cookie set by server (verify via Playwright cookie API) ─────
  console.log('\n[7] Session cookie attributes');
  const cookies = await context.cookies();
  const session = cookies.find(c => c.name === 'woxa_session');
  if (!session) {
    fail('woxa_session cookie not found');
  } else {
    session.httpOnly ? ok('httpOnly = true') : fail('Cookie must be httpOnly');
    session.value.split('.').length === 3 ? ok('Value is JWT (3-part)') : fail('Cookie value should be a JWT', session.value.slice(0, 30));
  }

  // ── 8. Logout clears session cookie ───────────────────────────────────────
  console.log('\n[8] Logout');
  await page.goto(`${BASE}/en/brokers`, { waitUntil: 'networkidle' });
  const logoutBtn = page.locator('[aria-label="Logout"]');
  if (await logoutBtn.count() > 0) {
    await logoutBtn.click();
    await page.waitForURL(/\/login/, { timeout: 5000 }).catch(() => {});
    const url8 = page.url();
    url8.includes('/login') ? ok('Logout redirected to /login') : fail('Should redirect to /login after logout', url8);

    const cookiesAfter = await context.cookies();
    const sessionAfter = cookiesAfter.find(c => c.name === 'woxa_session');
    sessionAfter ? fail('Session cookie should be cleared after logout') : ok('Session cookie cleared');
  } else {
    fail('Logout button not found');
  }

  // ── 9. After logout: protected page redirects ─────────────────────────────
  console.log('\n[9] After logout: protected page redirects');
  await page.goto(`${BASE}/en/brokers/submit`, { waitUntil: 'domcontentloaded' });
  const url9 = page.url();
  url9.includes('/login') ? ok('Redirected to /login after logout') : fail('Should redirect after logout', url9);

  // ── Summary ───────────────────────────────────────────────────────────────
  console.log(`\n${'─'.repeat(45)}`);
  console.log(`Result: ${passed} passed, ${failed} failed`);
  await browser.close();
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((e) => { console.error(e); process.exit(1); });
