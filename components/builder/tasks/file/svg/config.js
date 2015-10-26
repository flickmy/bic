'use strict';

var path = require('path');
var cfg = require('nconf').get();

module.exports = {
  cwd: cfg.dir.inputs,
  src: [
    cfg.patterns.svg
  ],
  dest: cfg.dir.projectRoot,
  options: {
    shape: {
      id: {
        generator: function(name) {
          name = name.split('.svg')[0];
          var icon = name.split('/');
          if (icon.length) {
            return 'icon-' + icon[icon.length - 1];
          } else {
            return 'icon-' + icon;
          }
        }
      }
    },
    mode: {
      symbol: {
        inline: true,
        dest: '.',
        sprite: path.join(cfg.dir.generated, 'svg', 'icons.svg')
      }
    }
  }
};
