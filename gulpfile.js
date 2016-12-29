// Plugins
var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var strip      = require('gulp-strip-comments')
var whitespace = require('gulp-whitespace');
var emptyLines = require('gulp-remove-empty-lines');
var clean      = require('gulp-clean');


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

/**
 * Utility: Clean Dist Task
 * Remove all dist files
 *
 */
gulp.task('clean_dist', function(){
  return gulp.src('./dist')
    .pipe(clean());
});


/** Build Tasks **/


/**
 * Build: Production
 * Creates production ready files for distribution
 *
 */
gulp.task('default', ['clean_dist'], function() {

  return gulp.src('./src/parallax-element.js')
    .pipe( strip({
      safe: true
    }) )
    .pipe( whitespace() )
    .pipe( emptyLines() )
    .pipe(gulp.dest('dist'));
});

