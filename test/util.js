'use strict'

const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');

const escape = (text) => text.replace(/\n/g, '\\n');

exports.escape = escape;

const compile = (file) => {
  const compiler = webpack({
    entry: file,
    context: __dirname,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.graphql$/,
          use: path.resolve(__dirname, '../')
        }
      ]
    }
  });

  compiler.outputFileSystem = new MemoryFS();

  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => (
      error
        ? reject(error)
        : resolve(stats)
    ));
  });
};

exports.compile = compile;
