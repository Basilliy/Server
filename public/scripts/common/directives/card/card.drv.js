(function() {
  'use strict';

  angular
    .module('trelloProject')
    .directive('card', cardDirective);

    function cardDirective() {
      var directive = {
        restrict: 'E',
        replace: true,
        scope: {
          data:"="
        },
        templateUrl: './scripts/common/directives/card/card.tpl.html',
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, elem, attrs) {

      }
    }
})();
