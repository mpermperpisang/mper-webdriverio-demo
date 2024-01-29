const { Given } = require('@wdio/cucumber-framework');

const HomePage = require('../../page_objects/objects/02_android/home.page');

Given(/user is in home page/, async () => {
  await HomePage.validateIsInHomePage();
});
