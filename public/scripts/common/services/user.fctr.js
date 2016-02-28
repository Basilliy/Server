(function() {
  'use strict';

  angular
    .module('trelloProject')
    .factory('UserService', UserService);

    UserService.$inject = ['$resource'];
    function UserService($resource) {
      var data = $resource('/api/user/:type', { type: "@type" }, {
        query: {
          method: "GET",
          isArray: false
        },
        avatar: {
          method: "PUT",
          params: {
            type: "avatar"
          }
        },
        background: {
          method: "PUT",
          params: {
            type: "background"
          }
        },
        update:  {
          method: "PUT"
        }
      });

      return data;
    }
})();
