var gulp = require('gulp');
var lecss = require('gulp-less');//引入编译模块
var minify=require('gulp-minify-css');//引入压缩css的模块
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');//引入js压缩模块
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin'), // 图片压缩
  	pngquant = require('imagemin-pngquant'); // 深度压缩
var webserver = require('gulp-webserver');
var babel = require('gulp-babel');

gulp.task('lessc',function(){
    //指明要编译的文件
    gulp.src('src/less/**/*.less')
    //进行编译
    .pipe(lecss())
    .pipe(autoprefixer())
    //将编译后的文件输出到css文件夹下
    .pipe(minify())
    .pipe(gulp.dest('dist/css'));
})

//创建一个压缩js的任务
gulp.task('minifyjs',function(){
    //指定当前文件夹下的所有JS文件
    gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    //进行重命名 可以设置名字为类似(mini.min.js)
    .pipe(rename({suffix:'.min'}))
    //进行压缩
//  .pipe(uglify())
    //将压缩后的文件输出到minijs文件夹下
    .pipe(gulp.dest('dist/js'))
})

gulp.task('html', function() {
  return gulp.src('src/**/*.html','/*.html') // 指明源文件路径、并进行文件匹配
    .pipe(gulp.dest('dist')); // 输出路径
});
// 注册任务
gulp.task('webserver', function() {
  gulp.src( '.' ) // 服务器目录（.代表根目录）
  .pipe(webserver({ // 运行gulp-webserver
  	port: 8001,
    livereload: true, // 启用LiveReload
    open: true // 服务器启动时自动打开网页
  }));
});

gulp.task('images', function(){
  return gulp.src('src/images/**/*.{png,jpg,gif,svg}') // 指明源文件路径、并进行文件匹配
    .pipe(imagemin({
      progressive: true, // 无损压缩JPG图片
      svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
      use: [pngquant()] // 使用pngquant插件进行深度压缩
    }))
    .pipe(gulp.dest('dist/images')); // 输出路径
});

// 监听任务
gulp.task('watch',function(){
  // 监听 html
gulp.watch(['src/**/*.html','/*.html'], ['html'])
  // 监听 scss
  gulp.watch('src/less/**/*.less', ['lessc']);
  // 监听 images
  gulp.watch('src/images/**/*.{png,jpg,gif,svg}', ['images']);
  // 监听 js
  gulp.watch('src/js/**/*.js', ['minifyjs']);
});
 
// 默认任务
gulp.task('default',['webserver','watch']);