'use strict';

var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.html
  ],
  options: {
    htmlhintrc: '.htmlhintrc'
  }
};
