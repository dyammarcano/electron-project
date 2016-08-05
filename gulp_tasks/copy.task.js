const gulp = require('gulp');

gulp.task('copy', copy);
gulp.task('resources', resources);

function copy () {
	return gulp.src(['./src/**', '!./src/files', './src/main.js','!./src/renderer.js'])
  	.pipe(gulp.dest('./dist/'));
}

function resources () {
	return gulp.src(['./resources/**'])
  	.pipe(gulp.dest('./dist/'));
}
