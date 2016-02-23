(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('LoginPageController', LoginPageController);

    LoginPageController.$inject = ['TestService'];
    function LoginPageController(TestService) {
      var vm = this;

      vm.login = login;

      function login(validate) {
        TestService.save({}, { text: 'Im nigga, nigga' }, function (responce) {
          console.log(responce)
        });
        vm.submitted = true;

        if (validate) {
          console.log(vm.email)
          console.log(vm.password)
          // alert("well done");
        }
      }
    }
})();
