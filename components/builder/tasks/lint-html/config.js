'use strict';

var cfg = require('nconf').get();

module.exports = {
  gulp: {
    cwd: cfg.dir.dest,
    src: [
      cfg.patterns.html
    ]
  },
  options: {
    htmlhintrc: '.htmlhintrc'
  }
};
