var gulp = require('gulp'),
    rubySass = require('gulp-ruby-sass');

//编译sass
gulp.task('sass',function () {
    return rubySass('src/sass/*.scss')
        .on('error',rubySass.logError)
        .pipe(gulp.dest('src/css'));
});
//监控sass
gulp.task('watch',function () {
    gulp.run('sass');
    gulp.watch('src/sass/*.scss',function () {
        gulp.run('sass');
    })
});
//defaylt
gulp.task('default',function () {
    //gulp.run('watch');
});