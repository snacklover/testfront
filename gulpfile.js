const gulp = require ('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');

const config = {
	root: './src',
	css: {
		src: '/precss/style.less',
		watch: '/precss/**/*.less',
		dest: '/css',
		html: '/*.html'
	}
};

gulp.task('preproc', function(){
	gulp.src(config.root + config.css.src)
		/*.pipe(sourcemaps.init())
		.pipe(sourcemaps.write({includeContent: false, sourceRoot: '.'}))
		.pipe(sourcemaps.init({LoadMaps: true}))
		.pipe(autoprefixer({
            browsers: ['>0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
        	level: 2
        }))*/
        .pipe(less())
        /*.pipe(sourcemaps.write('.'))*/
		.pipe(gulp.dest(config.root + config.css.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('watch',['preproc', 'browserSync'], function(){
	gulp.watch(config.root + config.css.watch, ['preproc']);

});

gulp.task('browserSync', function() {
     var files = [
    'src/**/*.html',
    'src/**/*.css',
    'src/**/*.less'
    
  ];
    browserSync.init(files, {
        server: {
            baseDir: "./src"
        }
    });
});

