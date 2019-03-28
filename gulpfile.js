var gulp = require('gulp'),
  mocha = require('gulp-mocha');

gulp
  .task('mocha', async () => 
    gulp.src([
      'tests/routes/*.js',
    ])
    .pipe(mocha({
      exit: true,
      require: [
        './tests/helpers'
      ]
    }))
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    })
  );