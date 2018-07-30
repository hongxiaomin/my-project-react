const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'web', 'js'),
    filename: 'bundle.js',
    publicPath: '/js/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style!css?module',
      },
    ],
  },
};
