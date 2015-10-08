'use strict';

var Runner = require('./init/runner');
var Sequencer = require('./init/sequencer');

module.exports = {

  init: function() {

    Runner.init();
    Sequencer.init();

    return this;
  },

  exec: function(id) {

    Sequencer.exec(id);

    return this;
  }
};
