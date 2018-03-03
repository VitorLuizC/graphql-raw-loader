'use strict'

const path = require('path')
const webpack = require('webpack')
const MemoryFS = require('memory-fs')

const loader = {
  test: /\.graphql$/,
  use: path.resolve(__dirname, '../')
}

module.exports = (entry, options) => {
  const compiler = webpack({
    entry,
    context: __dirname,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    module: {
      rules: [ loader ]
    }
  })

  compiler.outputFileSystem = new MemoryFS()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err)
        reject(err)
      resolve(stats)
    })
  })
}
