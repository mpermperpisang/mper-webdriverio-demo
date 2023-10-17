const { $, expect, browser } = require('@wdio/globals');
const Page = require('./page');

class LoginPage extends Page {
  get fieldUsername() {
    this.username = $('#user-name');
    return this.username;
  }

  get fieldPassword() {
    this.password = $('#password');
    return this.password;
  }

  get buttonLogin() {
    this.button = $('#login-button');
    return this.button;
  }

  get messagelockedOut() {
    this.text = $('//*[text()="Epic sadface: Sorry, this user has been locked out."]');
    return this.text;
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

  open() {
    return super.open();
  }
}

module.exports = new LoginPage();
