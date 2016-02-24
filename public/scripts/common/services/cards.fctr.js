(function() {
  'use strict';

  angular
    .module('trelloProject')
    .factory('ListService', ListService);

    ListService.$inject = ['$resource'];
    function ListService($resource) {
      var data = $resource("/api/lists/:list/cards/:card", { list: "@list", card: "@card" }, {
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
