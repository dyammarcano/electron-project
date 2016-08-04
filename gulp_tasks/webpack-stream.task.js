const gulp = require('gulp');
const config = require('../config/webpack.config');
const webpack = require('webpack-stream');
const named = require('vinyl-named');

gulp.task('stream', stream);

function stream() {
  return gulp.src('./src/app.js')
  	.pipe(named())
    .pipe(webpack({ config }))
    .pipe(gulp.dest('./dist/'));
}