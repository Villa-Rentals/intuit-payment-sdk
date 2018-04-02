/**
 * Copyright: Copyright © 2018
 * This file contains trade secrets of Villa Rentals. No part may be reproduced or transmitted in any
 * form by any means or for any purpose without the express written permission of Villa Rentals.
 */

'use strict'

const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const path = require('path')
const pkg = require('./package.json')

let libraryName = pkg.name

let plugins = []
let outputFile

if (process.env.ENV === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }))
  outputFile = 'index.min.js'
} else {
  outputFile = 'index.js'
}

const config = {
  target: 'node',
  entry: path.join(__dirname, '/src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/lib', `/${libraryName}`),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
}

module.exports = config
