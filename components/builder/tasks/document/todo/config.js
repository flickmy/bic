'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.root,
  src: [
    cfg.patterns.js,
    cfg.patterns.sass,
    cfg.patterns.ignore(cfg.dir.temp),
    cfg.patterns.ignore(cfg.dir.dist),
    cfg.patterns.ignore(path.join('**', cfg.packages.node, '**')),
    cfg.patterns.ignore(path.join('**', cfg.packages.bower, '**'))
  ],
  dest: cfg.dir.root,
  options: {
    verbose: true
  }
};
