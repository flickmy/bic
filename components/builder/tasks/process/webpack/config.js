'use strict';

/* *** Begin Workarounds *** */

/*
 * sass-loader doesn't appear to play nice with webpack beyond 0.5.0 with node-sass 2.1.1.
 *
 * Threading issue in 0.6.0:
 *
 *  https://github.com/jtangelder/sass-loader/issues/100 - Silently fails/stalls webpack with no error
 *  https://github.com/sass/node-sass/issues/857 - Render with custom import hangs
 *
 *     Workaround is: process.env.UV_THREADPOOL_SIZE = 100;
 *
 * Also an issue with >=0.5.0 where imports from module directories are broken:
 *
 *  https://github.com/jtangelder/sass-loader#imports
 *
 * Possibly related to:
 *
 *  https://github.com/jtangelder/sass-loader/issues/108 - Nested files don't get passed '~' option
 *
 * Issue opened here:
 *
 *  https://github.com/jtangelder/sass-loader/issues/131
 *
 */

/* *** End Workarounds *** */

var path = require('path');
var glob = require('globby');
var webpack = require('webpack');

var BowerWebpackPlugin = require('bower-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cfg = require('nconf').get();

var logger = require('@flickmy/bic-logger').get('webpack');

// Create bundle filenames
var BUNDLE = ['js', 'css']
  .reduce(function createBundleFilename(obj, ext) {
    obj[ext] = ['index', ext].join('.');
    return obj;
  }, {});

// Construct absolute paths (webpack likes absolute paths)
var sourceDir = path.join(cfg.dir.root, cfg.dir.source);
var destDir = path.join(cfg.dir.root, cfg.dir.dest);
var nodeDir = path.join(cfg.dir.root, cfg.packages.node);
var bowerDir = path.join(cfg.dir.root, cfg.packages.bower);

// Asset paths
var fontPath = path.join(cfg.dir.fonts, '[name].[ext]');

// Create config
var config = {
  cache: true,
  watch: true,
  debug: true,

  // XXX: must be `source-map` or `inline-source-map` https://github.com/jtangelder/sass-loader#source-maps
  devtool: '#inline-source-map',
  resolve: {},
  resolveLoader: {},
  entry: {},
  plugins: [],
  module: {
    loaders: []
  },
  context: sourceDir,
  output: {
    path: destDir,
    filename: path.join('[name]', BUNDLE.js)
  }
};

var resolvePathList = [
  nodeDir,
  bowerDir,
  sourceDir
];

// Resolve Project modules
config.resolve.root = cfg.dir.projectRoot;
config.resolve.modulesDirectories = resolvePathList;
config.resolve.extensions = ['', '.js'];

// Resolve Package loaders
config.resolveLoader.root = cfg.dir.packageRoot;
config.resolveLoader.modulesDirectories = [
  path.join(cfg.dir.packageRoot, cfg.packages.node)
];

// Add plugins
config.plugins.push(new webpack.optimize.OccurenceOrderPlugin(true));

config.plugins.push(new BowerWebpackPlugin({
  modulesDirectories: [bowerDir],
  manifestFiles: 'bower.json',
  includes: /.*/,
  excludes: [],
  searchResolveModulesDirectories: true
}));

config.plugins.push(new ExtractTextPlugin(path.join('[name]', BUNDLE.css), {
  allChunks: true
}));


// Add loaders

// SASS include paths
var includePaths = resolvePathList.reduce(function addSassIncludePath(paths, path) {
  paths.push('&includePaths[]=' + path);
  return paths;
}, []).join('');

config.module.loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style',
    'css?sourceMap' +
    '!autoprefixer?' + JSON.stringify(cfg.plugins.autoprefixer) +

    // TODO: Enable relative 'url' values in compiled CSS
    '!sass?' +

    // Allows root relative paths in SASS
    '&root=' + sourceDir +
    '&outputStyle=expanded' +
    includePaths, {
      publicPath: '/'
    }
  )
});

config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(
    'style',
    'css?sourceMap'
  )
});

config.module.loaders.push({
  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url?limit=10000&minetype=application/font-woff&name=' + fontPath
});

config.module.loaders.push({
  test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'file-loader?name=' + fontPath
});

// Override defaults for production release
if (cfg.release === true) {

  logger.warn('************************');
  logger.warn('CREATING RELEASE VERSION');
  logger.warn('************************');

  config.cache = false;
  config.watch = false;
  config.debug = false;
  config.devtool = false;

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: cfg.envType.PRODUCTION
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
} else {

  config.plugins.push(
    new webpack.DefinePlugin({
      DEBUG: true
    })
  );
}

config.init = function() {

  // Create module entry points
  var chunks = [];
  var entryName;
  var pagesDir;

  function createEntryPoint(obj, entryPath) {
    entryName = path.dirname(entryPath, path.extname(entryPath));
    obj[entryName] = path.join(pagesDir, entryPath);
    chunks.push(entryName);
    return obj;
  }

  pagesDir = path.join(cfg.dir.root, cfg.dir.pages);

  config.entry = glob.sync([cfg.patterns.js], {
      cwd: pagesDir
    })
    .reduce(createEntryPoint, {});

  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: cfg.dir.common,
    filename: path.join('[name]', BUNDLE.js),
    chunks: chunks
  }));

  // Special case for vendor code

  // config.entry[cfg.dir.vendor] = [
  //   path.join(sourceDir, cfg.dir.vendor)
  // ];

  // config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  //   name: cfg.dir.vendor,
  //   filename: path.join('[name]', BUNDLE.js),

  //   // We need to be extremely explicit about vendor chunks
  //   // so a dedicated entry point is the easy way to manage
  //   chunks: [cfg.dir.vendor],

  //   // With more entries, this ensures that no other module goes into the vendor chunk
  //   minChunks: Infinity
  // }));
};

module.exports = config;
