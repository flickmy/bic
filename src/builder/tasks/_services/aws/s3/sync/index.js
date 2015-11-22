'use strict';

var path = require('path');
var parallelize = require('concurrent-transform');

module.exports = function(id, cfg) {

  var logger = require('@bicjs/bic-logger').get('id');

  var taskConfig = cfg.tasks[id];

  cfg.gulp.task(id, function() {

    // Create a new publisher
    var publisher = cfg.$.awspublish.create({
      params: {
        Bucket: taskConfig.options.bucket
      }
    });

    // Define custom headers
    var headers = {
      'Cache-Control': 'max-age=315360000, no-transform, public'
    };

    return cfg.gulp.src(taskConfig.src, {
      cwd: taskConfig.cwd
    })

    .pipe(cfg.$.rename(function(filepath) {

      filepath.dirname = path.join(taskConfig.options.dir, filepath.dirname);
    }))

    .pipe(parallelize(publisher.publish(headers, {
      force: taskConfig.force
    }), 50))

    .pipe(publisher.sync(taskConfig.options.dir))

    // Create a cache file to speed up consecutive uploads
    // .pipe(publisher.cache())

    // Print upload updates to console
    .pipe(cfg.$.awspublish.reporter({
      // states: [
      //   'create',
      //   'update',
      //   'delete'
      // ]
    }));
  });
};
