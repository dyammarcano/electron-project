const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

gulp.task('electron', stream);

function stream() {
  return gulp.src('./src/*.js')
  	.pipe(named())
    .pipe(webpackStream())
    .pipe(gulp.dest('./dist/'));
}