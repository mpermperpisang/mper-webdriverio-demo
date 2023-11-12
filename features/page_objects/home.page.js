const { expect, browser } = require('@wdio/globals');
const Element = require('../element_properties/home_element');

class HomePage extends Element {
  open() {
    return super.open('/inventory.html');
  }

  async validateIsInHomePage() {
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(this.header).toBeDisplayed();
  }
}

module.exports = new HomePage();
