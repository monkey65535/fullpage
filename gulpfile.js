var gulp = require('gulp');
var sass = require('gulp-sass');


//sass编译
gulp.task('sass',function () {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'));
});


gulp.task('default',function () {
    console.log("ok");
    gulp.run('sass');
    //实时监听
    gulp.watch('src/sass/*.scss',function () {
        gulp.run('sass');
    });
});