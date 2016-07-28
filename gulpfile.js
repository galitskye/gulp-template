var gulp 				= require('gulp'),
		sass 				= require('gulp-sass'),
		browserSync = require('browser-sync'),
		reload      = browserSync.reload,
		useref      = require('gulp-useref'),
		gulpif			= require('gulp-if'),
		uglify      = require('gulp-uglify'),
		minifyCss   = require('gulp-minify-css'),
		rename      = require('gulp-rename'),
    rigger      = require('gulp-rigger');

//====================================COMPILE_SASS_FILES
gulp.task('sass', function(){
	return gulp.src(['app/scss/modules/*.scss', 'app/scss/assets/_*.scss' ])
		  	 .pipe(sass())
		  	 .pipe(gulp.dest('app/css'))
		  	 .pipe(reload({stream:true}))
});
//====================================COMPILE_SASS_FILES_END

//====================================BROWSER_SYNC
gulp.task('browser-sync', function(){
	browserSync({
		port: 9990,
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});
//====================================BROWSER_SYNC_END

//====================================HTML_TASK
  gulp.task('rigger', function () {
      gulp.src('app/modules/*.html')
          .pipe(rigger()) 
          .pipe(gulp.dest('app/'))
          .pipe(reload({stream: true})); 
  });
//====================================HTML_TASK_END

//====================================WATCH
  gulp.task('watch', ['rigger','sass','browser-sync'], function(){
  	gulp.watch(['app/scss/modules/*.scss', 'app/scss/assets/_*.scss' ],['sass', reload]);
  	gulp.watch(['app/*.html','app/layouts/*.html'],['rigger', reload]);
  	gulp.watch(['app/js/**/*.js'],[reload]);
  });
//====================================WATCH_END

//====================================DEFAULT_GULP_TASK
  gulp.task('default', function() {
  	return gulp.src('Where we take')
  				 .pipe(plugin())
  				 .pipe(gulp.dest('Where we brought'))
  });
//====================================DEFAULT_GULP_TASK_END

//====================================BUILD_END
  gulp.task('useref:build', function () {
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
  gulp.task('build',['useref:build'], function(){ //==============BILD_ALL_PROJECT
    gulp.start('scripts:build');
    gulp.start('styles:build');
  });
//====================================BUILD_END