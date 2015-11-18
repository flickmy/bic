'use strict';

let webpack = require('webpack');

let Task = require('../../utils/task');

module.exports = new Task(function() {

  let isComplete = false;

  return (cb) => {

    /**
     * TODO: Is there a way to configure webpack without initializing?
     */
    this.config.local.init();

    webpack(this.config.local, (err, stats) => {

      if (err) {
        this.logger.error(err);
      }

      /* http://webpack.github.io/docs/node.js-api.html#stats-tojson */
      this.logger.info(stats.toString({
        colors: true, // with console colors
        hash: false, // add the hash of the compilation
        version: false, // add webpack version information
        timings: true, // add timing information
        assets: true, // add assets information
        chunks: false, // add chunk information
        chunkModules: false, // add built modules information to chunk information
        modules: false, // add built modules information
        cached: false, // add also information about cached (not built) modules
        reasons: false, // add information about the reasons why modules are included
        source: false, // add the source code of modules
        errorDetails: false, // add details to errors (like resolving log)
        chunkOrigins: false, // add the origins of chunks and chunk merging info
        modulesSort: false, // (string) sort the modules by that field
        chunksSort: false, // (string) sort the chunks by that field
        assetsSort: false // (string) sort the assets by that field
      }));

      /**
       *
       *   XXX: This handler is called on each webpack watch event.
       *
       *   It's necessary to call the Gulp callback function here
       *   to let Gulp know that webpack has successfully completed,
       *   however we cannot call again or Gulp will throw an error:
       *
       *     `Error: task completion callback called too many times`
       *
       *   Optionally we could call the Glup callback outside of
       *   the webpack event handler but this will cause breakages
       *   if there are downstream dependencies on compiled files.
       *
       *     E.g. Minification, concatenation, versioning, etc.
       *
       *   Unresolved discussion thread here:
       *
       *     https://gitter.im/webpack/webpack/archives/2014/12/01
       *
       *   The "flag" allows Glup to continue and webpack to watch.
       *
       */

      if (isComplete === false) {

        isComplete = true;

        cb();
      }
    });
  };
});

// 'use strict';
//
// var webpack = require('webpack');
//
// module.exports = function(id, cfg) {
//
//   var logger = require('@flickmy/bic-logger').get(id);
//
//   var taskConfig = cfg.tasks[id];
//
//   var isComplete = false;
//
//   cfg.gulp.task(id, function(cb) {
//
//     // XXX: Task config has dependencies and needs to be initilaized
//     taskConfig.init();
//
//     webpack(taskConfig, function(err, stats) {
//
//       if (err) {
//         logger.error(err);
//       }
//
//       /* http://webpack.github.io/docs/node.js-api.html#stats-tojson */
//       logger.info(stats.toString({
//         colors: true, // with console colors
//         hash: false, // add the hash of the compilation
//         version: false, // add webpack version information
//         timings: true, // add timing information
//         assets: true, // add assets information
//         chunks: false, // add chunk information
//         chunkModules: false, // add built modules information to chunk information
//         modules: false, // add built modules information
//         cached: false, // add also information about cached (not built) modules
//         reasons: false, // add information about the reasons why modules are included
//         source: false, // add the source code of modules
//         errorDetails: false, // add details to errors (like resolving log)
//         chunkOrigins: false, // add the origins of chunks and chunk merging info
//         modulesSort: false, // (string) sort the modules by that field
//         chunksSort: false, // (string) sort the chunks by that field
//         assetsSort: false // (string) sort the assets by that field
//       }));
//
//       /**
//        *
//        *   XXX: This handler is called on each webpack watch event.
//        *
//        *   It's necessary to call the Gulp callback function here
//        *   to let Gulp know that webpack has successfully completed,
//        *   however we cannot call again or Gulp will throw an error:
//        *
//        *     `Error: task completion callback called too many times`
//        *
//        *   Optionally we could call the Glup callback outside of
//        *   the webpack event handler but this will cause breakages
//        *   if there are downstream dependencies on compiled files.
//        *
//        *     E.g. Minification, concatenation, versioning, etc.
//        *
//        *   Unresolved discussion thread here:
//        *
//        *     https://gitter.im/webpack/webpack/archives/2014/12/01
//        *
//        *   The "flag" allows Glup to continue and webpack to watch.
//        *
//        */
//
//       if (isComplete === false) {
//
//         isComplete = true;
//
//         cb();
//       }
//     });
//   });
// };
