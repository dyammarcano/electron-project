const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ 
      beautify: true, 
      mangle: false, 
      compress: false 
    }),
  ]
};
