const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    /*new webpack.optimize.UglifyJsPlugin({ 
      compressor: {
        warnings: false
      }
    }),*/
  ],
  target: 'electron-renderer',
  node: {
    __dirname: false,
    __filename: false
  },
};
