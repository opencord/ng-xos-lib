
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


/* eslint-disable angular/ng_module_name */
(function(){
  'use strict';
  angular.module('ngXosLib', ['xos.helpers', 'ui.router'])
  .config(($stateProvider) => {
    $stateProvider
    .state('form-test', {
      url: '/form/',
      template: '<form-test></form-test>'
    })
    .state('table-test', {
      url: '/table/',
      template: '<table-test></table-test>'
    })
    .state('alert-test', {
      url: '/alert/',
      template: '<alert-test></alert-test>'
    })
    .state('field-test', {
      url: '/field/',
      template: '<field-test></field-test>'
    })
    .state('smart-table-test', {
      url: '/smartTable/',
      template: '<smart-table-test></smart-table-test>'
    })
  })
  .component('navDemo', {
    restrict: 'E',
    bindings: {},
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: 'templates/nav.dev.html',
    controller: function ($rootScope) {

      this.active = 'form';

      $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        let strSelected = toState.url.split('/').join('');
        this.active = strSelected.charAt(0).toUpperCase() + strSelected.slice(1);
      });

      this.config = {
        actions: [
          {
            label: 'Form',
            class: '',
            link: '/#/form/'
          },
          {
            label: 'Field',
            class: '',
            link: '/#/field/'

          },
          {
            label: 'Alert',
            class: '',
            link: '/#/alert/'

          },
          {
            label: 'Table',
            class: '',
            link: '/#/table/'
          },
          {
            label: 'SmartTable',
            class: '',
            link: '/#/smartTable/'
          }
        ]
      }
    }
  });

})();