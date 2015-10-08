'use strict';

// TODO: (ray) Add a watcher and some caching to lint JS on file change

module.exports = function(id, cfg) {

  var taskConfig = cfg.tasks[id];

  var logger = require('@flickmy/bic-logger').get(id);

  cfg.gulp.task(id, function() {

    return cfg.gulp.src(taskConfig.src, {
        cwd: taskConfig.cwd
      })
      .pipe(cfg.$.jshint(taskConfig.options))
      .pipe(cfg.$.jshint.reporter(taskConfig.reporter))
      .pipe(cfg.$.jshint.reporter('fail'))
      .on('error', function(error) {
        [
          '******************************************************',
          '  ' + error.message,
          '    Stopping process',
          '    Check logs for more information',
          '******************************************************'
        ].map(function(msg) {
          logger.error(msg);
        });

        process.exit(1);
      })
      // .pipe(cfg.$.notify(taskConfig.notify))
    ;
  });
};
