const { expect } = require('@wdio/globals');
const Element = require('../../element_properties/element');

class OnboardingPage extends Element {
  async validateIsInOnboardingPage() {
    await expect(this.ONBOARDING_BTN).toBeDisplayed();
  }
}

module.exports = new OnboardingPage();
