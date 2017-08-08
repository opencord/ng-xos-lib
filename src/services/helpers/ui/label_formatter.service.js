
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

  /**
  * @ngdoc service
  * @name xos.uiComponents.LabelFormatter
  * @description This factory define a set of helper function to format label started from an object property
  **/

  angular
      .module('xos.uiComponents')
      .factory('LabelFormatter', labelFormatter);

  function labelFormatter() {

    /**
    * @ngdoc method
    * @name xos.uiComponents.LabelFormatter#_formatByUnderscore
    * @methodOf xos.uiComponents.LabelFormatter
    * @description
    * Convert a `snake_case` string to readable string.<br/>
    * Eg: `this_string` will became `this string`
    * @param {string} string The string to be converted
    * @returns {string} The converten string
    **/

    const _formatByUnderscore = string => string.split('_').join(' ').trim();

    /**
    * @ngdoc method
    * @name xos.uiComponents.LabelFormatter#_formatByUppercase
    * @methodOf xos.uiComponents.LabelFormatter
    * @description
    * Convert a `camelCase` string to readable string.<br/>
    * Eg: `thisString` will became `this string`
    * @param {string} string The string to be converted
    * @returns {string} The converten string
    **/

    const _formatByUppercase = string => string.split(/(?=[A-Z])/).map(w => w.toLowerCase()).join(' ');

    /**
    * @ngdoc method
    * @name xos.uiComponents.LabelFormatter#_capitalize
    * @methodOf xos.uiComponents.LabelFormatter
    * @description
    * Capitalize the first letter of a string.<br/>
    * Eg: `this string` will became `This string`
    * @param {string} string The string to be converted
    * @returns {string} The converten string
    **/

    const _capitalize = string => string.slice(0, 1).toUpperCase() + string.slice(1);

    /**
    * @ngdoc method
    * @name xos.uiComponents.LabelFormatter#format
    * @methodOf xos.uiComponents.LabelFormatter
    * @description
    * Apply in order:
    * - _formatByUnderscore
    * - _formatByUppercase
    * - _capitalize
    * - replace multiple space with a single one
    * - append `:` at the end
    * <br/>
    * Eg: `this_string` will became `This string:`<br/>
    * Eg: `thisString` will became `This string:`
    * @param {string} string The string to be converted
    * @returns {string} The converten string
    **/

    const format = (string) => {
      string = _formatByUnderscore(string);
      string = _formatByUppercase(string);

      string = _capitalize(string).replace(/\s\s+/g, ' ') + ':';
      return string.replace('::', ':');
    };

    return {
      // test export
      _formatByUnderscore: _formatByUnderscore,
      _formatByUppercase: _formatByUppercase,
      _capitalize: _capitalize,
      // export to use
      format: format
    };
  }
})();
