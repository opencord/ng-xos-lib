
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

  describe('The xos.helper module', function(){
    describe('The NoHyperlinks factory', () => {

      let httpProviderObj, noHyperlinks;

      beforeEach(() => {
        module(
          'xos.helpers',
          ($httpProvider) => {
            //save our interceptor
            httpProviderObj = $httpProvider;
          }
        );

        inject(function (_NoHyperlinks_) {
          noHyperlinks = _NoHyperlinks_
        });

        httpProviderObj.interceptors.push('NoHyperlinks');

      });

      it('should set NoHyperlinks interceptor', () => {
        expect(httpProviderObj.interceptors).toContain('NoHyperlinks');
      });

      it('should attach ?no_hyperlinks=1 to the request url', () => {
        let result = noHyperlinks.request({url: 'sample.url'});
        expect(result.url).toEqual('sample.url?no_hyperlinks=1');
      });

      it('should NOT attach ?no_hyperlinks=1 to the request url if is HTML', () => {
        let result = noHyperlinks.request({url: 'sample.html'});
        expect(result.url).toEqual('sample.html');
      });

    });
  });
})();

