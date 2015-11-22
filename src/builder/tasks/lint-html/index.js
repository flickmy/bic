'use strict';

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return this.stream
    .pipe(this.$.htmlhint(this.config.local.options))
    .pipe(this.$.htmlhint.reporter())
    .pipe(this.$.htmlhint.failReporter());
});
