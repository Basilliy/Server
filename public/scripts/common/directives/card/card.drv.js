(function() {
  'use strict';

  angular
    .module('trelloProject')
    .directive('card', cardDirective);

    function cardDirective() {
      var directive = {
        require: '^list',
        restrict: 'E',
        replace: true,
        scope: {
          data: '='
        },
        templateUrl: './scripts/common/directives/card/card.tpl.html',
        controller: cardController,
        controllerAs: 'vm',
        bindToController: true
      }

      return directive;
    }

    function cardController(listController) {
      var vm = this;

      console.log(listController)
    }
})();
