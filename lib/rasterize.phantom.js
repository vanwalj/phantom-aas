// This is the scripting file executed by phantomjs
// So, no fancy ES6 stuff
'use strict';

var system = require('system');
var fs = require('fs');
var page = require('webpage').create();

var outputFormat = system.args[1] || 'pdf';
var renderFormat = system.args[2] || 'A4';
var renderOrientation = system.args[3] || 'portrait';
var renderMargin = system.args[4] || '1cm';

if (outputFormat === '--help') {
  console.error('Missing parameters');
  console.error('Usage: phantomjs ' + phantom.scriptName + ' inputFile [outputFormat=pdf] [renderFormat=A4] [renderOrientation=portrait] [renderMargin=1cm]');
  phantom.exit(1);
}

page.paperSize = {
  format: renderFormat,
  orientation: renderOrientation,
  margin: renderMargin
};

page.content = fs.read('/dev/stdin');
page.render('/dev/stdout', { format: outputFormat });

phantom.exit(0);
