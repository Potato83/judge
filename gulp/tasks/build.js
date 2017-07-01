var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
	browserSync.init({

		notify: false,
		server: {
			baseDir: "dist"
		}
	});
});

gulp.task('deleteDistFolder', function(){
	return del('./dist');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function(){
	var pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/img/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	]
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./dist'));
});

gulp.task('fontawesomeCopy', ['copyGeneralFiles'], function(){
	return gulp.src('./app/temp/styles/fonts/*')
		.pipe(gulp.dest('./dist/assets/styles/fonts'));
});

gulp.task('optimizeImages', ['deleteDistFolder', 'styles', 'scripts'], function(){
	return gulp.src('./app/assets/img/**/*')
		// .pipe(imagemin({
		// 	progressive: true,
		// 	interlaced: true,
		// 	multipass: true
		// }))    //something wrong with imagemin - throws error
		.pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function(){
	gulp.start('usemin');
});

gulp.task('usemin', function(){
	return gulp.src('./app/index.html')
		.pipe(usemin({
			css: [function(){return rev()}, function(){return cssnano()}],
			js: [function(){return rev()}, function(){return uglify()}]
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'fontawesomeCopy', 'optimizeImages', 'useminTrigger']);

