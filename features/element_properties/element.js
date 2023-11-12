const { $ } = require('@wdio/globals');
const Page = require('../page_objects/page');

module.exports = class ElementLogin extends Page {
  constructor() {
    super();
    this.fieldUsername = $('#user-name');
    this.fieldPassword = $('#password');
    this.buttonLogin = $('#login-button');
    this.messagelockedOut = $('//*[text()="Epic sadface: Sorry, this user has been locked out."]');
  }

  // get element() {
  //   return [this.fieldUsername, this.fieldPassword, this.buttonLogin, this.messagelockedOut];
  // }
};
