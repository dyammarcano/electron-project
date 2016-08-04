const gulp = require('gulp');
const electron = require('gulp-electron');
const packageJson = require('../package.json');

gulp.task('compile', compile);

function compile () {
  return gulp.src("")
	  .pipe(electron({
	      src: './dist',
	      packageJson: packageJson,
	      release: './release',
	      cache: './cache',
	      version: 'v1.3.1',
	      packaging: true,
        asar: true,
	      platforms: ['darwin','win32','linux'],
	      platformResources: {
          darwin: {
              CFBundleDisplayName: packageJson.name,
              CFBundleIdentifier: packageJson.name,
              CFBundleName: packageJson.name,
              CFBundleVersion: packageJson.version,
              icon: './resources/icon/app.icns'
          },
          win: {
              "version-string": packageJson.version,
              "file-version": packageJson.version,
              "product-version": packageJson.version,
              "icon": './resources/icon/app.ico'
          }
	      }
	  }))
	  .pipe(gulp.dest(""));
}
