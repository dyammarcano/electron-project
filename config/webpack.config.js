const webpack = require('webpack');
const SplitByPathPlugin = require('webpack-split-by-path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'tslint'
      }
    ],
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'sass',
          'postcss'
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          'ts'
        ]
      },
      {
        test: /.html$/,
        loaders: [
          'html'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { unused: true, dead_code: true }
    }),
  ]
};
