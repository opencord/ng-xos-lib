
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

const gulp = require('gulp');
const gulpDocs = require('gulp-ngdocs');
const del = require('del');
const browserSync = require('browser-sync').create();

module.exports = function(options){

  gulp.task('cleanDocs', function(){
    return del([options.docs + '**/*']);
  });

  gulp.task('makeDocs', ['cleanDocs'], function(){

    const ngOptions = {
      scripts: [].concat([
        `./${options.ngXosVendor}ngXosVendor.min.js`,
        `./${options.ngXosVendor}ngXosHelpers.min.js`,
        '../bower_components/angular-mocks/angular-mocks.js'
      ]),
      styles: [
        `./${options.ngXosStyles}xosNgLib.css`,
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css',
      ],
      html5Mode: false,
      title: 'XOS Helpers documentation',
      startPage: '/ngXosLib',
    }

    return gulpDocs.sections({
      ngXosLib: {
        glob: [
          options.xosHelperSource + '*.js',
          options.xosHelperSource + 'services/helpers/**/*.js',
          options.xosHelperSource + 'services/*.js',
          options.xosHelperSource + 'ui_components/**/*.js'
        ],
        title: 'Module Documentation',
      },
      'rest-api': {
        glob: [
          options.xosHelperSource + 'services/rest/*.js'
        ],
        api: true,
        title: 'API Documentation',
      }
    }).pipe(gulpDocs.process(ngOptions)).pipe(gulp.dest('./docs'));
  });

  gulp.task('serveDocs', function(){
    browserSync.init({
      server: {
        baseDir: './docs',
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    });
  });

  gulp.task('docs', ['makeDocs', 'serveDocs'], function(){
    
    const files = [
      options.xosHelperSource + '**/*.js',
    ];

    gulp.watch(files, ['makeDocs']);

    // uncomment to enable autoreload, now it is broken (reload a wrong page)
    // https://github.com/nikhilmodak/gulp-ngdocs/issues/81

    // gulp.watch(files, function(){
    //   browserSync.reload();
    // });
  });
};