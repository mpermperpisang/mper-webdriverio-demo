const { expect, browser } = require('@wdio/globals');
const Element = require('../../../element_properties/element');

class LoginPage extends Element {
  open() {
    return super.open();
  }

  async login(username) {
    await this.FIELD_USERNAME.setValue(username);
    await this.FIELD_PASSWORD.setValue(process.env.PASSWORD);
    await this.BTN_LOGIN.click();
  }

  async validateLockedOutMessage() {
    await expect(this.MSG_LOCKED_OUT).toBeDisplayed();
  }

  async validateLoginPage() {
    await expect(browser).toHaveUrl(`${process.env.BASE_WEB}/iriyaa`);
    await expect(this.FIELD_USERNAME).toBeDisplayed();
    await expect(this.FIELD_PASSWORD).toBeDisplayed();
    await expect(this.BTN_LOGIN).toBeDisplayed();
  }
}

module.exports = new LoginPage();
