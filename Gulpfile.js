var gulp          = require('gulp');
var sass          = require('gulp-sass');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var minifyify     = require('minifyify');
var babelify      = require('babelify');
var IS_PRODUCTION = process.env.NODE_ENV === 'production';

var paths = {
  main_css : [ 'scss/master.scss', 'scss/base-product-list.scss' ],
  css      : [ 'scss/**/*.scss', 'scss/*.scss', 'scss/**/**/*.scss' ],
  main_js  : [ 'public/javascripts/modules/base.js' ],
  js       : [ 'public/javascripts/**/*.js*' ],
};

gulp.task('css', function() {
  return gulp.src(paths.main_css)
              .pipe(
                sass({
                  outputStyle: IS_PRODUCTION ? 'compressed' : 'nested'
                }).on('error', sass.logError)
              )
              .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('js', function() {
  var bundler = browserify(paths.main_js)
                .transform('babelify', {
                  presets : [ 'es2015', 'react' ]
                });

  if (IS_PRODUCTION) {
    bundler = bundler.plugin('minifyify', {
      map      : false,
      compress : {
        drop_debugger : true,
        drop_console  : true
      }
    })
  }

  bundler.bundle().on('error', function(err) {
    console.error('[browserify error]', err.message);
  }).pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/javascripts/'));
});

gulp.task('serve', [ 'css', 'js' ], function () {
  // Generic watch tasks for SASS and Browserify
  gulp.watch(paths.css, [ 'scss' ]);
  gulp.watch(paths.js,  [ 'js' ]);

});

gulp.task('default', [ 'css', 'js' ]);