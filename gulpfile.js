
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
  const wrench = require('wrench');
  const path = require('path');

  const options = {
    ngXosVendor: './dist/',
    ngXosStyles: './dist/',
    xosHelperSource: './src/',
    xosHelperTmp: './.tmp/',
    docs: './docs'
  };

  wrench.readdirSyncRecursive(path.join(__dirname, './gulp'))
  .map(function(file) {
    require(path.join(__dirname, './gulp/' + file))(options);
  });

  gulp.task('default', function () {
    gulp.start('build');
  });

  gulp.task('build', ['vendor', 'helpers', 'uiLibrary']);

})(); 