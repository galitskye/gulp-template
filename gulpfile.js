var gulp 				= require('gulp'),
		sass 				= require('gulp-sass'),
		browserSync = require('browser-sync'),
		useref      = require('gulp-useref'),
		gulpif			= require('gulp-if'),
		uglify      = require('gulp-uglify'),
		minifyCss   = require('gulp-minify-css'),
		rename      = require('gulp-rename');



//====================================COMPILE_SASS_FILES
gulp.task('sass', function(){
	return gulp.src(['app/scss/modules/*.scss', 'app/scss/assets/_*.scss' ])
		  	 .pipe(sass())
		  	 .pipe(gulp.dest('app/css'))
		  	 .pipe(browserSync.reload({stream:true}))
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
	gulp.watch(['app/*.html','app/layouts/*.html'],browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
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
gulp.task('userefConcat', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        // .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});
gulp.task('scripts', function () {
    return gulp.src('dist/main.html')
        .pipe(useref())
        // .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
    return gulp.src('dist/main.html')
        .pipe(useref())
        // .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});
//====================================BUILD_END
