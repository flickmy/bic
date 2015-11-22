'use strict';

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return this.stream
    .pipe(this.$.imagemin(this.config.local.options));
});
