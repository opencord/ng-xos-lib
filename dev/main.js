/* eslint-disable angular/ng_module_name */
(function () {
  'use strict';
  console.log('hello1!');
  angular.module('ngXosLib', ['xos.helpers'])
  .run(function(){
    console.info('Dev Environment ready!')
  })
  .controller('testCtrl', function(){
    this.model = {
      first_name: 'Jhon',
      last_name: 'Doe',
    }
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
    };
  });
})();