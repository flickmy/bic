'use strict';

let path = require('path');

let Task = require('../../utils/task');

const SPLIT = ', ';

module.exports = new Task(function() {

  let logger = this.logger;

  let prependPath = '';

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

  return this.stream
    .pipe(this.$.tap((file) => {

      prependPath = path.relative(path.dirname(file.path), this.config.global.dir.dest);

      if (prependPath === '') {
        prependPath = '.';
      }

      // logger.debug('Prepending', prependPath);

    }))
    .pipe(this.$.replace(/url\((.*?)\)/g, (match, capture) => {

      return getRelativePath(match, capture, prependPath);
    }))
    .pipe(this.$.replace(/="(.*?)"/g, (match, capture) => {

      return getRelativePath(match, capture, prependPath);
    }));
});
