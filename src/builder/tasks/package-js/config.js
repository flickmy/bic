'use strict';

var cfg = require('nconf').get();

module.exports = {
  gulp: {
    options: {
      cwd: cfg.dir.dest
    },
    src: [
      cfg.patterns.js
    ],
    dest: cfg.dir.dest
  },
  options: {}
};
