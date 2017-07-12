const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const uncss = require('gulp-uncss');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

gulp.task('styles', () => {
  gulp.src('./static/scss/*.scss')
    .pipe(sass({
      precision: 9,
    }))
    .pipe(postcss(cssnano))
    // .pipe(uncss({
    //   html: './index.html',
    // }))
    .pipe(gulp.dest('./dist'))
    .pipe(notify('Styles Completed!'));
});

gulp.task('watch', () => {
  gulp.watch(['./static/scss/*.scss', './static/scss/**/*.scss'], ['styles']);
})

gulp.task('default', ['styles', 'watch']);
