'use strict';

var del = require('del');
var rek = require('rekuire');

var Task = rek('components/builder/utils/task');

// TODO: DI?, Some namespace like Bic.Task?
module.exports = new Task(function init() {

  var src = this.config.local.src;

  return this.gulp.task(this.id, (cb) => {

    this.logger.info('Cleaning', src);

    del.sync(src);

    cb();
  });
});
