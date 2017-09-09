const path = require('path');

module.exports = {
  target: 'node',
  context: path.join(__dirname, '/src'),
  // context: path.resolve(__dirname, 'src'),
  entry: {
    app: './flajsh.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {presets: ['es2015']},
        }],
      },
      
      // Loaders for other file types can go here
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      }
    ],
  },
};
