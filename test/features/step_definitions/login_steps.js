const { Given, When, Then } = require('@wdio/cucumber-framework');

const LoginPage = require('../page_objects/login.page');
const HomePage = require('../page_objects/home.page');

const message = require('../../../helper/message');

const pages = {
  login: LoginPage,
  home: HomePage,
};

Given(/user (\w+) with username "([^"]*)"/, async (page, username) => {
  await pages[page].open();
  await pages[page].login(username);
});

When(/^user can( not)? continue (\w+) process$/, async (access, page) => {
  if (access !== null) {
    await pages[page].validateLockedOutMessage(); // TODO need to separate function
  } else {
    await pages[page].validateLockedOutMessage();
  }
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
