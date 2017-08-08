
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
 * Created by teone on 3/24/16.
 */

(function () {
  'use strict';

  /**
  * @ngdoc overview
  * @name xos.uiComponents
  * @description
  * # xos.uiComponents
  * A collection of UI components useful for Dashboard development. <br/>
  * Currently available components are:
  * - [xosAlert](/#/module/xos.uiComponents.directive:xosAlert)
  * - [xosForm](/#/module/xos.uiComponents.directive:xosForm)
  * - [xosPagination](/#/module/xos.uiComponents.directive:xosPagination)
  * - [xosSmartTable](/#/module/xos.uiComponents.directive:xosSmartTable)
  * - [xosTable](/#/module/xos.uiComponents.directive:xosTable)
  * - [xosValidation](/#/module/xos.uiComponents.directive:xosValidation)
  **/

  angular.module('xos.uiComponents', [
    'chart.js',
    'RecursionHelper',
    'dndLists'
  ])
})();
