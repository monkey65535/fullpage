var gulp = require('gulp'),
    rubySass = require('gulp-ruby-sass');

gulp.task('sass',function () {
    return rubySass('src/sass/*.scss')
        .on('error',rubySass.logError)
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch',function () {
    gulp.run('sass');
    gulp.watch('src/sass/*.scss',function () {
        gulp.run('sass');
    })
});


gulp.task('default',function () {
    console.log("ok");
    /*gulp.run('sass');
    //实时监听
    gulp.watch('src/sass/!*.scss',function () {
        gulp.run('sass');
    });*/
});