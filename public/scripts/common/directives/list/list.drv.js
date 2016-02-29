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

    listController.$inject = ['$scope', '$stateParams', 'ListService', 'CardService'];
    function listController($scope, $stateParams, ListService, CardService) {
      var vm = this;
      var user = $stateParams.username;
      var listID = vm.data._id;

      var previousText; // for saving

      vm.visibleNewCard = false;
      vm.saveNewTitle = saveNewTitle;
      vm.closeDropdown = closeDropdown;
      vm.createNewCard = createNewCard;
      vm.showNewCardInput = showNewCardInput;
      vm.removeList = removeList;
      vm.cancelEditTitle = cancelEditTitle;
      vm.reloadCard = reloadCard;

      // watch start edit text or not
      $scope.$watch('vm.visibleEditTitle', function(val) {
        if (val === true) {
          previousText = vm.data.title;
        }
      })

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

      function saveNewTitle(validate) {
        if (validate) {
          ListService.update({ user: user, id: listID }, { title: vm.data.title }, function(response) {
            vm.visibleEditTitle = false;
          })
        }
      }

      function cancelEditTitle() {
        vm.visibleEditTitle = false;
        vm.data.title = previousText;
      }

      function reloadCard() {
        CardService.get({ user: user, list: listID }, function(responce) {
          vm.data.cards = responce.cards;
        });
      }
    }
})();
