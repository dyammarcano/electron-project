const gulp = require('gulp');
const HubRegistry = require('gulp-hub');

const hub = new HubRegistry(['./gulp_tasks/*.task.js']);

gulp.registry(hub);

gulp.task('build', gulp.series('copy', 'resources', 'electron'));