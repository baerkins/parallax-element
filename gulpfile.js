// Plugins
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var strip  = require('gulp-strip-comments')
var whitespace = require('gulp-whitespace');


/** Utility Tasks **/

/**
 * Utility: Lint Task
 * Lint js files
 *
 */
gulp.task('lint', function() {
  return gulp.src('./src/parallax-element.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-reporter-jscs'));
});


/** Build Tasks **/


/**
 * Build: Production
 * Creates production ready files for distribution
 *
 */
gulp.task('build_production', function() {
  return gulp.src('./src/parallax-element.js')
    .pipe( strip({
      safe: true
    }) )
    .pipe( whitespace({
      spacesToTabs: false,
      removeTrailing: true
    }) )
    .pipe(gulp.dest('dist'));
})