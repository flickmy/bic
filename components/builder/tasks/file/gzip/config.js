'use strict';

var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.fonts,
    cfg.patterns.json,
    cfg.patterns.html,
    cfg.patterns.css,
    cfg.patterns.js
  ],
  dest: cfg.dir.dest
};
