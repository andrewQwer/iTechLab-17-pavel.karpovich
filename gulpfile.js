var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass_task', function() {
    gulp.src('1. HTML-CSS/1.1. SASS/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('1. HTML-CSS/1.1. SASS/styles'));}
);

gulp.task('flex-box_task', function() {
    gulp.src('1. HTML-CSS/1.2. Flex-box/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('1. HTML-CSS/1.2. Flex-box/styles'));}
);

gulp.task('responsive_task', function() {
    gulp.src('1. HTML-CSS/1.3. Responsive/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('1. HTML-CSS/1.3. Responsive/styles'));}
);

gulp.task('bem_task', function() {
    gulp.src('1. HTML-CSS/1.4. BEM/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('1. HTML-CSS/1.4. BEM/styles'));}
);
