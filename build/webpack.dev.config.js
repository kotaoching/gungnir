var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = merge(baseWebpackConfig, {
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://localhost:8081',
      '/account/*': 'http://localhost:8081'
    }
  },
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css')
  ]
})
