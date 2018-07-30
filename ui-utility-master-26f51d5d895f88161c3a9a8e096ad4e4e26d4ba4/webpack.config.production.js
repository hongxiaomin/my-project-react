const path = require('path');
const webpack = require('webpack');
const webpackConfigCommon = require('./webpack.config.common');

module.exports = {
  output: webpackConfigCommon.output,
  module: webpackConfigCommon.module,
  externals: webpackConfigCommon.externals,
  entry: [
    path.join(__dirname, 'index.js'),
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
  ],
};
