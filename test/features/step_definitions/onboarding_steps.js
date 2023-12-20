const { Given } = require('@wdio/cucumber-framework');

const OnboardingPage = require('../page_objects/objects/onboarding.page');

Given(/user is in onboarding page/, async () => {
  await OnboardingPage.validateIsInOnboardingPage();
});
