'use strict';

var fs = require('fs-extra');
var del = require('del');
var glob = require('globby');
var path = require('path');
var cheerio = require('cheerio');
var vinylPaths = require('vinyl-paths');

module.exports = function(id, cfg) {

  cfg.gulp.task(id, function() {

    var taskConfig = cfg.tasks[id];

    var files = vinylPaths();

    return cfg.gulp.src(taskConfig.json.src, {
        cwd: taskConfig.cwd
      })
      .pipe(files)
      .on('end', function() {

        var data = files.paths.reduce(function(ob, filepath) {

          ob[path.basename(filepath, path.extname(filepath))] = fs.readJsonSync(filepath, {
            cwd: taskConfig.cwd
          });


          return ob
        }, {});

        del.sync(files.paths);

        glob.sync(taskConfig.html.src, {
            cwd: taskConfig.cwd
          })
          .map(function(filepath) {

            filepath = path.resolve(taskConfig.cwd, filepath);

            var file = fs.readFileSync(filepath, 'utf-8');

            var $ = cheerio.load(file);

            var html = '' +
              '<script type="text/javascript">' +
              '(function(window){window.' + taskConfig.dataKeyName + '=' + JSON.stringify(data) + ';}(this))' +
              '</script>';

            $('body > script').first().before(html);

            fs.writeFileSync(filepath, cfg.$.html());

          });

      });
  });
};
