'use strict';

var cfg = require('nconf').get();

module.exports = {
  src: [
    cfg.dir.generated,
    cfg.dir.dest
  ]
};
