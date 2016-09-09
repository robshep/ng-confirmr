var gulp = require('gulp');

var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
 
 
gulp.task('tplcache', function () {
  return gulp.src('src/confirmr.modal.html')
    .pipe(templateCache({module:'ng-confirmr', filename:'confirmr.tpl.js'}))
    .pipe(gulp.dest('dist'));
});


gulp.task('default', ['tplcache'], function() {
  return gulp.src(['src/confirmr.ng.js', 'dist/confirmr.tpl.js'])
    .pipe(concat('confirmr-all.js'))
    .pipe(gulp.dest('dist'));
});
