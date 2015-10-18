var gulp = require('gulp');
var browserify = require("browserify");
var babelify = require("babelify");
var watchify = require("watchify");
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');


gulp.task('watch', function() {
  var browserify_opts = watchify.args;
  browserify_opts.debug = true;
  var bundler = watchify(browserify(browserify_opts)).transform(babelify);
  bundler.on('update', rebundle);
  bundler.add('client/index.js');

  function rebundle() {
    bundler
      .bundle()
      .on("error", function (err) {
        console.log("Error : " + err.message);
      })
      .pipe(source('ranger.js'))
      .pipe(gulp.dest('public/build'))
      // .pipe(streamify(uglify()))
      // .pipe(rename({extname: '.min.js'}))
      // .pipe(gulp.dest('public/build'))
      .on('end', function() {
        console.log('finished bundle');
      })
  }
  return rebundle();
});

gulp.task('default',['watch']);
