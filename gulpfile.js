'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require("gulp-cssnano");
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var inlineSvg = require('postcss-inline-svg');

var vendorLibJs = [
  'node_modules/angular/angular.min.js',
  'node_modules/angular-ui-router/release/angular-ui-router.min.js', // official library
  'node_modules/angular-resource/angular-resource.min.js', // official library
  'node_modules/angular-ui-tree/dist/angular-ui-tree.js', // third-party library
  'public/libs/ng-scrollable/min/ng-scrollable.min.js', // third-party library
  'node_modules/angular-elastic/elastic.js' // third-party library
];

var vendorLibCss = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/angular-ui-tree/dist/angular-ui-tree.min.css',
  'public/libs/ng-scrollable/min/ng-scrollable.min.css'
];

var processors = [
  autoprefixer,
  inlineSvg
];

gulp.task('js', function() {
  return gulp.src(['./public/scripts/**/*.js', '!./public/scripts/**/*.spec.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task("css", function() {
  return gulp.src('./public/scripts/**/*.css')
    .pipe(postcss(processors))
    .pipe(sourcemaps.init())
    .pipe(cssnano({safe: true}))
    .pipe(concat('style.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/dist"))
    .pipe(livereload());
});

gulp.task('vendor-js', function() {
  return gulp.src(vendorLibJs)
    .pipe(concat('vendor.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('vendor-css', function() {
  return gulp.src(vendorLibCss)
    .pipe(concat('vendor.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task("watch", function() {
  livereload.listen();
  gulp.watch('./public/scripts/**/*.css', ['css']);
  gulp.watch('./public/scripts/**/*.js', ['js']);
});

gulp.task("default", ["watch"]);



