
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
 * Collection of helpers for xos tests
 */

/* exported clickElement */
/* eslint-disable angular/ng_document_service */

const clickElement = function (el){
  const ev = document.createEvent('MouseEvent');
  ev.initMouseEvent(
    'click',
    true /* bubble */, true /* cancelable */,
    window, null,
    0, 0, 0, 0, /* coordinates */
    false, false, false, false, /* modifier keys */
    0 /*left*/, null
  );
  el.dispatchEvent(ev);
};

describe('Matchers inclusion', () => {
  beforeEach(function(){
    jasmine.addMatchers({
      toBeInstanceOf: function() {

        return {
          compare: (actual, expected) => {
            // const actual = actual;
            const result = {};
            result.pass = actual instanceof expected.constructor;

            result.message = 'Expected ' + actual + ' to be instance of ' + expected;

            return result;
          },
          negativeCompare: (actual, expected) => {
            // const actual = actual;
            const result = {};
            result.pass = actual instanceof expected.constructor === false;

            result.message = 'Expected ' + actual + ' to be instance of ' + expected;

            return result;
          }
        }
      }
    });
  });
});
console.log('---------------------- Test Helpers Loaded!! -----------------------');
