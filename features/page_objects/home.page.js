const { $, expect, browser } = require('@wdio/globals');
const Page = require('./page');

class HomePage extends Page {
  open() {
    return super.open('/inventory.html');
  }

  get headerHome() {
    this.header = $('//div[text()="Swag Labs"]');
    return this.header;
  }

  async validateIsInHomePage() {
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(this.headerHome).toBeDisplayed();
  }
}

module.exports = new HomePage();
