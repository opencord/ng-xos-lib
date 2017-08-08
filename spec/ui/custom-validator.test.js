
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
 * Created by teone on 5/25/16.
 */

(function () {
  'use strict';

  describe('The xos.helper module', function () {
    describe('The xosCustomValidator directive', () => {
      let element, scope, isolatedScope, rootScope, compile, form, input;
      const compileElement = (el) => {
        element = el;

        if(!scope){
          scope = rootScope.$new();
        }
        if(angular.isUndefined(element)){
          element = angular.element(`
            <form name="form">
              <input name="testInput" type="text" ng-model="value" xos-custom-validator custom-validator="validator"/>
            </form>
          `);
        }
        compile(element)(scope);
        scope.$digest();
        input = $(element).find('input');
        isolatedScope = angular.element(input).isolateScope();
        form = scope.form;
      };

      beforeEach(module('xos.helpers'));

      beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;
        rootScope = $rootScope;
      }));

      beforeEach(() => {
        scope = rootScope.$new();
        scope.validator = 'validator';
        scope.value = '';
        compileElement();
      });

      it('should bind the validator', () => {
        expect(isolatedScope.fn).toEqual('validator');
      });

      describe('given a validator function', () => {

        beforeEach(() => {
          scope = rootScope.$new();
          scope.value = '';
          scope.validator = (model) => angular.equals(model, 'test');
          spyOn(scope, 'validator').and.callThrough();
          compileElement();
        });

        it('should call the validator function on value change', () => {
          form.testInput.$setViewValue('something');
          scope.$digest();
          expect(scope.validator).toHaveBeenCalledWith('something');
          expect(scope.value).toEqual('something');
        });

        it('should set the field invalid', () => {
          form.testInput.$setViewValue('something');
          scope.$digest();
          expect(scope.validator).toHaveBeenCalledWith('something');
          expect(input).toHaveClass('ng-invalid');
          expect(input).toHaveClass('ng-invalid-custom');
        });

        it('should set the field valid', () => {
          form.testInput.$setViewValue('test');
          scope.$digest();
          expect(scope.validator).toHaveBeenCalledWith('test');
          expect(input).not.toHaveClass('ng-invalid');
          expect(input).not.toHaveClass('ng-invalid-custom');
        });

        describe('if the validation function return an array', () => {

          beforeEach(() => {
            scope = rootScope.$new();
            scope.value = '';
            scope.validator = (model) => {
              return ['randomTest', angular.equals(model, 'test')];
            };
            spyOn(scope, 'validator').and.callThrough();
            compileElement();
          });

          it('should set the field invalid', () => {
            form.testInput.$setViewValue('something');
            scope.$digest();
            expect(scope.validator).toHaveBeenCalledWith('something');
            expect(input).toHaveClass('ng-invalid');
            expect(input).toHaveClass('ng-invalid-random-test');
          });
        });
      });
    });
  });
})();