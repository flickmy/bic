'use strict';

var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.source,
  src: [
    cfg.patterns.json
  ],
  options: {
    comments: true
  }
};
