'use strict';

var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.dest,
  json: {
    src: [
      cfg.patterns.json
    ]
  },
  html: {
    src: [
      cfg.patterns.html
    ]
  },
  dest: cfg.dir.dest,
  dataKeyName: '__inline_data___'
};
