// pages/LoginPage.js
// Page Object Model for the Login page of SauceDemo

class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput   = page.locator('[data-test="username"]');
    this.passwordInput   = page.locator('[data-test="password"]');
    this.loginButton     = page.locator('[data-test="login-button"]');
    this.errorMessage    = page.locator('[data-test="error"]');
    this.errorButton     = page.locator('[data-test="error-button"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async dismissError() {
    await this.errorButton.click();
  }

  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }
}

module.exports = { LoginPage };
