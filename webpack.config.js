// const path = require('path');
//
// module.exports = {
//   target: 'node',
//   context: path.join(__dirname, '/src'),
//   entry: {
//     app: './flajsh.js',
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: [/node_modules/],
//         use: [{
//           loader: 'babel-loader',
//           options: {presets: ['es2015']},
//         }],
//       },
//
//       // Loaders for other file types can go here
//     ],
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: "eslint-loader",
//       }
//     ],
//   },
// };

/**
 qlskfjalñfdsjasñlfj
 
 
 asdlfjaslñfdjaslf
 */

/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'BitfinexSDK';

let plugins = [], outputFile;

if(env === 'build') {
  plugins.push(new UglifyJsPlugin({minimize: true}));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  target: 'node',
  entry: 'flajsh.js',
  context: path.join(__dirname, '/src'),
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
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
};

module.exports = config;
