const path = require('path');
const webpack = require('webpack');
const webpackConfigCommon = require('./webpack.config.common');

module.exports = {
  output: webpackConfigCommon.output,
  module: webpackConfigCommon.module,
  externals: webpackConfigCommon.externals,
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'index.js'),
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
