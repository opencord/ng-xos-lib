(function () {
  
  angular.module('xos.helpers')

  /**
  * @ngdoc service
  * @name xos.helpers.XosUserPrefs
  * @description
  * This service is used to store the user preferences in cookies, so that they survive to page changes.
  * The structure of the user preference is:
  * ```
  * {
  *   synchronizers: {
  *     notification: {
  *       'volt': boolean,
  *       'openstack': boolean,
  *       ...
  *     }
  *   }
  *   userData: {
  *     current_user_site_id: Number,
  *     current_user_site_user_names: Array[1],
  *     ...
  *     }
  * }
  * ```
  **/

  .service('XosUserPrefs', function($cookies, Me, $q){

    let userPrefs = $cookies.get('xosUserPrefs') ? angular.fromJson($cookies.get('xosUserPrefs')) : {};

    /**
    * @ngdoc method
    * @name xos.helpers.XosUserPrefs#getAll
    * @methodOf xos.helpers.XosUserPrefs
    * @description
    * Return all the user preferences stored in cookies
    * @returns {object} The user preferences
    **/
    this.getAll = () => {
      userPrefs = $cookies.get('xosUserPrefs') ? angular.fromJson($cookies.get('xosUserPrefs')) : {};
      return userPrefs;
    };

    /**
    * @ngdoc method
    * @name xos.helpers.XosUserPrefs#setAll
    * @methodOf xos.helpers.XosUserPrefs
    * @description
    * Override all user preferences
    * @param {object} prefs The user preferences
    **/
    this.setAll = (prefs) => {
      $cookies.put('xosUserPrefs', angular.toJson(prefs));
    };

    /**
    * @ngdoc method
    * @name xos.helpers.XosUserPrefs#getSynchronizerNotificationStatus
    * @methodOf xos.helpers.XosUserPrefs
    * @description
    * Return the synchronizer notification status, if name is not provided return the status for all synchronizers
    * @param {string=} prefs The synchronizer name
    * @returns {object | string} The synchronizer status
    **/
    this.getSynchronizerNotificationStatus = (name = false) => {
      if(name){
        return this.getAll().synchronizers.notification[name];
      }
      return this.getAll().synchronizers.notification;
    };


    /**
    * @ngdoc method
    * @name xos.helpers.XosUserPrefs#getUserDetailsCookie
    * @methodOf xos.helpers.XosUserPrefs
    * @description
    * Return all the user details stored in cookies or call the service
    * @returns {object} The user details
    **/
    this.getUserDetailsCookie = () => {
      const defer = $q.defer();
      let localPref  = this.getAll();
      if(!localPref.userData){
        this.setUserDetailsCookie().$promise.then((data)=>{
          defer.resolve(data);
        });
      }
      else{
        defer.resolve(localPref.userData);
      }
      return {$promise: defer.promise};
    };

    /**
    * @ngdoc method
    * @name xos.helpers.XosUserPrefs#setUserDetailsCookie
    * @methodOf xos.helpers.XosUserPrefs
    * @description
    * Save the user details in the cookie
    * @param {object} details stored in cookie
    * @param {objects} returns the user details as a promise
    **/
    this.setUserDetailsCookie = (userData = null)=> {

      const defer = $q.defer();
      let cookies = this.getAll();
      if (!userData){
        Me.get().then((user)=> {
          cookies.userData = user;
          this.setAll(cookies);
          defer.resolve(user);
        })
        .catch ((e) => {
          defer.reject(e);
        });
      }
      else {
        cookies.userData = userData;
        this.setAll(cookies);
        defer.resolve(userData);
      }
      return {$promise: defer.promise};
    }

     /**
    * @ngdoc method
    * @name xos.helpers.XosUserPrefs#setSynchronizerNotificationStatus
    * @methodOf xos.helpers.XosUserPrefs
    * @description
    * Update the notification status for a single synchronizer
    * @param {string} name The synchronizer name
    * @param {boolean} value The notification status (true means that it has been sent)
    **/

    this.setSynchronizerNotificationStatus = (name = false, value) => {
      if(!name){
        throw new Error('[XosUserPrefs] When updating a synchronizer is mandatory to provide a name.')
      }

      let cookies = this.getAll();

      if(!cookies.synchronizers){
        cookies.synchronizers = {
          notification: {}
        }
      }
      cookies.synchronizers.notification[name] = value;
      this.setAll(cookies);
    }
  });
})();