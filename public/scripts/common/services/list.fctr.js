(function() {
  'use strict';

  angular
    .module('trelloProject')
    .factory('ListService', ListService);

    ListService.$inject = ['$resource'];
    function ListService($resource) {
      var data = $resource("/api/lists/:user", { user: "@user" }, {
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
