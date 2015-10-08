'use strict';

module.exports = function(id, cfg) {

  cfg.gulp.task(id, function() {

    var taskConfig = cfg.tasks[id];

    var logger = require('@flickmy/bic-logger').get(id);

    return cfg.gulp.src(taskConfig.src, {
        cwd: taskConfig.cwd
      })
      .pipe(cfg.$.colorguard(taskConfig.options))
      .on('error', function(error) {

        var msg = error.message;

        [
          '******************************************************',
          '    Error : ' + msg.substring(msg.indexOf(':') + 2),
          '       In : ' + msg.substring(0, msg.indexOf(':')),
          '    Stopping process',
          '    Check logs for more information',
          '******************************************************'
        ].map(function(msg) {
          logger.warn(msg);
        });

        process.exit(1);
      })
      // .pipe(cfg.$.notify(taskConfig.notify))
      .pipe(cfg.gulp.dest(taskConfig.dest));
  });
};
