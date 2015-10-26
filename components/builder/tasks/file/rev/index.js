'use strict';

var RevAll = require('gulp-rev-all');

module.exports = function(id, cfg) {

  var logger = require('@flickmy/bic-logger').get(id);

  cfg.gulp.task(id, function() {

    var taskConfig = cfg.tasks[id];

    var rev = new RevAll(taskConfig.options);

    return cfg.gulp.src(taskConfig.src, {
        cwd: taskConfig.cwd
      })
      .pipe(rev.revision())
      .pipe(cfg.gulp.dest(taskConfig.dest))
      .pipe(cfg.$.ignore(taskConfig.ignore))
      .pipe(cfg.$.revNapkin())
      .pipe(rev.manifestFile())
      .pipe(cfg.gulp.dest(cfg.dir.projectRoot))
      .pipe(rev.versionFile())
      .pipe(cfg.gulp.dest(cfg.dir.projectRoot));
  });
};
