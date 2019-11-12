//加载gulp模块
var gulp = require('gulp');
//加载browser-sync模块
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');         //压缩js代码
var minifyCSS = require('gulp-minify-css');  //压缩css代码
var htmlmin = require('gulp-htmlmin');  //压缩css代码



/**
 * 这里静态服务器 + 监听 scss/pug/js 文件
 */
gulp.task('server', function() {
    browserSync.init({
        server: './', //这里指的是根目录，如果你的index.html在根目录下，会直接打开index页面，不然会显示Get Not，自己写路径就行
        port: 8080 //默认打开localhost:3000,现在改成localhost:8081
    });

    gulp.watch('./assets/js/*.js').on('change', reload);
    gulp.watch('./assets/css/*.css').on('change', reload);
    gulp.watch('./view/*.html').on('change', reload);
    gulp.watch('./view/home/*.html').on('change', reload);
});
/**
 * 合并文件
 *  @view/index.html
 */
gulp.task('useref-index', function() {
    return gulp
        .src('view/index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
/**
 * 合并文件
 *  @view/home/home.html
 */
gulp.task('useref-home', function() {
    return gulp
        .src('view/home/home.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
/**
 * 合并文件
 *  @view/example/example.html
 */
gulp.task('useref-example', function() {
    return gulp
        .src('view/example/example.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
/**
 * 合并文件
 *  @view/Incubator/Incubator.html
 */
gulp.task('useref-Incubator', function() {
    return gulp
        .src('view/Incubator/Incubator.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
/**
 * 合并文件
 *  @view/formmode/formmode.html
 */
gulp.task('useref-formmode', function() {
    return gulp
        .src('view/formmode/formmode.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
/**
 * 合并文件
 *  @view/aboutUs/aboutUs.html
 */
gulp.task('useref-aboutUs', function() {
    return gulp
        .src('view/aboutUs/aboutUs.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
/**
 * 合并文件
 *  @view/details/details.html
 */
gulp.task('useref-details', function() {
    return gulp
        .src('view/details/details.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});


//只能压缩js代码
gulp.task('uglify', function(){
    return gulp.src('dist/*.html')
        .pipe(uglify()) // Uglifies Javascript files
        .pipe(gulp.dest('dist'))
});

//只能压缩css代码
gulp.task('minifyCSS', function(){
    return gulp.src('dist/css/*.css')
        .pipe(minifyCSS()) // Uglifies Javascript files
        .pipe(gulp.dest('dist/css'))
});

//只能压缩html代码  并且可以压缩html中的script和style代码
gulp.task('htmlmin', function(){
    var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    gulp.src('dist/*.html')
        .pipe(htmlmin(options)) // Uglifies Javascript files
        .pipe(gulp.dest('dist'))
});





gulp.task('default', ['server']);
gulp.task('build', [
    'useref-index',
    'useref-home',
    'useref-example',
    'useref-Incubator',
    'useref-formmode',
    'useref-aboutUs',
    'useref-details',
    'htmlmin',
    'minifyCSS']);