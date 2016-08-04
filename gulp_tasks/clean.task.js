const gulp = require('gulp');
const del = require('del');

gulp.task('clean', clean);

function clean() {
  return del(['./dist/']);
}