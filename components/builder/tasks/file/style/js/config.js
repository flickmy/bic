'use strict';

var reporter = require('jscs-stylish').path;
var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.source,
  src: [
    cfg.patterns.js
  ],
  options: {
    reporter: reporter
  }
};
