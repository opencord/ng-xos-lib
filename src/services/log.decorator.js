
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


// TODO write tests for log

/* eslint-disable  angular/ng_window_service*/

angular.module('xos.helpers')
.config([ '$provide', function( $provide )
{
  // Use the `decorator` solution to substitute or attach behaviors to
  // original service instance; @see angular-mocks for more examples....

  $provide.decorator( '$log', [ '$delegate', function( $delegate )
  {

    const isLogEnabled = () => {
      return window.location.href.indexOf('debug=true') >= 0;
    };
    // Save the original $log.debug()
    let logFn = $delegate.log;
    let infoFn = $delegate.info;
    let warnFn = $delegate.warn;
    //let errorFn = $delegate.error;
    let debugFn = $delegate.debug;

    // create the replacement function
    const replacement = (fn) => {
      return function(){
         //console.log(`Is Log Enabled: ${isLogEnabled()}`)
        if(!isLogEnabled()){
          // console.log('logging is disabled');
          return;
        }

        let args    = [].slice.call(arguments);
        let now     = new Date();

        // Prepend timestamp
        args[0] = `[${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}] ${args[0]}`;

        // HACK awfull fix for angular mock implementation whithin jasmine test failing issue
        if (angular.isFunction($delegate.reset) && !($delegate.debug.logs instanceof Array)) {
          // if we are within the mock and did not reset yet, we call it to avoid issue
          // console.log('mock log impl fix to avoid logs array not existing...');
          $delegate.reset();
        }

        // Call the original with the output prepended with formatted timestamp

        return fn.apply(null, args)
      };
    };

    $delegate.info = replacement(infoFn);
    $delegate.log = replacement(logFn);
    $delegate.warn = replacement(warnFn);
    //$delegate.error = replacement(errorFn); // note this will prevent errors to be printed
    $delegate.debug = replacement(debugFn);

    return $delegate;
  }]);
}]);