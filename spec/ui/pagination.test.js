
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
    describe('The xos-pagination component', () => {

      let scope, element, isolatedScope;
      let cb = jasmine.createSpy('callback')

      beforeEach(module('xos.helpers'));

      beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();

        scope.pageSize = 2;

        scope.totalElements = 5;

        scope.change = cb;

        element = angular.element('<xos-pagination page-size="pageSize" total-elements="totalElements" change="change"></xos-table>');
        $compile(element)(scope);
        scope.$digest();
        isolatedScope = element.isolateScope().vm;
      }));

      it('should contain 3 pages', function() {
        const li = element[0].getElementsByTagName('li');
        expect(li.length).toEqual(5);
      });

      it('should call the change function', () => {
        const li = element[0].getElementsByTagName('li')[3];
        let link = li.getElementsByTagName('a')[0];
        link.click();
        expect(cb).toHaveBeenCalledWith(2);
      });

      describe('when elements number is less than page size', () => {
        beforeEach(() => {
          isolatedScope.pageSize = 10;
          isolatedScope.totalElements = 9;
          scope.$digest();
        });

        it('should not be rendered', () => {
          const pagination = element[0].getElementsByClassName('pagination');
          expect(pagination.length).toEqual(0);
        });
      });
    });
  });
})();