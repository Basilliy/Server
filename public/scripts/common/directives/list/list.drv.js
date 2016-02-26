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

    listController.$inject = ['$stateParams', 'ListService', 'CardService'];
    function listController($stateParams, ListService, CardService) {
      var vm = this;
      var user = $stateParams.username;
      var listID = vm.data._id;

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
        ListService.delete({user: user, id: listID }, function (response) {
          vm.reload();
        });
      }

      function createNewCard() {
        if (vm.newCardsText) {
          var newCards = {
            text: vm.newCardsText
          }

          CardService.save({ user: user, list: listID }, { text: vm.newCardsText }, function (response) {
            vm.data.cards = response.cards;
            vm.focusOn = true;
            vm.newCardsText = null;
          });
        }
      }
    }
})();
