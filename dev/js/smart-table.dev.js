
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

  const data = [
    {
      'humanReadableName': 'cordSubscriber-1',
      'id': 1,
      'features': {
        'cdn': false,
        'uplink_speed': 1000000000,
        'downlink_speed': 1000000000,
        'uverse': true,
        'status': 'enabled'
      },
      'identity': {'account_num': '123',
      'name': 'My House'},
      'related': {
        'instance_name': 'mysite_vsg',
        'vsg_id': 7,
        'compute_node_name': 'nova-compute-1',
        'c_tag': 111,
        'instance_id': 1,
        'wan_container_ip': '10.168.0.3',
        'volt_id': 6,
        's_tag': 222
      }
    }
  ]

  angular.module('ngXosLib')
  .service('Resource', function($q){
    this.query = () => {
      const d = $q.defer();
      console.log(data);
      d.resolve(data)

      return {$promise: d.promise}
    }
  })
  .component('smartTableTest', {
    restrict: 'E',
    bindings: {},
    bindToController: true,
    controllerAs: 'vm',
    templateUrl: 'templates/smart-table.dev.html',
    controller: function () {
      this.config = {
        resource: 'Resource'
      };
    }
  })
})(); 