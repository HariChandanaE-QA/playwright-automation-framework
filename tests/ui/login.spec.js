// tests/ui/login.spec.js
// Test Suite: Login functionality — Positive and Negative scenarios

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');
const { USERS, ERROR_MESSAGES } = require('../../test-data/testData');

test.describe('Login Page — Functional Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // ─── Positive Tests ───────────────────────────────────────────

  test('TC001 — Successful login with valid standard user credentials', async ({ page }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    const productsPage = new ProductsPage(page);
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // ─── Negative Tests ───────────────────────────────────────────

  test('TC002 — Login fails with locked out user account', async ({ page }) => {
    await loginPage.login(USERS.locked.username, USERS.locked.password);

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(ERROR_MESSAGES.lockedUser);
  });

  test('TC003 — Login fails with invalid username and password', async ({ page }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('do not match');
  });

  test('TC004 — Login fails when username is empty', async ({ page }) => {
    await loginPage.login('', USERS.standard.password);

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(ERROR_MESSAGES.missingUsername);
  });

  test('TC005 — Login fails when password is empty', async ({ page }) => {
    await loginPage.login(USERS.standard.username, '');

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(ERROR_MESSAGES.missingPassword);
  });

  test('TC006 — Error message can be dismissed using close button', async ({ page }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.dismissError();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });

  test('TC007 — Login page elements are visible on load', async ({ page }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
