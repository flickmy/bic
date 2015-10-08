'use strict';

var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.css,
    cfg.patterns.html
  ],
  dest: cfg.dir.dest
};
