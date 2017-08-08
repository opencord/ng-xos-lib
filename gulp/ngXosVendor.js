
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
  const wiredep = require('wiredep');
  const del = require('del');

  module.exports = function(options){

    gulp.task('cleanVendor', function(){
      return del(
        [
          `${options.ngXosVendor}/ngXosVendor.min.js`
        ],
        {force: true}
      );
    });

    gulp.task('vendor', ['cleanVendor'], function(){
      const bowerDeps = wiredep().js;
      return gulp.src(bowerDeps)
        .pipe(concat('ngXosVendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(options.ngXosVendor));
    });
  };
})();