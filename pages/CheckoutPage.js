// pages/CheckoutPage.js
// Page Object Model for the Checkout flow (Step One & Step Two)

class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Step One locators
    this.firstNameInput  = page.locator('[data-test="firstName"]');
    this.lastNameInput   = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton  = page.locator('[data-test="continue"]');
    this.errorMessage    = page.locator('[data-test="error"]');

    // Step Two locators
    this.finishButton    = page.locator('[data-test="finish"]');
    this.cancelButton    = page.locator('[data-test="cancel"]');
    this.summaryTotal    = page.locator('.summary_total_label');
    this.summaryTax      = page.locator('.summary_tax_label');

    // Confirmation locators
    this.confirmationHeader  = page.locator('.complete-header');
    this.confirmationText    = page.locator('.complete-text');
    this.backHomeButton      = page.locator('[data-test="back-to-products"]');
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async getOrderTotal() {
    return await this.summaryTotal.textContent();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async getConfirmationHeader() {
    return await this.confirmationHeader.textContent();
  }

  async goBackHome() {
    await this.backHomeButton.click();
  }
}

module.exports = { CheckoutPage };
