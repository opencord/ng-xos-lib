
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
  .component('alertTest', {
    restrict: 'E',
    bindings: {},
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: 'templates/alert.dev.html',
    controller: function () {
      this.config1 = {
        type: 'danger'
      };

      this.config2 = {
        type: 'danger',
        closeBtn: true
      };

      this.config3 = {
        type: 'info'
      };

      this.config4 = {
        type: 'success'
      };

      this.config5 = {
        type: 'warning'
      };
    }
  })