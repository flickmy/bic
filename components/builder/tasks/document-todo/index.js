'use strict';

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return this.gulp.task(this.id, () => {

    return this.gulp.src(this.config.local.src, {
        cwd: this.config.local.cwd
      })
      .pipe(this.$.todo(this.config.local.options))
      .pipe(this.gulp.dest(this.config.local.dest));
  });
});
