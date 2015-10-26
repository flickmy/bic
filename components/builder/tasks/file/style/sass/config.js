'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.source,
  src: [
    cfg.patterns.sass
  ],
  configPath: path.join(cfg.dir.projectRoot, '.csscomb.json'),
  options: {},
  dest: cfg.dir.source // Since we cannot report, we repair
};
