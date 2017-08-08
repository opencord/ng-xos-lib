
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


'use strict';

angular.module('ngXosLib')
  .component('fieldTest', {
    restrict: 'E',
    bindings: {},
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: 'templates/field.dev.html',
    controller: function () {
      this.field1 = {
        name: 'number-field',
        field: {label: 'My Number Value:', type: 'number'},
        model: 2
      };

      this.field2 = {
        name: 'date-field',
        field: {label: 'My Date Value:', type: 'date'},
        model: new Date()
      };

      this.field3 = {
        name: 'boolean-field',
        field: {label: 'My Boolean Value:', type: 'boolean'},
        model: true
      };

      this.field4 = {
        name: 'email-field',
        field: {label: 'My Email Value:', type: 'email'},
        model: 'sample@domain.us'
      };
      this.field5 = {
        name: 'Empty Object Field',
        label: 'Empty Object Field',
        type: 'object',
        properties: {
          foo: {
            label: 'FooLabel:',
            type: 'string',
            validators: {
              required: true
            }
          },
          bar: {
            type: 'number'
          }
        }
      };

      this.selectField = {
        name: 'select',
        label: 'Select field:',
        type: 'select',
        model: 1,
        options: [
          {id: 1, label: 'One'},
          {id: 2, label: 'Two'},
          {id: 3, label: 'Three'},
        ]
      }

      this.arrayField = {
        name: 'array',
        label: 'Array field:',
        model: ['one', 'two', 'three'],
        type: 'array',
        options: ['one', 'two', 'three', 'four']
      };
    }
  });