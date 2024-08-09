const gulp = require('gulp'), 
    minifyCSS = require('gulp-clean-css'),
        rename = require('gulp-rename'),
            sass = require('gulp-sass')(require('sass')),
                minifyJS = require('gulp-minify'),
                    browserSync = require('browser-sync').create(); // подключение к gulp

gulp.task('minCSS', async () => {
    gulp.src('app/css/*.scss') // Выборка нужного файла
        .pipe(sass())
        .pipe(minifyCSS()) // Минификация файла
        .pipe(rename({
            suffix: '.min'
        })) // Переименовывание файла(добавление к изменённому файлу суффика min)
        .pipe(gulp.dest('public/css')) // Перемещение файла в другую папку
        .pipe(browserSync.stream()); // Функция, позволяющая передать данные в BrowserSync
});

gulp.task('minJS', async () => {
    gulp.src('app/js/*.js') // Выборка нужного файла
        .pipe(minifyJS()) // Минификация файла
        .pipe(gulp.dest('public/js')) // Перемещение файла в другую папку
        .pipe(browserSync.stream()); // Функция, позволяющая передать данные в BrowserSync
});

gulp.task('watchAll', () => {
    gulp.watch("app/css/*.scss", gulp.series('minCSS'));
    gulp.watch("app/js/*.js", gulp.series('minJS'));
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: "public/"
        }
    });

    gulp.watch("public/*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('browserSync', 'watchAll'));
