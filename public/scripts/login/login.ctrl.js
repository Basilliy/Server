(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('LoginPageController', LoginPageController);

    LoginPageController.$inject = ["$window", "$state", "AuthService"];
    function LoginPageController($window, $state, AuthService) {
      var vm = this;

      vm.login = login;
      vm.clearMessageError = clearMessageError;

      function login(validate) {
        vm.submitted = true;

        if (validate) {
          var userData = {
            email: vm.email,
            password: vm.password
          };

          AuthService.login({}, userData, function (response) {
            $window.localStorage.token = response.token;
            $window.localStorage.user = response.user;
            $state.go('main.lists', { username: response.user });

          }, function (error) {
            delete $window.localStorage.token;
            vm.message = error.data.message;
          });
        }
      }

      function clearMessageError() {
        vm.message = null;
      }
    }
})();
