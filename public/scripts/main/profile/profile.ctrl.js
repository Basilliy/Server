(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('ProfilePageController', ProfilePageController);

    ProfilePageController.$inject = ['$scope', '$window', 'UserService']
    function ProfilePageController($scope, $window, UserService) {
      var vm = this;
      vm.updateData = updateData;

      activate();

      function activate() {
        UserService.get({}, function(responce) {
          vm.username = responce.user.name;
          vm.email = responce.user.email;
          vm.avatar = responce.user.avatar;
        });
      }

      function updateData(validate) {

        if (validate) {
          var body = {
            name: vm.username,
            email: vm.email
          };

          UserService.update({}, body, function (response) {
            vm.messageDone = response.message;
            $window.localStorage.user = vm.username;
            $scope.$emit('reloadUserData');
          }, function (error) {
            vm.messageError = error.data.message;
          });
        }
      }
    }

})();
