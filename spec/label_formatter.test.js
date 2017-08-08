
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


(function () {
  'use strict';

  describe('The xos.helper module', function(){
    describe('The label formatter service', () => {

      let service;

      // load the application module
      beforeEach(module('xos.helpers'));

      // inject the cartService
      beforeEach(inject(function (_LabelFormatter_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        service = _LabelFormatter_;
      }));

      it('should replace underscores in a string', () => {
        expect(service._formatByUnderscore('my_test')).toEqual('my test');
        expect(service._formatByUnderscore('_test')).toEqual('test');
      });

      it('should split a camel case string', () => {
        expect(service._formatByUppercase('myTest')).toEqual('my test');
      });

      it('should capitalize a string', () => {
        expect(service._capitalize('my test')).toEqual('My test');
      });

      it('should format an object property to a label', () => {
        expect(service.format('myWeird_String')).toEqual('My weird string:');
      });

      it('should not add column if already present', () => {
        expect(service.format('myWeird_String:')).toEqual('My weird string:');
      });

    });
  });

})();