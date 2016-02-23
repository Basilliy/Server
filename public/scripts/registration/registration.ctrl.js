(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('RegistrationPageController', RegistrationPageController);

    RegistrationPageController.$inject = ["$state", "AuthService"];
    function RegistrationPageController($state, AuthService) {
      var vm = this;
      vm.registration = registration;

      function registration(validate) {
        vm.submitted = true;

        if (validate) {
          var userData = {
            username: signupVm.userName,
            email:    signupVm.userEmail,
            password: signupVm.userPassword
          }

          AuthService.save({}, userData, function (response) {
            $window.localStorage.token = response.token;
            $window.localStorage.user = signupVm.userName;
            $state.go('main.lists')
            // $state.go("main.interests", { username: signupVm.userName });
          }, function (error) {
            delete $window.localStorage.token;
            signupVm.message = error.data.message;
          });

        }
      }

    }
})();
