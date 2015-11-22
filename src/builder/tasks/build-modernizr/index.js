'use strict';

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return this.stream
    .pipe(this.$.modernizr(this.config.local.options.filename, this.config.local.options.settings));
});
