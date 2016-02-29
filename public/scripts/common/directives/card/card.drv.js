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

    cardController.$inject = ['$scope', '$stateParams', 'CardService'];
    function cardController($scope, $stateParams, CardService) {
      var vm = this;
      var user = $stateParams.username;
      var cardID = vm.data._id;
      var listID = vm.listId;
      var previousText;
      vm.removeCard = removeCard;
      vm.editCard = editCard;
      vm.closeDropdown = closeDropdown;
      vm.closeEditingCard = closeEditingCard;
      vm.saveEditingCard = saveEditingCard;

      $scope.$watch('vm.changeCardText', function(val) {
        if (val === true) {
          previousText = vm.data.text;
        }
      })

      function editCard() {
        vm.showDropdown = (vm.showDropdown)
        ? false
        : true;
      }

      function closeDropdown() {
        vm.showDropdown = false;
      }

      function closeEditingCard() {
        vm.data.text = previousText;
        vm.changeCardText = false;
      }

      function removeCard() {
        CardService.delete({ user: user, list: listID, card: cardID }, function (response) {
          vm.reload();
        });
      }

      function saveEditingCard() {
        if(vm.data.text) {
          CardService.update({ user: user, list: listID, card: cardID }, { text: vm.data.text }, function (response) {
            vm.changeCardText = false;
          });
        }
      }
      // console.log(vm.data)
    }
})();
