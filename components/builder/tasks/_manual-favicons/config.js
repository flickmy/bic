'use strict';

var path = require('path');
var cfg = require('nconf').get();

var cwd = path.join(cfg.dir.inputs, 'favicons');

module.exports = {
  options: {
    files: {
      // Path(s) for file to produce the favicons. `string` or `object`
      src: path.join(cwd, 'image.png'),

      // Path(s) for HTML file to write or append metadata. `string` or `array`
      html: path.join(cwd, 'template.jade'),

      // Path for writing the favicons to. `string`
      dest: path.join(cfg.dir.source, cfg.dir.favicons),

      // Path for overriding default icons path. `string`
      iconsPath: path.join('/', cfg.dir.favicons),

      // Path for an existing android_chrome_manifest.json. `string`
      androidManifest: null,

      // Path for an existing browserconfig.xml. `string`
      browserConfig: null,

      // Path for an existing manifest.webapp. `string`
      firefoxManifest: null,

      // Path for an existing yandex-browser-manifest.json. `string`
      yandexManifest: null
    },
    icons: {
      // Create Android homescreen icon. `boolean`
      android: true,

      // Create Apple touch icons. `boolean`
      appleIcon: true,

      // Create Apple startup images. `boolean`
      appleStartup: false,

      // Create Opera Coast icon. `boolean`
      coast: false,

      // Create regular favicons. `boolean`
      favicons: true,

      // Create Firefox OS icons. `boolean`
      firefox: false,

      // Create Facebook OpenGraph. `boolean`
      opengraph: false,

      // Create Windows 8 tiles. `boolean`
      windows: true,

      // Create Yandex browser icon. `boolean`
      yandex: false
    },
    settings: {
      // Your application's name. `string`
      appName: cfg.model.site.title,

      // Your application's description. `string`
      appDescription: null,

      // Your (or your developer's) name. `string`
      developer: null,

      // Your (or your developer's) URL. `string`
      developerURL: null,

      // Your application's version number. `number`
      version: 1.0,

      // Background colour for flattened icons. `string`
      background: null,

      // Path for the initial page on the site. `string`
      index: null,

      // URL for your website. `string`
      url: null,

      // Turn the logo into a white silhouette for Windows 8. `boolean`
      silhouette: false,

      // Print logs to console? `boolean`
      logging: true
    }

    // , favicon_generation: null, // Complete JSON overwrite for the favicon_generation object. `object`
  }
};
