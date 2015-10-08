'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  debounce: 2000,
  watch: {
    cwd: cfg.dir.root,
    src: [
      path.join(cfg.dir.source, cfg.patterns.templates),
      path.join(cfg.dir.dest, cfg.patterns.all)
    ]
  }
};
