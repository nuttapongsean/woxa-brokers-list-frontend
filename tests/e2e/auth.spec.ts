import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const EMAIL = 'test@woxa.com';
const PASSWORD = 'password123';

test.describe('Auth flow', () => {
  test('unauthenticated user is redirected to /login', async ({ page }) => {
    await page.goto('/en/brokers/submit');
    await expect(page).toHaveURL(/\/login/);
  });

  test('forged woxa_session cookie is rejected by middleware', async ({ page, context }) => {
    await context.addCookies([{ name: 'woxa_session', value: 'FORGED', url: 'http://localhost:3000' }]);
    await page.goto('/en/brokers/submit');
    await expect(page).toHaveURL(/\/login/);
  });

  test.describe('after login', () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(EMAIL, PASSWORD);
      await expect(page).toHaveURL(/\/en\/brokers/);
    });

    test('redirects to /brokers after login', async ({ page }) => {
      await expect(page).toHaveURL(/\/en\/brokers/);
    });

    test('session cookie is HttpOnly and is a JWT', async ({ page, context }) => {
      const cookieViaJs = await page.evaluate(() =>
        document.cookie.split(';').find(c => c.trim().startsWith('woxa_session='))
      );
      expect(cookieViaJs).toBeUndefined();

      const cookies = await context.cookies();
      const session = cookies.find(c => c.name === 'woxa_session');
      expect(session).toBeDefined();
      expect(session!.httpOnly).toBe(true);
      expect(session!.value.split('.').length).toBe(3);
    });

    test('logged-in user is redirected away from /login', async ({ page }) => {
      await page.goto('/en/login');
      await expect(page).toHaveURL(/\/brokers/);
    });

    test('logged-in user can access protected page', async ({ page }) => {
      await page.goto('/en/brokers/submit');
      await expect(page).toHaveURL(/\/brokers\/submit/);
    });

    test('logout clears session and redirects to /login', async ({ page, context }) => {
      const loginPage = new LoginPage(page);
      await page.goto('/en/brokers');
      await loginPage.logout();
      await expect(page).toHaveURL(/\/login/);

      const cookies = await context.cookies();
      const session = cookies.find(c => c.name === 'woxa_session');
      expect(session).toBeUndefined();
    });

    test('after logout, protected page redirects to /login', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('/en/brokers');
      await loginPage.logout();
      await expect(page).toHaveURL(/\/login/);

      await page.goto('/en/brokers/submit');
      await expect(page).toHaveURL(/\/login/);
    });
  });
});
