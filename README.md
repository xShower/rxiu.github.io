# rxiu
butterfly主题配置文档：
https://docs.jerryc.me/#/zh-cn/config/quick-start

使用gitee和hexo-butterfly建立自己的博客：
http://www.mamicode.com/info-detail-2736648.html

Hexo博客之速度优化（博客是基于gulp3的，不太适用。）
https://www.jianshu.com/p/93b63852f0b3

### 环境
Win 10
git软件
node: v14.4.0
Hexo: 4.2.1
gulp: 4.0.2 

### 模块安装
```
npm install -g hexo
npm install hexo-renderer-pug hexo-renderer-stylus --save
```


### 创建项目
新建**空目录** , 如: rxiu

##### 初始化Hexo项目
进入rxiu目录（必须是空目录）
```
hexo init
rm -rf themes/landscape
```

##### 建立远程仓库
github上建立项目。然后进入rxiu目录
```
git init
git commit -m "first commit"
git remote add origin git@github.com:rxiu/rxiu.git
git push -u origin master
```
##### 主题安装
```
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/Butterfly
```
##### 配置修改
修改根目录下的_config.yml
```
title: 自己的站点标题

theme: Butterfly
```
##### 平滑升级
为了主题的平滑升级, Butterfly 使用了 data files特性。

推荐把Butterfly目录下的配置文件_config.yml复制到 Hexo 工作目录下的source/_data/butterfly.yml，如果source/_data的目录不存在那就创建一个。

##### 启动
```
hexo clean && hexo g && hexo s
```
浏览器访问http://localhost:4000


### Hexo博客之速度优化

##### 模块安装
```
# 压缩用，非必须
npm install gulp --save-dev
npm install gulp-htmlclean gulp-htmlmin gulp-minify-css gulp-uglify gulp-imagemin --save-dev
npm install gulp-babel@7 --save-dev
npm install babel-core --save-dev
npm install babel-preset-es2015 --save-dev
```

##### 代码
创建gulpfile.js
```
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
```
创建.babelrc
```
{
    "presets": ['es2015']
}
```

##### 启动
```
hexo clean && hexo g && gulp && hexo s
```