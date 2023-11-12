const { $ } = require('@wdio/globals');
const Page = require('../page_objects/page');

const element = {
  fieldUsername: $('#user-name'),
  fieldPassword: $('#password'),
  buttonLogin: $('#login-button'),
  messagelockedOut: $('//*[text()="Epic sadface: Sorry, this user has been locked out."]'),
};

module.exports = class ElementLogin extends Page {
  constructor() {
    super();
    this.fieldUsername = element.fieldUsername;
    this.fieldPassword = element.fieldPassword;
    this.buttonLogin = element.buttonLogin;
    this.messagelockedOut = element.messagelockedOut;
  }
};
