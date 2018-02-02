//
// Copyright 2018 Wireline, Inc.
//

const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// TODO(burdon): Factor out.
const getDirectories = source => fs.readdirSync(source)
  .map(name => path.resolve(source, name))
  .filter(source => fs.lstatSync(source).isDirectory());

module.exports = {

  target: 'node',

  stats: 'errors-only',

  entry: {
    handler: [
      path.resolve('./handler.js')
    ]
  },

  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  // Copy asset files to deployment (available locally to Lambda functions).
  // unzip -vl .serverless/web.zip
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'views',
        to: 'views'
      },
      {
        from: 'assets',
        to: 'assets'
      }
    ])
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,    // Don't transpile deps.
        include: [
          getDirectories('..')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: './dist/babel-cache/'
          }
        }
      }
    ]
  }
};
