
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


/**
 * © OpenCORD
 *
 * Created by teone on 4/18/16.
 */
/* eslint-disable angular/ng_window_service*/

// TODO write tests for log
// NODE Actually the code is working, the tests are not.

(function () {
  'use strict';

  xdescribe('The xos.helper module', function(){

    let log, window;

    let mockLog;

    beforeEach(function() {
      mockLog = jasmine.createSpyObj('logMock', ['info']);
    });

    beforeEach(function() {
      angular.mock.module('xos.helpers', function($injector, $provide) {
        // console.log('$injector',$injector.get('logDecorator'));
        $provide.value('$log', mockLog);
        // $provide.decorator('$log', $injector.get('logDecorator'));
      });
    });

    beforeEach(inject(($log, $window) => {
      log = $log;
      window = $window;
      // log.reset();
    }));

    describe('The log decorator', () => {
      it('should not print anything', inject(($log) => {
        // spyOn(log, 'info');
        $log.info('test');
        expect(mockLog.info).not.toHaveBeenCalled();
      }));

    });
    describe('if logging is enabled', () => {
      beforeEach(() => {
        window.location.href += '?debug=true'
      });

      it('should should log', () => {
        log.info('test');
        console.log(log.info.logs);
      });
    });
  });
})();
