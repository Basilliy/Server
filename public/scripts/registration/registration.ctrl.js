(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('RegistrationPageController', RegistrationPageController);

    RegistrationPageController.$inject = ["$window", "$state", "AuthService"];
    function RegistrationPageController($window, $state, AuthService) {
      var vm = this;
      vm.registration = registration;
      vm.clearMessageError = clearMessageError;

      function registration(validate) {
        vm.submitted = true;

        if (validate) {
          var userData = {
            username: vm.name,
            email:    vm.email,
            password: vm.password
          }

          AuthService.save({}, userData, function (response) {
            $window.localStorage.token = response.token;
            $window.localStorage.user = vm.name;
            $state.go("main.lists", { username: vm.name });

          }, function (error) {
            delete $window.localStorage.token;
            vm.message = error.data.message;
          });

        }
      }

      function clearMessageError() {
        if (vm.message) {
          vm.message = null;
        }
      }

    }
})();
