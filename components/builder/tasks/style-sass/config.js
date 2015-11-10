'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  gulp: {
    src: [
      cfg.patterns.sass
    ]
  },
  configPath: path.join(cfg.dir.projectRoot, '.csscomb.json'),
  options: {}
};
