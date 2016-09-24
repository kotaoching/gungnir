var webpack = require('webpack')
var vue = require("vue-loader")
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: './dist',
    publicPath: '/static/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file?name=[name].[ext]?[hash]'
    }]
  },
  vue: {
    loaders: {
      sass: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }
  }
}
