(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('ListsPageController', ListsPageController);

    ListsPageController.$inject = ["$scope", "$window", "ListService"];
    function ListsPageController($scope, $window, ListService) {
      var vm = this;
      console.log($window)
      vm.visibleNewList = false;
      vm.createNewList = createNewList;
      vm.setVisibleNewList = setVisibleNewList;
      vm.removeList = removeList;

      activate();

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


      function activate() {
        ListService.get({ user: 'Eugene' }, function(responce) {
          vm.lists = responce.lists;
          setResizeScroll();
        });
      }

      function createNewList() {
        if (vm.newListTitle) {

          ListService.save({ title: vm.newListTitle }, function (response) {
            vm.lists = response.lists;

            vm.focusOn = true;
            vm.newListTitle = null;
            setResizeScroll();
          });
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
