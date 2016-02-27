(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('MainPageController', MainPageController);

    MainPageController.$inject = ['$scope', '$state', '$window', 'UserService'];
    function MainPageController($scope, $state, $window, UserService) {
      var vm = this;
      vm.showDropdown = false;
      vm.closeDropdown = closeDropdown;
      vm.logout = logout;
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

      function logout() {
        delete $window.localStorage.token;
        delete $window.localStorage.user;
        $state.go('home');
      }
    }

})();
