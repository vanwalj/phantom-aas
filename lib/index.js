'use strict';

const path = require('path');
const child_process = require('child_process');

const Promise = require('bluebird');
const phantomjs = require('phantomjs-prebuilt');

module.exports = (html, opts) =>
  new Promise((resolve, reject) => {
    const output = [];
    const errorOutput = [];
    const childPhantom = child_process.spawn(phantomjs.path, [path.join(__dirname, 'rasterize.phantom.js')]);
    
    childPhantom.stdout.on('data', data => output.push(data));
    childPhantom.stderr.on('data', data => errorOutput.push(data));
    childPhantom.on('close', code => {
      if (code !== 0) {
	return reject(errorOutput.join());
      }
      return resolve(output.join());
    });
    childPhantom.stdin.write(html);
    childPhantom.stdin.end();
  });
