(function() {
  'use strict';

  angular
    .module('trelloProject')
    .factory('ListService', ListService);

    ListService.$inject = ['$resource'];
    function ListService($resource) {
      var data = $resource('/api/user/:user/lists/:id', { user: '@user', id: '@id'}, {
        query: {
          method: 'GET',
          isArray: false
        },
        update:  {
          method: 'PUT'
        }
      });

      return data;
    }
})();
