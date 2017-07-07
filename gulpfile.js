var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('1. HTML-CSS/1.3. Responsive/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('1. HTML-CSS/1.3. Responsive/styles'));
});