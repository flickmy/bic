'use strict';

var reporter = require('jscs-stylish').path;
var cfg = require('nconf').get();

module.exports = {
  gulp: {
    src: [
      cfg.patterns.js
    ]
  },
  options: {
    reporter: reporter
  }
};
