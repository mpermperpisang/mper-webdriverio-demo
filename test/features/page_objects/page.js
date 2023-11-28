const { browser } = require('@wdio/globals');

module.exports = class Page {
  open(path = '/') {
    this.bar = path;

    return browser.url(this.bar);
  }
};
