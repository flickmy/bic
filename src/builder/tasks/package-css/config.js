'use strict';

var cfg = require('nconf').get();

module.exports = {
  gulp: {
    options: {
      cwd: cfg.dir.dest
    },
    src: [
      cfg.patterns.css
    ],
    dest: cfg.dir.dest,
  },
  options: {}
};
