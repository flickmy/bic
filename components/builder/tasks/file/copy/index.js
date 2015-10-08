'use strict';

var rek = require('rekuire');

var watcher = rek('components/builder/utils/watcher');

module.exports = function(id, cfg) {

  var logger = require('@flickmy/bic-logger').get(id);

  var taskConfig = cfg.tasks[id];

  cfg.gulp.task(id, function() {

    watcher(id, cfg, this);

    return cfg.gulp.src(taskConfig.src, {
        base: taskConfig.base
      })

      // .pipe(cfg.$.tap(function(file) {
      //   logger.debug('Copying:', file.path);
      // }))
      .pipe(cfg.gulp.dest(taskConfig.dest));
  });
};
