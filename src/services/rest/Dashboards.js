
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
  * @name xos.helpers.Dashboards
  * @description Angular resource to fetch /api/core/dashboardviews/:id/
  **/
  .service('Dashboards', function($resource, $q, $http){
    const r = $resource('/api/core/dashboardviews/:id/', { id: '@id' }, {
      update: { method: 'PUT' }
    });

    r.prototype.$save = function(){
      const d = $q.defer();

      $http.put(`/api/core/dashboardviews/${this.id}/`, this)
      .then((res) => {
        d.resolve(res.data);
      })
      .catch(e => {
        d.reject(e.data);
      });

      return d.promise;
    }

    return r;
  })
})();