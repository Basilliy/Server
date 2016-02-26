(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('MainPageController', MainPageController);

    MainPageController.$inject = ['$scope', '$window', 'UserService'];
    function MainPageController($scope, $window, UserService) {
      var vm = this;
      vm.showDropdown = false;
      vm.closeDropdown = closeDropdown;
      $scope.$on('reloadUserData', activate);

      activate();

      function activate() {
        UserService.get({}, function(responce) {
          vm.avatar = responce.user.avatar;
          vm.name = responce.user.name;
        });
      }

      function closeDropdown() {
        vm.showDropdown = false;
      }
    }

})();
