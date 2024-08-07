const { Given, Then } = require('@wdio/cucumber-framework');

const message = require('../../../helper/message');
const LoginPage = require('../page_objects/objects/login.page');
const HomePage = require('../page_objects/objects/home.page');

const pages = {
  login: LoginPage,
  home: HomePage,
};

Given(/user (\w+) with username "([^"]*)"/, async (page, username) => {
  await pages[page].open();
  await pages[page].login(username);
});

Then(/validate user (still|is) in (\w+) page/, async (access, page) => {
  if (access === 'still' && page === 'login') {
    await pages[page].validateLockedOutMessage();
  } else if (access === 'is' && page === 'home') {
    await pages[page].validateIsInHomePage();
  } else {
    throw new Error(message.error.pageNotFound);
  }
});
