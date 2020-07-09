//Подключаем модули галпа
const gulp = require('gulp');
const browserSync = require('browser-sync').create()
const del = require('del');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');


gulp.task('scss', function (done) {
    gulp.src('./src/scss/saruma.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
    done();
});



gulp.task('clear', function (done) {
    del(['build/*']);
    done();
});


gulp.task('watch', function (done) {
    browserSync.init({
        server: "./",
        port: 3000
    });
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch("./*.html").on('change', browserSync.reload);
});



gulp.task('build', gulp.series('clear', 'scss'));
gulp.task('dev', gulp.series('build','watch'));