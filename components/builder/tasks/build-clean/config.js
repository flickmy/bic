'use strict';

var cfg = require('nconf').get();

module.exports = {
  options: {
    src: [
      cfg.dir.generated,
      cfg.dir.dest
    ]
  }
};
