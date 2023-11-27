const { $ } = require('@wdio/globals');
const { Properties } = require('properties-file');
const fs = require('fs');
const path = require('path');
const Page = require('../page_objects/page');

module.exports = class Element extends Page {
  constructor() {
    super();

    fs.readdir(path.join(__dirname, 'properties'), (error, files) => {
      if (error) throw error;

      files
        .filter((filename) => filename.match(/.*.(properties)/ig))
        .forEach((filename) => {
          this.getProperties(filename);
        });
    });
  }

  async setElement(property) {
    if (property.value.match(/(%s)/ig)) {
      this[property.key] = (element) => $(property.value.replace(/(%s)/ig, element));
    } else {
      this[property.key] = $(property.value);
    }
  }

  async getProperties(filename) {
    new Properties(
      fs.readFileSync(path.join(__dirname, 'properties', filename)),
    ).collection.forEach((property) => {
      this.setElement(property);
    });
  }
};
