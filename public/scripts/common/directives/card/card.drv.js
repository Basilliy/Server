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
          data: '=',
          listId: '=',
          reload: '&'
        },
        templateUrl: './scripts/common/directives/card/card.tpl.html',
        controller: cardController,
        controllerAs: 'vm',
        bindToController: true
      }

      return directive;
    }

    cardController.$inject = ['$stateParams', 'CardService'];
    function cardController($stateParams, CardService) {
      var vm = this;
      var user = $stateParams.username;
      var cardID = vm.data._id;
      var listID = vm.listId;
      vm.removeCard = removeCard;
      vm.editCard = editCard;
      vm.closeDropdown = closeDropdown;


      function editCard() {
        vm.editingCard = true;
      }

      function closeDropdown() {
        vm.editingCard = false;
      }

      function removeCard() {
        CardService.delete({ user: user, list: listID, card: cardID }, function (response) {
          vm.reload();
        });
      }
      // console.log(vm.data)
    }
})();
