(function() {
  'use strict';

  angular
    .module('trelloProject')
    .factory('UserService', UserService);

    UserService.$inject = ['$resource'];
    function UserService($resource) {
      var data = $resource('/api/user',{}, {
        query: {
          method: "GET",
          isArray: false
        },
        update:  {
          method: "PUT"
        }
      });

      return data;
    }
})();
