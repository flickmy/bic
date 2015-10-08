'use strict';

// var crypto = require('crypto');
var path = require('path');
var cfg = require('nconf').get();

// XXX: https://github.com/smysnk/gulp-rev-all#options
var hashLength = 16;

// var FILENAME_PREFIX = 'rev';
var FILENAME_JOINER = '-';

// var FILENAME_RANDOM = crypto.randomBytes(hashLength / 2).toString('hex');

// var filenameRandomSearchStringList = [
//   'index.html'
// ];

// var filenamePrefixSearchStringList = [
//   'modernizr.js'
// ];

var options = {
  debug: true,
  fileNameVersion: cfg.model.file.version,
  fileNameManifest: cfg.model.file.manifest,
  hashLength: hashLength,
  transformFilename: function(file, hash) {

    // Pattern based on: https://docs.aws.amazon.com/AmazonS3/latest/dev/request-rate-perf-considerations.html

    // var hash = hash.substr(0, hashLength);
    var ext = path.extname(file.path);
    var name = path.basename(file.path, ext) + ext;

    // filenameRandomSearchStringList.map(function(s) {
    //   if (name.indexOf(s) !== -1) {

    //     hash = FILENAME_RANDOM;
    //   }
    // });

    name = hash + FILENAME_JOINER + name;

    // filenamePrefixSearchStringList.map(function(s) {
    //   if (name.indexOf(s) !== -1) {
    //     name = FILENAME_PREFIX + FILENAME_JOINER + name;
    //   }
    // });

    return name;
  },

  // transformPath: function(rev, source, path) {
  //   return rev;
  // },
  dontGlobal: [
    /\/favicons\//
  ],

  dontRenameFile: [
    /\/index.html/
  ],

  dontSearchFile: [
    /.js/
  ],

  // dontUpdateReference: [],
};

module.exports = {
  cwd: cfg.dir.dest,
  src: [
    cfg.patterns.all,
    cfg.patterns.ignore(path.join(cfg.dir.favicons, '**'))
  ],
  dest: cfg.dir.dest,
  ignore: '**/index.html',
  options: options
};
