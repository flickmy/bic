'use strict';

var favicons = require('favicons');
var del = require('del');
var rek = require('rekuire');

var watcher = rek('components/builder/utils/watcher');

module.exports = function(id, cfg) {

  var logger = require('@flickmy/bic-logger').get(id);

  var taskConfig = cfg.tasks[id];

  cfg.gulp.task(id, function(cb) {

    watcher(id, cfg, this);

    del.sync([taskConfig.options.files.html]);

    favicons(taskConfig.options, function(error, metadata) {

      if (error) {
        throw error;
      }

      cb();

    });
  });
};
