(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('ListsPageController', ListsPageController);

    ListsPageController.$inject = ["$scope", "ListService"];
    function ListsPageController($scope, ListService) {
      var vm = this;
      vm.visibleNewList = false;
      vm.createNewList = createNewList;
      vm.setVisibleNewList = setVisibleNewList;
      vm.removeList = removeList;

      $scope.listOptions = {
        accept: function(sourceNodeScope, destNodesScope, destIndex) {
          var list = sourceNodeScope.$element.hasClass("list__wrapper");
          var listPlaceholder = destNodesScope.$element.hasClass("list__placeholder");
          var card = sourceNodeScope.$element.hasClass("list__card");
          var cardPlaceholder = destNodesScope.$element.hasClass("card__placeholder");

          if (list === listPlaceholder) {
            return true;
          } if (card === cardPlaceholder) {
            return true;
          }
        }
      }

      // $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
      //   // $scope.$broadcast('content.reload');
      //   // $scope.$broadcast('content.changed');
      // });

      ListService.get(function(responce) {
        vm.lists = responce.lists;
        setResizeScroll();
      });

      function createNewList() {
        if (vm.newListTitle) {
          var newList = {
            title: vm.newListTitle,
            cards: []
          }

          vm.lists.push(newList);
          vm.focusOn = true;
          vm.newListTitle = null;
          setResizeScroll();
        }
      }

      function setVisibleNewList() {
        vm.visibleNewList = true;
        vm.focusOn = true;
      }

      function removeList(title) {
        vm.lists = vm.lists.filter(function(i) {
          return i.title !== title;
        });
      }

      function setResizeScroll() {
        var widthAllElemet = (vm.lists.length + 1) * 290;
        document.querySelector('.lists__wrapper').style.width = widthAllElemet + 'px';
        $scope.$broadcast('content.changed');
      }
    }
})();
