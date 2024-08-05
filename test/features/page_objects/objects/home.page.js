const { expect, browser } = require('@wdio/globals');
const Element = require('../../element_properties/element');

class HomePage extends Element {
  open() {
    return super.open('/v1/inventory.html');
  }

  async validateIsInHomePage() {
    await expect(browser).toHaveUrl(`${process.env.BASE_WEB}/v1/inventory.html`);
    await expect(this.LOGO).toBeDisplayed();
  }
}

module.exports = new HomePage();
