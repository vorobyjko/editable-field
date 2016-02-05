/**
 * Created by kostiantyn.bogapov on 12/14/2015.
 */

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var watch = require('gulp-watch');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('webserver', function() {
    return gulp.src('dist')
        .pipe(webserver({
            host: '0.0.0.0',
            port: '8080',
            livereload: true,
        }));
});

gulp.task('html', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'))
})

gulp.task('css', function() {
  gulp.src('src/css/style.css')
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('watch', function() {
    gulp.watch(['src/js/*.js', 'src/*.html', 'src/css/*.css'], ['html','js', 'css'])
});

gulp.task('js', function() {
    return browserify('./src/js/main.js') 
               .bundle()
               .pipe(source('main.js'))
               .pipe(gulp.dest('./dist/js'))
        });


gulp.task('default', ['html', 'css', 'js', 'watch', 'webserver']);