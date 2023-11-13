const { $ } = require('@wdio/globals');
const Page = require('../page_objects/page');

const element = {
  header: $('//div[text()="Swag Labs"]'),
};

module.exports = class ElementLogin extends Page {
  constructor() {
    super();
    this.HEADER = element.header;
  }
};
