'use strict';

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return this.stream
    .pipe(this.$.csslint(this.config.local.options))
    .pipe(this.$.csslint.reporter());
});
