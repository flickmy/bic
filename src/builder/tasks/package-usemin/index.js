'use strict';

let Task = require('../../utils/task');

module.exports = new Task(function() {

  return this.stream
    .pipe(this.$.foreach((stream, file) => {
      return stream
        .pipe(this.$.pipemin({
          js: (stream, concat) => {
            return stream.pipe(concat);
          },

          css: (stream, concat) => {
            return stream.pipe(concat);
          }
        }));
    }));
});
