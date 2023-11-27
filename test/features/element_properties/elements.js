const { $ } = require('@wdio/globals');
const { Properties } = require('properties-file');
const fs = require('fs');
const path = require('path');
const Page = require('../page_objects/page');

module.exports = class Element extends Page {
  constructor() {
    super();

    fs.readdir(path.join(__dirname, 'properties'), (error, fileNames) => {
      if (error) throw error;

      fileNames
        .filter((file) => file.match(/.*.(properties)/ig))
        .forEach((filename) => {
          new Properties(
            fs.readFileSync(path.join(__dirname, 'properties', filename)),
          ).collection.forEach((property) => {
            this.element(property);
          });
        });
    });
  }

  async element(property) {
    if (property.value.match(/(%s)/ig)) {
      this[property.key] = (element) => $(property.value.replace(/(%s)/ig, element));
    } else {
      this[property.key] = $(property.value);
    }
  }
};
