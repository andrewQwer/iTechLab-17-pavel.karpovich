'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('1. HTML-CSS/1.2 Flex-box/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('1. HTML-CSS/1.2 Flex-box/styles'));
});