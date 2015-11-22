'use strict';

let RevAll = require('gulp-rev-all');

let Task = require('../../utils/task');

module.exports = new Task(function() {

  var rev = new RevAll(this.config.local.options);

  return this.stream
    .pipe(rev.revision())
    .pipe(this.gulp.dest(this.config.local.gulp.dest))
    .pipe(this.$.ignore(this.config.local.ignore))
    .pipe(this.$.revNapkin())
    .pipe(rev.manifestFile())
    .pipe(this.gulp.dest(this.config.global.dir.projectRoot))
    .pipe(rev.versionFile())
    .pipe(this.gulp.dest(this.config.global.dir.projectRoot));
});
