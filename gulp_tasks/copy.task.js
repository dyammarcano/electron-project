const gulp = require('gulp');

gulp.task('copy', copy);

function copy () {
	return gulp.src(['./src/*.html', './src/*.css', './src/*.json', './src/main.js'], { base: './src/' })
  	.pipe(gulp.dest('./dist/'));
}
