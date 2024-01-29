const { expect } = require('@wdio/globals');
const Element = require('../../../element_properties/element');

class HomePage extends Element {
  async validateIsInHomePage() {
    await expect(this.DEMO_LABEL).toBeDisplayed();
  }
}

module.exports = new HomePage();
