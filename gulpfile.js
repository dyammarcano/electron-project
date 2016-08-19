const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const hub = new HubRegistry(['gulp_tasks/*.task.js']);

gulp.registry(hub);

gulp.task('prod', gulp.series('copy:prod', 'resources:prod', 'electron'));
gulp.task('dev', gulp.series('copy:dev', 'resources:dev'));
