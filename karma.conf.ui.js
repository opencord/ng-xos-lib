
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

  // Karma configuration
  // Generated on Tue Oct 06 2015 09:27:10 GMT+0000 (UTC)

  const babelPreset = require('babel-preset-es2015');

  /*eslint-disable*/

  var files = [
    'node_modules/babel-polyfill/dist/polyfill.js',


    // loading jquery (it's used in tests)
    `./bower_components/jquery/dist/jquery.js`,
    `./bower_components/jasmine-jquery/lib/jasmine-jquery.js`,

    // loading helpers and vendors
    `./dist/ngXosVendor.min.js`,
    `./dist/xosUiComponents.js`,

    // loading ngMock
    `./bower_components/angular-mocks/angular-mocks.js`,
  ]
  .concat([
    // loading tests
    `spec/test_helpers.js`,
    `spec/ui/xos.helpers.mock.js`,
    'spec/ui/**/*.test.js'
  ]);

  module.exports = function(config) {
  /*eslint-enable*/
    config.set({

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',


      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],


      // list of files / patterns to load in the browser
      files: files,


      // list of files to exclude
      exclude: [
      ],


      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        './spec/ui/**/*.test.js': ['babel'],
        './spec/test_helpers.js': ['babel'],
        './spec/ui/xos.helpers.mock.js': ['babel']
      },

      babelPreprocessor: {
        options: {
          presets: [babelPreset],
          sourceMap: 'inline'
        }
      },

      //ngHtml2JsPreprocessor: {
      //  stripPrefix: 'src/', //strip the src path from template url (http://stackoverflow.com/questions/22869668/karma-unexpected-request-when-testing-angular-directive-even-with-ng-html2js)
      //  moduleName: 'templates' // define the template module name
      //},

      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['dots'],

      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: false,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: [
        'PhantomJS',
        // 'Chrome'
      ],


      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true
    });
  };

})();