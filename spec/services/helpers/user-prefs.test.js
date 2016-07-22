/**
 * © OpenCORD
 *
 * Created by teone on 5/25/16.
 */

(function () {
  'use strict';

  let cookies = {
    xosUserPrefs: JSON.stringify({test: true})
  };

  const cookieMock = {
    get: (name) => {
      return cookies[name]
    },
    put: (name, value) => {
      cookies[name] = value
    }
  };

  describe('The xos.helper module', function(){

    describe('The XosUserPrefs service', () => {
      let service, deffered, rootScope;

      // load the application module
      beforeEach(module('xos.helpers', ($provide) => {
        $provide.value('$cookies', cookieMock);
      }));

      // inject the cartService
      beforeEach(inject(function (_XosUserPrefs_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        service = _XosUserPrefs_;
        spyOn(cookieMock, 'put').and.callThrough();
      }));

      beforeEach(inject(($q, $rootScope) => {
        rootScope = $rootScope;
      }));
      it('should exists and have methods', () => {
        expect(service).toBeDefined();
        expect(service.getAll).toBeDefined();
        expect(service.setAll).toBeDefined();
        expect(service.getSynchronizerNotificationStatus).toBeDefined();
        expect(service.setSynchronizerNotificationStatus).toBeDefined();
        expect(service.setUserDetailsCookie).toBeDefined();
        expect(service.getUserDetailsCookie).toBeDefined();
      });

      describe('the getAll method', () => {
        it('should return all the stored prefs', () => {
          let prefs = service.getAll();
          expect(prefs).toEqual(JSON.parse(cookies.xosUserPrefs));
        });
      });

      describe('the setAll method', () => {
        it('should override all preferences', () => {
          service.setAll({test: true, updated: true});
          expect(JSON.parse(cookies.xosUserPrefs)).toEqual({test: true, updated: true});
        });
      });

      describe('the synchronizers status', () => {
        let syncNotification;
        beforeEach(() => {
          syncNotification = {
            synchronizers: {
              notification: {
                first: true,
                second: false
              }
            },
            userData: {
              userId: 1
            }
          }
          cookies.xosUserPrefs = JSON.stringify(syncNotification);
        });

        describe('the getSynchronizerNotificationStatus method', () => {
          it('should return notification status for all synchronizers', () => {
            expect(service.getSynchronizerNotificationStatus()).toEqual(syncNotification.synchronizers.notification);
          });

          it('should return notification status for a single synchronizers', () => {
            expect(service.getSynchronizerNotificationStatus('first')).toEqual(syncNotification.synchronizers.notification.first);
            expect(service.getSynchronizerNotificationStatus('second')).toEqual(syncNotification.synchronizers.notification.second);
          });
        });

        describe('the setSynchronizerNotificationStatus', () => {
          
          it('should throw an error if called without synchronizer name', () => {
            function wrapper (){
              service.setSynchronizerNotificationStatus();
            }
            expect(wrapper).toThrowError('[XosUserPrefs] When updating a synchronizer is mandatory to provide a name.');
          });

          it('should update a synchronizer notification status', () => {
            service.setSynchronizerNotificationStatus('second', true);
            expect(service.getSynchronizerNotificationStatus('second')).toEqual(true);
            expect(service.getSynchronizerNotificationStatus('first')).toEqual(true);

            // should persist the change
            expect(cookieMock.put).toHaveBeenCalledWith('xosUserPrefs', '{"synchronizers":{"notification":{"first":true,"second":true}},"userData":{"userId":1}}');
          });

          it('should handle empty cookies', () => {
            cookies.xosUserPrefs = '';
            service.setSynchronizerNotificationStatus('second', true);
            expect(service.getSynchronizerNotificationStatus('second')).toEqual(true);
          });
        });
      });

      describe('the userdetails status', () => {
        let userdata, meMock;
        const userData = {
          current_user_id: 2
        };
        beforeEach(inject(($q, Me) => {
          userdata = {
            userData: {
              current_user_id: 1
            }
          }
          cookies.xosUserPrefs = JSON.stringify(userdata);
          deffered= $q.defer();
          meMock = Me;
          spyOn(meMock, 'get').and.callFake(function(){
            return deffered.promise;
          });
        }));
        describe('Get user data method', ()=>{
          it('it should return the stored data', (done) => {
            service.getUserDetailsCookie().$promise.then((data) => {
              expect(data).toEqual(userdata.userData);
              done();
            });
            rootScope.$apply();
          });

          it('Should call the Api to return the data', (done) => {
            cookies.xosUserPrefs = JSON.stringify();
            service.getUserDetailsCookie().$promise.then((res) => {
              expect(res.userId).toEqual(userData.userId);
              expect(meMock.get).toHaveBeenCalled();
              done();
            });
            deffered.resolve(userData);
            rootScope.$apply();
          });

        });
        describe('Set user data method', ()=>{
          it('it should save the provided data', (done) => {
            service.setUserDetailsCookie(userData).$promise.then(data => {
              expect(data).toEqual(userData);
              expect(cookieMock.put).toHaveBeenCalledWith('xosUserPrefs',  '{"userData":{"current_user_id":2}}');
              done();
            });
            rootScope.$apply();
          });
          it('Should call the Api to save the data', (done)=>{
            service.setUserDetailsCookie().$promise.then(data => {
              expect(meMock.get).toHaveBeenCalled();
              expect(data).toEqual(userData);
              expect(cookieMock.put).toHaveBeenCalledWith('xosUserPrefs',  '{"userData":{"current_user_id":2}}');
              done();
            });
            deffered.resolve(userData);
            rootScope.$apply();
          });
        });
      });
    });
  });
})();