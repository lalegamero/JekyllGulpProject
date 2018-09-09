'use strict';

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const cp          = require('child_process');
const sass = require('gulp-sass');
const postcss    = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
const htmlhint = require("gulp-htmlhint");
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Gulp as asset manager for jekyll. Please note that the assets folder is never cleaned
// so you might want to manually delete the _site/assets folder once in a while.
// this is because gulp will move files from the assets directory to _site/assets,
// but it will not remove them from _site/assets if you remove them from assets.

/**
 * Build the Jekyll Site - for Windows. If you are on a Mac/linux change jekyll.bat to just jekyll
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload when watched files change
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('serve', ['jekyll-build'], function() {
    browserSync.init({
        server: '_site/',
        notify: false,
        port: 4000
    });
});

/**
 * Watch jekyll source files for changes, don't watch assets
 */
gulp.task('watch', function () {
    gulp.watch(['**/*.*', '!_site/**/*','!_assets/**/*','!node_modules/**/*','!.sass-cache/**/*' ], ['jekyll-rebuild']);
});

//watch just the sass files - no need to rebuild jekyll
gulp.task('watch-sass', ['sass-rebuild'], function() {
     gulp.watch(['_assets/sass/**/*.+(scss|sass)'], ['sass-rebuild']);
});

// watch just the js files
gulp.task('watch-js', ['js-rebuild'], function() {
     gulp.watch(['_assets/js/**/*.js'], ['js-rebuild']);
});

// watch just the image files
gulp.task('watch-images', ['images-rebuild'], function() {
     gulp.watch(['_assets/images/**/*.*'], ['images-rebuild']);
});


//if sass files change just rebuild them with gulp-sass and what not
gulp.task('sass-rebuild', function() {
     var plugins = [
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];
     return gulp.src('_assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js-rebuild', function(cb) {
    return gulp.src('_assets/js/**/*.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('_site/assets/js/'))
      .pipe(rename('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('_site/assets/js/'))
      .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('images-rebuild', function(cb) {
     return gulp.src('_assets/images/**/*.*')
      .pipe( gulp.dest('_site/assets/img/') )
      .pipe(browserSync.reload({
      stream: true
    }))
});


/**
 * Default task, running just `gulp` will
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['serve', 'watch','watch-sass','watch-js','watch-images']);


// build and deploy stuff
gulp.task('imagemin', function() {
    console.log('Minimizing images in source!!');
 return gulp.src('_assets/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(function (file) {
        return file.base;
    }));
});

gulp.task('w3', function() {
gulp.src("_site/**/*.html")
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
})
// validate from the command line instead, works better
// npm install htmlhint -g
// htmlhint _site/**/*.html
