
/*
 * Copyright 2017-present Open Networking Foundation

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/*eslint-env node */

(function () {
  'use strict';

  const gulp = require('gulp');
  const uglify = require('gulp-uglify');
  const concat = require('gulp-concat');
  const ngAnnotate = require('gulp-ng-annotate');
  const angularFilesort = require('gulp-angular-filesort');
  const del = require('del');
  const babel = require('gulp-babel');
  const sourcemaps = require('gulp-sourcemaps');
  const rename = require('gulp-rename');
  const sass = require('gulp-sass');

  module.exports = function(options){

    // delete previous builded file
    gulp.task('cleanLib', function(){
      return del(
        [
          `${options.ngXosVendor}/ngXosHelpers.min.js`,
          `${options.ngXosVendor}/xosUiComponents.js`,
          `${options.ngXosVendor}/ngXos.css`
        ],
        {force: true}
      );
    });

    gulp.task('style', function(){
      return gulp.src(`${options.xosHelperSource}styles/main.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('xosNgLib.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(options.ngXosStyles));
    });

    // transpile js with sourceMaps
    gulp.task('babel', function(){
      return gulp.src(options.xosHelperSource + '**/*.js')
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest(options.xosHelperTmp));
    });

    // build
    gulp.task('helpers', ['cleanLib', 'babel', 'style'], function(){
      return gulp.src([options.xosHelperTmp + '**/*.js'])
        .pipe(angularFilesort())
        .pipe(concat('ngXosHelpers.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(options.ngXosVendor));
    });

    // build Dev (no minify, sourcemaps), for development purposes
    // gulp.task('helpersDev', ['babelDev'], function(){
    //   return gulp.src([options.xosHelperTmp + '**/*.js'])
    //     .pipe(angularFilesort())
    //     .pipe(concat('ngXosHelpers.js'))
    //     .pipe(ngAnnotate())
    //     .pipe(gulp.dest(options.ngXosVendor));
    // });

    // concat only UI Components (for free use)
    gulp.task('uiLibrary', function(){
      return gulp.src([
        options.xosHelperTmp + '**/*.js',
        !options.xosHelperTmp + 'services/rest/*.js'
      ])
        .pipe(angularFilesort())
        .pipe(concat('xosUiComponents.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(options.ngXosVendor));
    });

    gulp.task('dev', function(){
      gulp.watch(`${options.xosHelperSource}**/*.scss`, ['style']);
      gulp.watch(options.xosHelperSource + '**/*.js', ['helpersDev']);
    });
  };
})();