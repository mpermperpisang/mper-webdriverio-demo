const { expect, browser } = require('@wdio/globals');
const Element = require('../element_properties/element');

class LoginPage extends Element {
  open() {
    return super.open();
  }

  async login(username) {
    await this.fieldUsername.setValue(username);
    await this.fieldPassword.setValue(process.env.PASSWORD);
    await this.buttonLogin.click();
  }

  async validateLockedOutMessage() {
    await expect(this.messagelockedOut).toBeDisplayed();
  }

  async validateLoginPage() {
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');
    await expect(this.fieldUsername).toBeDisplayed();
    await expect(this.fieldPassword).toBeDisplayed();
    await expect(this.buttonLogin).toBeDisplayed();
  }
}

module.exports = new LoginPage();
