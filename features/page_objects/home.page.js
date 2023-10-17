const { $, expect, browser } = require('@wdio/globals');
const Page = require('./page');

class HomePage extends Page {
  get headerHome() {
    this.header = $('//div[text()="Swag Labs"]');
    return this.header;
  }

  async validateIsInHomePage() {
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    /* NOTE
    "this.homeHeader" is an intended mistake
    because I wanna show you the screenshot attachment in reporting
    */
    await expect(this.homeHeader).toBeDisplayed();
  }

  open() {
    return super.open('/inventory.html');
  }
}

module.exports = new HomePage();
