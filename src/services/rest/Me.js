
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


(function() {
  'use strict';

  angular.module('xos.helpers')
  /**
  * @ngdoc service
  * @name xos.helpers.Me
  * @description Http read-only api to fetch /api/utility/me/
  **/
  .service('Me', function($q, $http){

    this.get = () => {
      let deferred = $q.defer();

      $http.get('/api/utility/me/')
      .then(res => {
        deferred.resolve(res.data);
      })
      .catch(e => {
        deferred.reject(e);
      });
      return deferred.promise;

    };
  })
})();
