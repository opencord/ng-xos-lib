
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
 * Visit http://guide.xosproject.org/devguide/addview/ for more information
 *
 * Created by teone on 4/15/16.
 */

(function () {
  'use strict';

  angular.module('xos.uiComponents')

  /**
    * @ngdoc directive
    * @name xos.uiComponents.directive:xosValidation
    * @restrict E
    * @description The xos-validation directive
    * @param {Object} errors The error object
    * @element ANY
    * @scope
  * @example
  <example module="sampleValidation">
    <file name="index.html">
      <div ng-controller="SampleCtrl as vm">
        <div class="row">
          <div class="col-xs-12">
            <label>Set an error type:</label>
          </div>
          <div class="col-xs-2">
            <a class="btn"
              ng-click="vm.field.$error.required = !vm.field.$error.required"
              ng-class="{'btn-default': !vm.field.$error.required, 'btn-success': vm.field.$error.required}">
              Required
            </a>
          </div>
          <div class="col-xs-2">
            <a class="btn"
              ng-click="vm.field.$error.email = !vm.field.$error.email"
              ng-class="{'btn-default': !vm.field.$error.email, 'btn-success': vm.field.$error.email}">
              Email
            </a>
          </div>
          <div class="col-xs-2">
            <a class="btn"
              ng-click="vm.field.$error.minlength = !vm.field.$error.minlength"
              ng-class="{'btn-default': !vm.field.$error.minlength, 'btn-success': vm.field.$error.minlength}">
              Min Length
            </a>
          </div>
          <div class="col-xs-2">
            <a class="btn"
              ng-click="vm.field.$error.maxlength = !vm.field.$error.maxlength"
              ng-class="{'btn-default': !vm.field.$error.maxlength, 'btn-success': vm.field.$error.maxlength}">
              Max Length
            </a>
          </div>
        </div>
        <xos-validation field ="vm.field" form = "vm.form"></xos-validation>
      </div>
    </file>
    <file name="script.js">
      angular.module('sampleValidation', ['xos.uiComponents'])
      .controller('SampleCtrl', function(){
        this.field = {
          $error: {}
        };
        this.form= {
        $submitted:true
        }
      });
    </file>
  </example>
    */

  .component('xosValidation', {
    restrict: 'E',
    bindings: {
      field: '=',
      form: '='
    },
    template: `
      <div ng-cloak>
        <xos-alert config="vm.config" show="vm.field.$error.required !== undefined && vm.field.$error.required !== false  && (vm.field.$touched || vm.form.$submitted)">
          Field required
        </xos-alert>
        <xos-alert config="vm.config" show="vm.field.$error.email !== undefined && vm.field.$error.email !== false && (vm.field.$touched || vm.form.$submitted)">
          This is not a valid email
        </xos-alert>
        <xos-alert config="vm.config" show="vm.field.$error.minlength !== undefined && vm.field.$error.minlength !== false && (vm.field.$touched || vm.form.$submitted)">
          Too short
        </xos-alert>
        <xos-alert config="vm.config" show="vm.field.$error.maxlength !== undefined && vm.field.$error.maxlength !== false && (vm.field.$touched || vm.form.$submitted)">
          Too long
        </xos-alert>
        <xos-alert config="vm.config" show="vm.field.$error.custom !== undefined && vm.field.$error.custom !== false && (vm.field.$touched || vm.form.$submitted)">
          Field invalid
        </xos-alert>
      </div>
    `,
    transclude: true,
    bindToController: true,
    controllerAs: 'vm',
    controller: function(){
      this.config = {
        type: 'danger'
      }
    }
  })
})();
