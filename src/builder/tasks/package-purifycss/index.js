'use strict';

let glob = require('globby');
let purify = require('purify-css');

let Task = require('../../utils/task');

module.exports = new Task(function() {

  // return (cb) => {
  //
  //   let content = glob.sync(this.config.local.content.src);
  //   let css = glob.sync(this.config.local.css.src);
  //   let options = this.config.local.options;
  //   let callback = (ob) => {
  //     this.logger.debug('Done!', ob);
  //     cb();
  //   };
  //
  //   this.logger('content', content);
  //   this.logger('css', css);
  //
  //   purify(content, css, options, callback);
  //
  // };

  return this.stream
    .pipe(this.$.purifycss(this.config.local.content.src, this.config.local.options));
});
