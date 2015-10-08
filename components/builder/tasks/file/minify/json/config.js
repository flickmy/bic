'use strict';

var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.json
  ],
  dest: cfg.dir.dest,
  options: {}
};
