var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    cssComb        = require('gulp-csscomb'),
    browserSync    = require('browser-sync'),
    reload         = browserSync.reload,
    useref         = require('gulp-useref'),
    gulpif         = require('gulp-if'),
    uglify         = require('gulp-uglify'),
    minifyCss      = require('gulp-minify-css'),
    rename         = require('gulp-rename'),
    rigger         = require('gulp-rigger'),
    prettify       = require('gulp-html-prettify'),
    autoprefixer   = require('gulp-autoprefixer'),
    sourcemaps     = require('gulp-sourcemaps'),
    imageMin       = require('gulp-imagemin'),
    wiredep        = require('wiredep').stream,
    jsValidate     = require('gulp-jsvalidate'),
    notify         = require('gulp-notify'),
    plumber        = require('gulp-plumber');

//====================================HTML_TASK
  gulp.task('rigger', function () {
    gulp.src('app/pages/*.html')
      .pipe(rigger())
      .pipe(gulp.dest('app/'));
  });
  
  gulp.task('bower', function () {
    gulp.src('app/modules/*.html')
      .pipe(wiredep({
        'ignorePath': '../',
        directory : "app/libs",
        packages:
          {
            js: [ 'libs/' ],
            css: [ 'libs/' ]
          }
      }))
      .pipe(gulp.dest('app/modules/'))
      .pipe(reload({stream:true}));
  });
//====================================HTML_TASK_END

//====================================COMPILE_SASS_FILES
gulp.task('sass', function(){
  return gulp.src(['app/scss/modules/*.scss', 'app/scss/assets/_*.scss' ])
     .pipe(sourcemaps.init())
     .pipe(sass())
     .on('error', notify.onError(function(err){
        return {
          title: 'Styles',
          message: err.message
        };
       }))
     .pipe(autoprefixer({
        browsers: ['last 150 versions','ie 8'],
        cascade: false
      }))
     .pipe(cssComb())
     .pipe(sourcemaps.write())
     .pipe(gulp.dest('app/css'))
     .pipe(reload({stream:true}));
});
//====================================COMPILE_SASS_FILES_END

//====================================COMPILE_JAVASCRIPT_FILES
  gulp.task('scripts', function () {
    gulp.src('app/js/*.js')
        .pipe(plumber({
          errorHendler: notify.onError(function(err){
            return {
              title: 'JavaScript',
              message: err.message
            };
           })
        }))
        .pipe(jsValidate())
        .on('error', notify.onError())
        .pipe(reload({stream:true}));
  });
//====================================COMPILE_JAVASCRIPT_FILES_END

//====================================BROWSER_SYNC
gulp.task('browser-sync', function(dir){
  browserSync({
    port: 9990,
    server: {
      baseDir: './app'
      // startPath: '/'
    },
    notify: false
  });
});
//====================================BROWSER_SYNC_END

//====================================WATCH
  gulp.task('default', ['rigger','sass'], function(){
    gulp.watch(['app/scss/modules/*.scss', 'app/scss/assets/_*.scss' ],['sass']);
    gulp.watch(['app/pages/*.html','app/modules/*.html'],['rigger']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch(['app/js/**/*.js'],['scripts']);
    gulp.watch(['bower.json'],['bower']);
    gulp.start('browser-sync');
  });
//====================================WATCH_END

//====================================BUILD_END
  gulp.task('html:build',['useref'], function () {
      return gulp.src('dist/*.html')
          .pipe(prettify({indent_size: 2}))
          .pipe(gulp.dest('dist'));
  });
  gulp.task('useref', function () {
      return gulp.src('app/*.html')
          .pipe(useref())
          .pipe(gulp.dest('dist'));
  });
  gulp.task('scripts:build', function () {
      return gulp.src(['dist/js/*.js','!dist/js/*.min.js'])
          .pipe(uglify())
          .pipe(rename(function(path){
            path.dirname += "/js";
            path.extname = ".min.js"
          }))
          .pipe(gulp.dest('dist'));
  });
  gulp.task('styles:build', function () {
      return gulp.src(['dist/css/*.css','!dist/css/*.min.css'])
          .pipe(minifyCss())
          .pipe(rename(function(path){
            path.dirname += "/css";
            path.extname = ".min.css"
          }))
          .pipe(gulp.dest('dist'));
  });
  gulp.task('imageMin:build', function(){
    gulp.src('app/images/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images'))
  });
  gulp.task('fonts:build', function(){
    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
  });
  gulp.task('build',['html:build'], function(){ //==============BILD_ALL_PROJECT
    gulp.start('fonts:build');
    gulp.start('scripts:build');
    gulp.start('styles:build');
    gulp.start('imageMin:build');
  });
//====================================BUILD_END