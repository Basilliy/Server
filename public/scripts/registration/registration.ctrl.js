(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('RegistrationPageController', RegistrationPageController);

    RegistrationPageController.$inject = ["$window", "$state", "AuthService"];
    function RegistrationPageController($window, $state, AuthService) {
      var vm = this;
      vm.registration = registration;

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
            $window.localStorage.user = vm.user;
            $state.go('main.lists');
            // $state.go("main.interests", { username: signupVm.userName });
          }, function (error) {
            delete $window.localStorage.token;
            signupVm.message = error.data.message;
          });

        }
      }

    }
})();
