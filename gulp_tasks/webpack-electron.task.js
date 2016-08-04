const gulp = require('gulp');
const config = require('../config/webpack.config');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

gulp.task('electron', electron);

function electron() {
  return gulp.src(['./src/*.js'])
    .pipe(named())
    .pipe(webpackStream({ config }))
    .pipe(gulp.dest('./dist/'));
}