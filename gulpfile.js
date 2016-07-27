var gulp 				= require('gulp'),
		sass 				= require('gulp-sass'),
		browserSync = require('browser-sync'),
		reload      = browserSync.reload,
		useref      = require('gulp-useref'),
		gulpif			= require('gulp-if'),
		uglify      = require('gulp-uglify'),
		minifyCss   = require('gulp-minify-css'),
		rename      = require('gulp-rename');

var path = {
  src: {
  	html: 'app/*.html',
  	js: 'app/js/*.js',
    style: 'app/sass/module/*.scss',
    img: 'app/images/**/*.*',
    fonts: 'app/fonts/**/*.*'    
  },
  dist : {
    html: 'dist',
  	js: 'dist/js',
    style: 'dist/css',
    img: 'dist/images/',
    fonts: 'dist/fonts/'
  },
  watch: {
    html: 'app/**/*.html',
    js: 'app/js/**/*.js',
    style: 'app/sass/**/*.scss',
    img: 'app/images/**/*.*',
    fonts: 'app/fonts/**/*.*'     
  },
  clean: './build'
};

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

//====================================WATCH
gulp.task('watch', ['browser-sync','sass'], function(){
	gulp.watch(['app/scss/modules/*.scss', 'app/scss/assets/_*.scss' ],['sass']);
	gulp.watch(['app/*.html','app/layouts/*.html'],reload);
	gulp.watch('app/js/**/*.js', );
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
    return gulp.src('dist/js/*.js')
    		.pipe(uglify())
    		.pipe(rename(function(path){
        	path.dirname += "/js";
			    path.basename += "";
			    path.extname = ".min.js"
        }))
        .pipe(gulp.dest('dist'));
});
gulp.task('styles:build', function () {
    return gulp.src('dist/css/*.css')
        .pipe(minifyCss())
        .pipe(rename(function(path){
        	path.dirname += "/css";
			    path.basename += "";
			    path.extname = ".min.css"
        }))
        .pipe(gulp.dest('dist'));
});
//====================================BUILD_END