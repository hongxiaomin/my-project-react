require('babel-core/register');

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const babel = require('gulp-babel');

const fix = false;

function isFixed(file) {
  return file.eslint !== null && file.eslint.fixed;
}

gulp.task('eslint', () =>
  gulp.src([
    'index.js',
    'src/*.js',
    'src/**/*.js',
    'src/**/**/*.js',
  ])
  .pipe(eslint({ fix }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(gulpIf(isFixed, gulp.dest('src')))
);

gulp.task('transpile', () =>
  gulp.src([
    './src/*.js',
    './src/**/*.js',
    './src/**/**/*.js',
  ]).pipe(babel({
    presets: ['es2015', 'react', 'stage-0'],
  })).pipe(gulp.dest('./lib'))
);
