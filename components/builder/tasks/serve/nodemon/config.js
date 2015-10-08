'use strict';

var fs = require('fs-extra');
var path = require('path');
var cfg = require('nconf').get();

module.exports = fs.readJsonSync(path.join(cfg.dir.root, 'nodemon.json'));
