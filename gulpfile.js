var gulp = require('gulp');
var connect = require('gulp-connect');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var prettify = require('gulp-jsbeautifier');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var htmlhint = require("gulp-htmlhint");

gulp.sources = {
  src:  './src',
  dist: './html'
};

// Start server dev
gulp.task('connect:dev', () => {
  connect.server({
    root: [gulp.sources.src, '.tmp', './'],
    livereload: true,
    port: 9000,
    host: '0.0.0.0',
    fallback: gulp.sources.src + '/index.html'
  });
});

// Start server product
gulp.task('connect:prod', () => {
  connect.server({
    root: [gulp.sources.dist],
    livereload: true,
    port: 9090,
    host: '0.0.0.0',
    fallback: gulp.sources.dist + '/index.html'
  });
});

// Watch
gulp.task('stream', () => {
  gulp.watch(gulp.sources.src + '/views/**/*.html', ['fileinclude']);
  gulp.watch(gulp.sources.src + '/styles/**/*.scss', ['sass']);
  gulp.watch(gulp.sources.src + '/scripts/**/*.js', ['script']);
  watch('**/*.css').pipe(connect.reload());
});

// Include HTML
gulp.task('fileinclude', () => {
  return gulp.src([gulp.sources.src + '/views/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(gulp.sources.src))
    .pipe(connect.reload());
});

// Minify CSS, JS
gulp.task('minify', () => {
  return gulp.src(gulp.sources.src + '/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify({
      compress: false
    })))
    .pipe(gulpif('*.css', cleanCSS({
      specialComments : 0
    })))
    .pipe(gulp.dest(gulp.sources.dist));
});

// Sass
gulp.task('sass', ['htmlhint'], () => {
  return gulp.src(gulp.sources.src + '/styles/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(connect.reload());
});

// Javascript
gulp.task('script', () => {
  return gulp.src(gulp.sources.src + '/scripts/**/*.js')
    .pipe(connect.reload());
});

// Minify images
gulp.task('imagemin', () => {
  return gulp.src(gulp.sources.src + '/images/**/*')
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true,
      verbose: true
    }))
    .pipe(gulp.dest(gulp.sources.dist + '/images'))
});

// Copy fonts
gulp.task('htmlhint', ['fileinclude'], () => {
  return gulp.src(gulp.sources.src + '/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter())
});

// Copy fonts
gulp.task('copy:fonts', () => {
  return gulp.src(gulp.sources.src + '/fonts/**/*')
    .pipe(gulp.dest(gulp.sources.dist + '/fonts'))
});

// HTML beautify
gulp.task('prettify', ['copy:fonts'], () => {
  return gulp.src([gulp.sources.dist + '/*.html'])
    .pipe(prettify({
      indent_char: ' ',
      indent_size: 2
    }))
    .pipe(gulp.dest(gulp.sources.dist));
});

gulp.task('revision', function () {
  return gulp.src([gulp.sources.dist + '/styles/*.css', gulp.sources.dist + '/scripts/*.js'], {base: gulp.sources.dist})
    .pipe(rev())
    .pipe(gulp.dest(gulp.sources.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('revreplace', ['revision'], function() {
  var manifest = gulp.src('.tmp/rev-manifest.json');

  return gulp.src(gulp.sources.dist + '/*.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(gulp.sources.dist));
});

// Remove dist, tmp
gulp.task('clean', () => {
  return del(['.tmp', gulp.sources.dist])
});

// Remove files
gulp.task('cleanFiles', ['revreplace'], () => {
  return del([
    gulp.sources.dist + '/styles/style.min.css',
    gulp.sources.dist + '/styles/vendor.min.css',
    gulp.sources.dist + '/scripts/script.min.js',
    gulp.sources.dist + '/scripts/vendor.min.js'
  ]);
});

// Build source
gulp.task('build', () => {
  runSequence('clean', 'fileinclude', 'htmlhint', 'sass', 'minify', 'imagemin', 'copy:fonts', 'prettify', 'cleanFiles', (e) => {
    if (!e) {
      console.log('Success!');
    }
  });
});

// Start development server
gulp.task('run:dev', () => {
  runSequence('connect:dev', 'fileinclude', 'sass', 'stream', () => {
    console.log('Development version is running...');
  });
});

// Start product server
gulp.task('run:prod', () => {
  runSequence('build', 'connect:prod', () => {
    console.log('Production version is running...');
  });
});