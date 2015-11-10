'use strict';

var fs = require('fs-extra');
var cfg = require('nconf').get();

var options = fs.readJsonSync('.jshintrc');

module.exports = {
  gulp: {
    src: [
      cfg.patterns.js
    ]
  },
  options: options,
  reporter: 'jshint-stylish'
};
