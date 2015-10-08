'use strict';

var fs = require('fs-extra');
var cfg = require('nconf').get();

var csslintrc = fs.readJsonSync('.csslintrc');

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.css,
    cfg.patterns.ignore('**', cfg.dir.vendor, '**')
  ],
  options: {
    csslintrc: csslintrc
  }
};
