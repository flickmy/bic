'use strict';

let del = require('del');
let favicons = require('favicons');

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return (cb) => {

    del.sync([this.config.local.options.files.html]);

    favicons(this.config.local.options, (err) => {

      if (err) {
        throw err;
      }

      cb();

    });
  };
});
