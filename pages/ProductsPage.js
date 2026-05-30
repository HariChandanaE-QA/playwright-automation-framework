// pages/ProductsPage.js
// Page Object Model for the Products/Inventory page

class ProductsPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle         = page.locator('.title');
    this.productItems      = page.locator('.inventory_item');
    this.sortDropdown      = page.locator('[data-test="product-sort-container"]');
    this.cartBadge         = page.locator('.shopping_cart_badge');
    this.cartIcon          = page.locator('.shopping_cart_link');
    this.burgerMenu        = page.locator('#react-burger-menu-btn');
    this.logoutLink        = page.locator('#logout_sidebar_link');
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async addProductToCartByName(productName) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.locator('button').click();
  }

  async removeProductFromCartByName(productName) {
    const product = this.page.locator('.inventory_item').filter({ hasText: productName });
    await product.locator('button').click();
  }

  async getCartCount() {
    const badge = this.cartBadge;
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent());
    }
    return 0;
  }

  async sortProducts(option) {
    // Options: 'az', 'za', 'lohi', 'hilo'
    await this.sortDropdown.selectOption(option);
  }

  async getAllProductNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getAllProductPrices() {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}

module.exports = { ProductsPage };
