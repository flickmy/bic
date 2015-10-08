'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.css,
    cfg.patterns.ignore(path.join('**', cfg.dir.vendor, '**'))
  ],
  options: {

    // Be verbose and log files that have no collisions.
    logOk: true,

    // 0 through 100. Lower is more similar. Anything below 3 warns you.
    // 3 is the default threshold, but that's mostly personal opinion
    threshold: 3,

    // This color is just ignored entirely (use with caution)
    // ignore: [
    //   '#030303'
    // ],

    // These color combinations are ignored (usually use this)
    // whitelist: [
    //   [
    //     '#000000',
    //     '#010101'
    //   ]
    // ]
  },
  dest: cfg.dir.dest
};
