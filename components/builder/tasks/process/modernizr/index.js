'use strict';

var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var modernizr = require('modernizr');
var modernizrConfig = require('modernizr/lib/config-all.json');
var rek = require('rekuire');

var watcher = rek('components/builder/utils/watcher');

module.exports = function(id, cfg) {

  var logger = require('@flickmy/bic-logger').get(id);

  var taskConfig = cfg.tasks[id];

  var dest = path.join(cfg.dir.root, taskConfig.dest, taskConfig.filename);

  _.each(taskConfig.settings.excludeTests, function(excludeTest) {
    logger.info('Exclude test', excludeTest);
    _.remove(modernizrConfig['feature-detects'], function(testName) {
      return testName === excludeTest;
    });
  });

  cfg.gulp.task(id, function(cb) {
    var stream = this;

    if (taskConfig.crawl === true) {
      logger.info('Building custom Modernizr from tests');

      cfg.gulp.src(taskConfig.src, {
          cwd: taskConfig.cwd
        })
        .pipe(cfg.$.modernizr(taskConfig.filename, taskConfig.settings))
        .pipe(cfg.gulp.dest(taskConfig.dest))
        .on('end', cb);

    } else {
      logger.info('Creating general Modernizr for local development');

      if (fs.existsSync(dest)) {
        logger.info('Detected general Modernizr build at', dest);
        cb();

      } else {

        modernizr.build(modernizrConfig, function(result) {
          logger.info('Completed general Modernizr build at', dest);
          fs.outputFileSync(dest, result);
          watcher(id, cfg, stream);
          cb();
        });
      }
    }
  });
};
