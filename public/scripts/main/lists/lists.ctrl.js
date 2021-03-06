(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('ListsPageController', ListsPageController);

    ListsPageController.$inject = ["$scope", "$state", "$stateParams", "ListService"];
    function ListsPageController($scope, $state, $stateParams, ListService) {
      var vm = this;
      var user = $stateParams.username;
      vm.visibleNewList = false;
      vm.createNewList = createNewList;
      vm.setVisibleNewList = setVisibleNewList;
      vm.reloadLists = reloadLists;
      vm.setFilterColor = setFilterColor;

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
        },
        dropped: function() {
          ListService.sort({ user: user }, {lists: vm.lists}, function(responce) {
          });
        }
      }

      // $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
      //   // $scope.$broadcast('content.reload');
      //   // $scope.$broadcast('content.changed');
      // });

      function activate() {
        if(user) {
          ListService.get({ user: user }, function(responce) {
            vm.lists = responce.lists;
            document.body.className = responce.background;
            setResizeScroll();
          });
        } else {
          $state.go('notfound')
        }
      }

      function setFilterColor(event) {
        var dataColor = event.target.dataset.color;
        if (dataColor === vm.filterColor) {
          vm.filterColor = null;
        } else {
          vm.filterColor = event.target.dataset.color;
        }

      }

      function createNewList() {
        if (vm.newListTitle) {

          ListService.save({ user: user }, { title: vm.newListTitle }, function (response) {
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

      function reloadLists() {
        ListService.get({ user: user }, function(responce) {
          vm.lists = responce.lists;
          setResizeScroll();
        });
      }

      function setResizeScroll() {
        var widthAllElemet = (vm.lists.length + 1) * 290;
        document.querySelector('.lists__wrapper').style.width = widthAllElemet + 'px';
        $scope.$broadcast('content.changed');
      }
    }
})();
