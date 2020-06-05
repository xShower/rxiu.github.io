var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

// 压缩html
gulp.task('minify-html', function () {
	return gulp.src('./public/**/*.html')
		.pipe(htmlclean())
		.pipe(htmlmin({
			removeComments: true,
			minifyJS: true,
			minifyCSS: true,
			minifyURLs: true}))
		.pipe(gulp.dest('./public'))
});

// 压缩css
gulp.task('minify-css', function () {
	return gulp.src('./public/**/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('./public'));
});

// 压缩js 不压缩min.js
gulp.task('minify-js', function () {
	return gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('./public'));
});

// 压缩图片
gulp.task('minify-images', function() {
    return gulp.src('./public/images/**/*.*')
        .pipe(imagemin(
        [imagemin.gifsicle({'optimizationLevel': 3}), 
        imagemin.mozjpeg({'progressive': true}), 
        imagemin.optipng({'optimizationLevel': 7}), 
        imagemin.svgo()],
        {'verbose': true}))
        .pipe(gulp.dest('./public/images'))
});
// 默认任务
gulp.task('default',gulp.series(gulp.parallel('minify-html','minify-css','minify-js','minify-images')));