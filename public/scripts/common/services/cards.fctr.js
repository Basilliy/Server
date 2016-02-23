(function() {
  'use strict';

  angular
    .module('trelloProject')
    .factory('ListService', ListService);

    ListService.$inject = ['$resource'];
    function ListService($resource) {
      return $resource('/card/:id', {
        id: '@id'
      });
    }
})();
