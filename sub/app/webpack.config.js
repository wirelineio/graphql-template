//
// Copyright 2017 Wireline, Inc.
//

const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// TODO(burdon): Factor out.
const getDirectories = source => fs.readdirSync(source)
  .map(name => path.resolve(source, name))
  .filter(source => fs.lstatSync(source).isDirectory());

module.exports = {

  target: 'web',

  stats: 'errors-only',

  // Source map shows original source and line numbers (and works with hot loader).
  // https://webpack.github.io/docs/configuration.html#devtool
  devtool: '#source-map',

  // https://webpack.js.org/configuration/dev-server/#devserver
  devServer: {
    contentBase: path.join('testing'),
    compress: true,
    publicPath: '/assets/app/',
    port: 3000
  },

  // https://webpack.js.org/configuration/resolve
  resolve: {

    extensions: ['.js'],

    // Resolve imports/requires.
    modules: [
      'node_modules'
    ]
  },

  entry: {
    'app': [
      path.resolve('./src/main.js')
    ]
  },

  output: {
    path: path.resolve('./client/dist'),
    filename: '[name].js',
    publicPath: '/assets/app/'        // Path for webpack-dev-server.
  },

  // TODO(burdon): Testing template.
  // https://www.npmjs.com/package/html-webpack-plugin

  module: {
    rules: [

      // See .babelrc for the presets.
      // https://github.com/babel/babel-loader
      {
        test: /\.js$/,
        exclude: /node_modules/,      // Don't transpile deps.
        include: [
          getDirectories('..')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: './dist/babel-cache/'
          }
        }
      },

      // https://github.com/webpack/json-loader
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader'
        }
      },

      // https://github.com/webpack/css-loader
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader'
        }
      },

      // https://github.com/webpack/less-loader
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },

      // https://github.com/webpack-contrib/url-loader
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        }
      },

      //https://www.apollographql.com/docs/react/recipes/webpack.html
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,    // Don't transpile deps.
        use: {
          loader: 'graphql-tag/loader',
        }
      },
    ]
  },


  // https://github.com/webpack/docs/wiki/list-of-plugins
  plugins: [

    // https://github.com/webpack/extract-text-webpack-plugin
    new ExtractTextPlugin('[name].css')
  ]
};
