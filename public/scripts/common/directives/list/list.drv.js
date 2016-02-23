(function() {
  'use strict';

  angular
    .module('trelloProject')
    .directive('list', listDirective);

    function listDirective() {
      var directive = {
        restrict: 'E',
        replace: true,
        scope: {
          data: '=',
          reload: '&'
        },
        templateUrl: './scripts/common/directives/list/list.tpl.html',
        controller: listController,
        controllerAs: 'vm',
        bindToController: true

      }

      return directive;

    }

    function listController() {
      var vm = this;

      vm.visibleNewCard = false;
      vm.closeDropdown = closeDropdown;
      vm.createNewCard = createNewCard;
      vm.showNewCardInput = showNewCardInput;
      vm.removeList = removeList;


      function closeDropdown() {
        vm.showDropdown = false;
      }

      function showNewCardInput() {
        vm.visibleNewCard = true;
        vm.focusOn = true;
      }

      function removeList() {
        vm.reload({ title: vm.data.title });
      }


      function createNewCard() {
        if (vm.newCardsText) {
          var newCards = {
            text: vm.newCardsText
          }

          vm.data.cards.push(newCards);
          vm.focusOn = true;
          vm.newCardsText = null;
        }
      }
    }
})();
