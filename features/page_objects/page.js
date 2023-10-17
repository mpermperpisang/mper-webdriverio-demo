const { browser } = require('@wdio/globals');

module.exports = class Page {
  open(path = '/') {
    this.bar = `https://www.saucedemo.com${path}`;

    return browser.url(this.bar);
  }
};
