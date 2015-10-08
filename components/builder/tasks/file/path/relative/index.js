'use strict';

var path = require('path');

var SPLIT = ', ';

module.exports = function(id, cfg) {

  var logger = require('@flickmy/bic-logger').get(id);

  function addTrailingSlash(filePath) {

    var fileName = filePath.substring(filePath.lastIndexOf('/'));

    if (fileName.indexOf('.') === -1) {

      // Not a path to a file, probably a route

      if (filePath.lastIndexOf('/') !== (filePath.length - 1)) {
        filePath += '/';

        logger.warn('Adding trailing slash', filePath);
      }
    }

    return filePath;
  }

  function updateCapturedPath(filePath, prependPath) {

    if (filePath.indexOf('/') === 0 && filePath.indexOf('//') === -1) {

      logger.debug('Found absolute path', filePath);

      filePath = prependPath + filePath;

      /**
       *  XXX: Just going to go ahead and add a trailing slash here because CloudFront
       *  https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/LinkFormat.html#Format_SignedLinks
       */

      filePath = addTrailingSlash(filePath);

      logger.debug('Updating to relative path', filePath);
    }

    return filePath;
  }

  function splitCapturedPaths(capture, prependPath) {

    return capture
      .split(SPLIT)
      .map(function(filePath) {
        return updateCapturedPath(filePath, prependPath);
      })
      .join(SPLIT);
  }

  function stripQuotesFromCapture(capture) {
    return capture.replace(/['"]+/g, '');
  }

  function getRelativePath(match, capture, prependPath) {

    /**
     *  `url('/path/to/file')`
     *
     *  should be using single quotes,
     *
     *  source: http://sass-guidelin.es/#urls
     *
     *  ...and is possibly using double quotes,
     *  so we'll strip them from the capture.
     */

    capture = stripQuotesFromCapture(capture);

    var replaceCapture = splitCapturedPaths(capture, prependPath);

    match = match.replace(capture, replaceCapture);

    return match;
  }

  cfg.gulp.task(id, function() {

    var taskConfig = cfg.tasks[id];

    var prependPath = '';

    return cfg.gulp.src(taskConfig.src, {
        cwd: taskConfig.cwd
      })
      .pipe(cfg.$.tap(function(file) {

        prependPath = path.relative(path.dirname(file.path), cfg.dir.dest);

        if (prependPath === '') {
          prependPath = '.';
        }

        // logger.debug('Prepending', prependPath);

      }))
      .pipe(cfg.$.replace(/url\((.*?)\)/g, function(match, capture) {

        return getRelativePath(match, capture, prependPath);
      }))
      .pipe(cfg.$.replace(/="(.*?)"/g, function(match, capture) {

        return getRelativePath(match, capture, prependPath);
      }))
      .pipe(cfg.gulp.dest(taskConfig.dest));
  });
};
