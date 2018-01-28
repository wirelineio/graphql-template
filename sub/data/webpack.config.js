//
// Copyright 2017 Wireline, Inc.
//

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

  target: 'node',

  stats: 'errors-only',

  entry: {
    handler: [
      path.resolve('./handler.js')
    ]
  },

  // https://github.com/serverless-heaven/serverless-webpack#output
  // https://webpack.js.org/configuration/output/#module-definition-systems
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  // Copy static files to deployment (available locally to Lambda functions).
  // unzip -vl .serverless/web.zip
  // plugins: [
  //   new CopyWebpackPlugin([
  //     {
  //       from: './data',
  //       to: 'data'
  //     }
  //   ])
  // ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,    // Don't transpile deps.
        include: [
          '.'
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: './dist/babel-cache/'
          }
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,    // Don't transpile deps.
        use: {
          loader: 'graphql-tag/loader',
        }
      },
    ]
  }
};
