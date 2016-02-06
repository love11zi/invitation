/****** gulp依赖模块加载开始 ******/

  var gulp = require('gulp');

  //gulp-watch监视文件变化,gulpjs4.0版本前需配合gulp-plumber使用
  var watch = require('gulp-watch');
  var plumber = require('gulp-plumber');

  /** 自带livereload的本地server **/
  var connect = require('gulp-connect');

  /** 中间件，路由代理，主要用来做mock切换，如将/api的请求代理到m-p环境上去 **/
  var fs = require('fs');
  var path = require('path');
  var url = require('url');
  var proxy = require('proxy-middleware');

  /** sass编译 **/
  var sass = require('gulp-sass');

  /** css后处理器 **/
  var autoprefixer = require('gulp-autoprefixer');

  /** js语法检测 **/
  var jshint = require('gulp-jshint');

  /** 重命名 **/
  var rename = require('gulp-rename');

  /** js文件压缩 **/
  var uglify = require('gulp-uglify');

  /** git管理 **/
  var git = require('gulp-git');

/****** gulp依赖模块加载结束 ******/



/****** 开发目录路径定义开始 ******/
  var devBasePath = 'src';
  var distBasePath = 'dist/';

  var scssPath = path.join(devBasePath, '/scss');
  var cssPath = path.join(devBasePath, '/css');
  var prototypePath = path.join(devBasePath, '/html');
  var jsPath = path.join(devBasePath, '/js');

/****** 开发目录路径定义结束 ******/



/****** gulp任务开始 ******/


  /************
   *小任务
   */

  //清除dist文件夹
  gulp.task('clean', function(cb) {
    del([path.join(distBasePath, '**/*')], cb);
  });

  //css后处理器
  gulp.task('prefixer', function () {
    return gulp.src(path.join(cssPath,'*.css'))
      .pipe(autoprefixer({
          browsers: ['> 1%'],
          cascade: false
      }))
      .pipe(gulp.dest(cssPath));
  });

  //jshint
  gulp.task('hint', function() {
    return gulp.src([path.join(jsPath ,'*.js'), '!' + path.join(jsPath ,'*.min.js')])
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  });


  /************
   *中任务
   */

  //本地server
  gulp.task('connect', function() {
    connect.server({
      root: devBasePath,
      port: 8000,
      livereload: true
    });
  });

  //CSS开发中编译
  gulp.task('styles', function() {
    gulp.src(path.join(scssPath,'*.scss'))
      .pipe(plumber())
      .pipe(sass({
        outputStyle: 'expanded'
      }))
      .pipe(gulp.dest(cssPath));
  });

  //CSS打包前编译,与style任务不同的是加入了autoprefixer
  gulp.task('stableStyles', function() {
    gulp.src(path.join(scssPath,'*.scss'))
      .pipe(plumber())
      .pipe(sass({
        outputStyle: 'expanded'
      }))
      .pipe(autoprefixer({
          browsers: ['> 1%'],
          cascade: false
      }))
      .pipe(gulp.dest(cssPath));
  });

  //监视文件变化
  gulp.task('watch', function() {
    gulp.watch(path.join(prototypePath,'*.html'), function(){
      gulp.src(path.join(prototypePath,'*.html')).pipe(connect.reload());
    });

    gulp.watch(path.join(cssPath,'*.css'), function(){
      gulp.src(path.join(cssPath,'*.css')) .pipe(connect.reload()); 
    });
    
    gulp.watch(path.join(scssPath,'*.scss'), ['styles']);
  });


  //JS压缩
  gulp.task('compress', function() {
    gulp.src([path.join(jsPath,'**/*.js'), '!' + path.join(jsPath,'**/*.min.js')])
      .pipe(rename(function (path) {
        path.basename += ".min";
      }))
      // 为压缩后的js中所有路径引用的js路径添加min,注意未压缩的路径中一定要以.js结尾
      .pipe(replace(/(["'][\.\s\w/-]*)(\.js)(\s*["'])/gmi, "$1.min$2$3")) 
      .pipe(uglify({mangle: {except: ['require']}}))
      .pipe(gulp.dest(jsPath));
  });


  /************
   *大任务
   */

  //开发环境
  gulp.task('default', ['connect', 'watch']);

  //发布环境
  gulp.task('stable', ['clean', 'stableStyles', 'hint', 'compress'], function(){
    gulp.src(path.join(devBasePath,'**/*'))
      .pipe(gulp.dest(distBasePath));
  });