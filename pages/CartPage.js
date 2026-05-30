// pages/CartPage.js
// Page Object Model for the Shopping Cart page

class CartPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle        = page.locator('.title');
    this.cartItems        = page.locator('.cart_item');
    this.checkoutButton   = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async removeItemByName(productName) {
    const item = this.page.locator('.cart_item').filter({ hasText: productName });
    await item.locator('button').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = { CartPage };
