(function() {
  'use strict';

  angular
    .module('trelloProject')
    .factory('ListService', ListService);

    ListService.$inject = ['$resource'];
    function ListService($resource) {
      var data = $resource('/api/user/:user/lists/:id', { user: '@user', id: '@id', type: '@type'}, {
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
