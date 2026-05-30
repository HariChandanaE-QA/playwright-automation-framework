// tests/ui/checkout.spec.js
// Test Suite: End-to-End checkout flow — Add to cart → Checkout → Order Confirmation

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { ProductsPage } = require('../../pages/ProductsPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { USERS, PRODUCTS, CHECKOUT_INFO, ERROR_MESSAGES } = require('../../test-data/testData');

test.describe('E2E Checkout Flow', () => {

  let loginPage, productsPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage    = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage     = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login before each test
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  // ─── Positive Tests ───────────────────────────────────────────

  test('TC008 — Add single product to cart and verify cart count updates', async ({ page }) => {
    await productsPage.addProductToCartByName(PRODUCTS.backpack);

    const count = await productsPage.getCartCount();
    expect(count).toBe(1);
  });

  test('TC009 — Add multiple products and verify all appear in cart', async ({ page }) => {
    await productsPage.addProductToCartByName(PRODUCTS.backpack);
    await productsPage.addProductToCartByName(PRODUCTS.bikeLight);

    await productsPage.goToCart();

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);

    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain(PRODUCTS.backpack);
    expect(itemNames).toContain(PRODUCTS.bikeLight);
  });

  test('TC010 — Complete full E2E checkout successfully', async ({ page }) => {
    // Add product
    await productsPage.addProductToCartByName(PRODUCTS.backpack);
    await productsPage.goToCart();

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill checkout info
    const info = CHECKOUT_INFO.valid;
    await checkoutPage.fillCheckoutInfo(info.firstName, info.lastName, info.postalCode);
    await checkoutPage.continue();

    // Verify order summary page
    await expect(page).toHaveURL(/checkout-step-two/);
    const total = await checkoutPage.getOrderTotal();
    expect(total).toContain('Total:');

    // Complete order
    await checkoutPage.finish();

    // Verify confirmation
    await expect(page).toHaveURL(/checkout-complete/);
    const header = await checkoutPage.getConfirmationHeader();
    expect(header).toContain('Thank you for your order');
  });

  test('TC011 — Remove product from cart successfully', async ({ page }) => {
    await productsPage.addProductToCartByName(PRODUCTS.backpack);
    await productsPage.goToCart();

    await cartPage.removeItemByName(PRODUCTS.backpack);

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
  });

  // ─── Negative Tests ───────────────────────────────────────────

  test('TC012 — Checkout fails when First Name is missing', async ({ page }) => {
    await productsPage.addProductToCartByName(PRODUCTS.backpack);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    const info = CHECKOUT_INFO.missingFirstName;
    await checkoutPage.fillCheckoutInfo(info.firstName, info.lastName, info.postalCode);
    await checkoutPage.continue();

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain(ERROR_MESSAGES.missingFirstName);
  });

  test('TC013 — Checkout fails when Postal Code is missing', async ({ page }) => {
    await productsPage.addProductToCartByName(PRODUCTS.backpack);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    const info = CHECKOUT_INFO.missingPostalCode;
    await checkoutPage.fillCheckoutInfo(info.firstName, info.lastName, info.postalCode);
    await checkoutPage.continue();

    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain(ERROR_MESSAGES.missingPostalCode);
  });

  // ─── Sorting Tests ────────────────────────────────────────────

  test('TC014 — Products sort correctly by Price: Low to High', async ({ page }) => {
    await productsPage.sortProducts('lohi');

    const prices = await productsPage.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('TC015 — Products sort correctly by Name: A to Z', async ({ page }) => {
    await productsPage.sortProducts('az');

    const names = await productsPage.getAllProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });
});
