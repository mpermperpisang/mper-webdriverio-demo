const { expect, browser } = require('@wdio/globals');
const Element = require('../../element_properties/element');

class HomePage extends Element {
  open() {
    return super.open('/inventory.html');
  }

  async validateIsInHomePage() {
    await expect(browser).toHaveUrlContaining('/inventory.html');
    await expect(this.HEADER('Swag Labs')).toBeDisplayed();
  }
}

module.exports = new HomePage();
