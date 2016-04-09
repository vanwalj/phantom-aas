'use strict';

var system = require('system');
var fs = require('fs');
var page = require('webpage').create();

var renderFormat = system.args[1];
var renderOrientation = system.args[2];
var renderMargin = system.args[3];

page.paperSize = {
  format: renderFormat,
  orientation: renderOrientation,
  margin: renderMargin
};

page.onLoadFinished = function() {
  page.render('/dev/stdout', { format: 'pdf' });
  phantom.exit(0);
};

page.content = fs.read('/dev/stdin');
