'use strict';

var path = require('path');
var findup = require('findup');
var cfg = require('nconf').get();
var projectRoot = process.cwd();
var packageRoot = findup.sync(__dirname, 'package.json');

// Can be overidden
var source = 'app';
var build = 'build';
var assets = 'assets';
var generated = 'generated';
var dist = 'dist';
var temp = '.tmp';
var dest = cfg.release ? dist : temp;

module.exports = {

  preview: false,
  release: false,

  // Template configs
  templates: {
    page: {
      config: 'config.json'
    }
  },

  dir: {

    // TODO: Remove references to 'root' and make package/project root references more explicit
    // Package 'root'
    packageRoot: packageRoot,

    // Project 'root'
    projectRoot: projectRoot,

    // Build specific scripts and configurations
    build: build,

    // Individual tasks
    tasks: path.join(build, 'tasks'),

    // Sequences of tasks
    sequences: path.join(build, 'sequences'),

    // Application & Presentation
    // Presentation layer source
    source: source,

    // Page specific resources
    pages: path.join(source, 'pages'),

    // Modular resources
    modules: path.join(source, 'modules'),

    // And don't forget about layouts!
    layouts: path.join(source, 'layouts'),

    // Build 'dest' sub directories
    dist: dist,
    temp: temp,
    dest: dest,

    // Assets common to all app entry points
    common: 'common',

    // Any page or module specific configuration
    config: 'config',

    // Separate 3rd party assets for clarity and to work around certain tasks
    // XXX: (ray) Was previously separating from `common` because of linting but no longer necessary
    vendor: 'vendor',

    // For files run though the 'usemin' type tasks
    // XXX: (ray) Not necessary unless there is `vendor` and `common` code that needs to be concatenated
    usemin: 'usemin',

    // SVG Asset folder used to create icon sheet
    icons: 'icons',

    // Assets to be processed
    inputs: path.join(source, 'inputs'),

    // Output od inputs, this directory is ignored
    generated: generated,

    // Assets to be copied, run-once tasks like Favicons compile here
    assets: assets,

    // These 'assets' map 1:1 from source to dest, and so are useful for copying
    favicons: path.join(assets, 'favicons'),
    images: path.join(assets, 'images'),
    fonts: path.join(assets, 'fonts'),
    data: path.join(assets, 'data'),

    // Asset type specific directories
    // These probably aren't being used
    sass: 'sass',
    css: 'css',
    js: 'js'
  }
};

// TODO: Find a place for shared AWS configuration
// var hashLength = 16;
// var hashSeparator = '-';
// s3: {
//   options: {
//     bucket: cfg.S3_BUCKET_NAME,
//     dir: cfg.deploy ? cfg.deploy.dir : undefined
//   }
// },

// cloudfront: {
//   invalidateAll: false,
//   options: {
//     distributionId: cfg.deploy ? cfg.deploy.aws.distributionId : undefined,

//     // Default is -->  /^\/index\.[a-f0-9]{8}\.html(\.gz)*$/gi
//     patternIndex: new RegExp('^\/[a-f0-9]{' + hashLength + '}' + hashSeparator + 'index\.html(\.gz)*$', 'gi'),
//     region: 'us-standard'
//   }
// }
