'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  options: {
    minify: true,
    rejected: true,
    info: true
  },
  gulp: {
    src: [
      path.join(cfg.dir.projectRoot, cfg.dir.dest, cfg.patterns.css)
    ],
    dest: path.join(cfg.dir.projectRoot, cfg.dir.dest)
  },
  css: {
    src: [
      path.join(cfg.dir.projectRoot, cfg.dir.dest, cfg.patterns.css)
    ]
  },
  content: {
    src: [
      path.join(cfg.dir.projectRoot, cfg.dir.dest, cfg.patterns.js),
      path.join(cfg.dir.projectRoot, cfg.dir.dest, cfg.patterns.html)
    ]
  }
};
