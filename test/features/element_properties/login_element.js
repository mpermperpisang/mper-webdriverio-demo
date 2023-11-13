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
    this.FIELD_USERNAME = element.fieldUsername;
    this.FIELD_PASSWORD = element.fieldPassword;
    this.BTN_LOGIN = element.buttonLogin;
    this.MSG_LOCKED_OUT = element.messagelockedOut;
  }
};
