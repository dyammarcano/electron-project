const gulp = require('gulp');

gulp.task('copy:prod', copyProd);
gulp.task('copy:dev', copyDev);

gulp.task('resources:prod', resourcesProd);
gulp.task('resources:dev', resourcesDev);

function copyProd() {
	return gulp.src(['./src/**', '!./src/files', './src/main.js', '!./src/renderer.js'])
		.pipe(gulp.dest('./dist/'));
}

function resourcesProd() {
	return gulp.src(['./resources/**'])
		.pipe(gulp.dest('./dist/'));
}

function copyDev() {
	return gulp.src(['./src/**'])
		.pipe(gulp.dest('./tmp/'));
}

function resourcesDev() {
	return gulp.src(['./resources/**'])
		.pipe(gulp.dest('./tmp/'));
}
