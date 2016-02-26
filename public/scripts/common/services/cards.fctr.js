(function() {
  'use strict';

  angular
    .module('trelloProject')
    .factory('CardService', CardService);

    CardService.$inject = ['$resource'];
    function CardService($resource) {
      var data = $resource('/api/user/:user/lists/:list/cards/:card', { user: '@user', list: '@list', card: '@card' }, {
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
