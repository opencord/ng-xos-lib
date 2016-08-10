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
      }
    }
  });