
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
  .component('formTest', {
    restrict: 'E',
    bindings: {},
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: 'templates/form.dev.html',
    controller: function () {
      this.model = {
        first_name: 'Jhon',
        last_name: 'Doe',
      },
      this.config = {
        exclude: ['password', 'last_login'],
        formName: 'sampleForm',
        actions: [
          {
            label: 'Save',
            icon: 'ok', // refers to bootstraps glyphicon
            cb: (user) => { // receive the model
              console.log(user);
            },
            class: 'success'
          }
        ],
        order: ['last_name', 'select'],
        fields: {
          first_name: {
            type: 'string',
            validators: {
              required: true
            }
          },
          last_name: {
            label: 'Surname',
            type: 'string',
            validators: {
              required: true,
              minlength: 10
            }
          },
          select: {
            label: 'select',
            type: 'select',
            options: [
              {id: 1, label: 'a'},
              {id: 2, label: 'b'}
            ]
          },
          details_field: {
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
          }
        }
      }
    }
  })
