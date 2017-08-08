
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
    describe('The Comparator service', () => {

      let service;

      // load the application module
      beforeEach(module('xos.helpers'));

      // inject the cartService
      beforeEach(inject(function (_Comparator_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        service = _Comparator_;
      }));

      describe('given a string', () => {
        it('should return true if expected is substring of actual', () => {
          const res = service('test', 'te');
          expect(res).toBeTruthy();
        });

        it('should return false if expected is not substring of actual', () => {
          const res = service('test', 'ab');
          expect(res).toBeFalsy();
        });
      });

      describe('given a boolean', () => {
        it('should return true if values match', () => {
          expect(service(false, false)).toBeTruthy();
          expect(service(true, true)).toBeTruthy();
          expect(service(0, false)).toBeTruthy();
          expect(service(1, true)).toBeTruthy();
        });

        it('should return false if values doesn\'t match', () => {
          expect(service(false, true)).toBeFalsy();
          expect(service(true, false)).toBeFalsy();
          expect(service(1, false)).toBeFalsy();
          expect(service(0, true)).toBeFalsy();
        });
      });

      describe('given a number', () => {
        // NOTE if numbers should we compare with === ??
        it('should return true if expected is substring of actual', () => {
          expect(service(12, 1)).toBeTruthy();
        });

        it('should return false if expected is not substring of actual', () => {
          expect(service(12, 3)).toBeFalsy();
        });
      });

    });
  });

})();