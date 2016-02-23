(function() {
  'use strict';

  angular
    .module('trelloProject')
    .factory('TestService', TestService);

    TestService.$inject = ['$resource'];
    function TestService($resource) {
      return $resource('/start/what');
    }
})();
