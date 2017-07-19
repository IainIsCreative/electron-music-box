const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

/**
 *
 * Styles Task
 *
 * Take all the SCSS styles in the static directory, and run it through Sass.
 * Next, process it through CSSnano via PostCSS. Place into the `dist`
 * directory and notify that the styles have been processed.
 *
 */
gulp.task('styles', () => {
  gulp.src('./static/scss/*.scss')
    .pipe(sass({
      precision: 9,
    }))
    .pipe(postcss(cssnano))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Styles Completed!'));
});

/**
 *
 * Watch Task
 *
 * Watch the SCSS files for any changes, then run the styles task.
 *
 */
gulp.task('watch', () => {
  gulp.watch(['./static/scss/*.scss', './static/scss/**/*.scss'], ['styles']);
})

/**
 *
 * Default Gulp Task
 *
 * Run the Styles task first, then run the watcher.
 *
 */
gulp.task('default', ['styles', 'watch']);
