'use strict';

module.exports = function(id, cfg) {

  cfg.gulp.task(id, function() {

    var taskConfig = cfg.tasks[id];

    var logger = require('@flickmy/bic-logger').get(id);

    return cfg.gulp.src(taskConfig.src, {
        cwd: taskConfig.cwd
      })
      .pipe(cfg.$.jsonLint(taskConfig.options))
      .pipe(cfg.$.jsonLint.report(function(lint, file) {

        if (!file.success) {

          [
            '******************************************************',
            '      Error : ' + lint.error,
            '         In : ' + file.path,
            '       Line : ' + lint.line,
            '  Character : ' + lint.character,
            '    Stopping process',
            '    Check logs for more information',
            '******************************************************'
          ].map(function(msg) {
            logger.warn(msg);
          });

          process.exit(1);
        }

      }))
      // .pipe(cfg.$.notify(taskConfig.notify))
    ;
  });
};
