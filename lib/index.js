'use strict';

const path = require('path');
const child_process = require('child_process');

const Promise = require('bluebird');
const phantomjs = require('phantomjs-prebuilt');

module.exports = (html, opts) =>
  new Promise((resolve, reject) => {
    opts = opts || {};

    const output = [];
    const errorOutput = [];
    const scriptPath = [
      path.join(__dirname, 'rasterize.phantom.js'),
      opts.format || 'A4',
      opts.orientation || 'portrait',
      opts.margin || '0'
    ];
    const childPhantom = child_process.spawn(phantomjs.path, scriptPath);

    childPhantom.stdout.on('data', (data) => output.push(data));
    childPhantom.stderr.on('data', (data) => errorOutput.push(data));
    childPhantom.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(errorOutput.join()));
      }
      return resolve(Buffer.concat(output));
    });
    childPhantom.stdin.write(html);
    childPhantom.stdin.end();
  });
