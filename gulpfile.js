//Подключаем модули галпа
const gulp = require('gulp');
const browserSync = require('browser-sync').create()
const del = require('del');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');


//Таск на стили CSS
function styles() {
    return gulp.src('./src/scss/saruma.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

//Удалить всё в указанной папке
function clean() {
    return del(['build/*'])
}

//Просматривать файлы
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //Следить за CSS файлами
    gulp.watch('./srs/scss/**/*.scss', styles)
    //При изменении HTML запустить синхронизацию
    gulp.watch("./*.html").on('change', browserSync.reload);
}
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, styles));
gulp.task('dev', gulp.series('build','watch'));