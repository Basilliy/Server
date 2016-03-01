(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('ProfilePageController', ProfilePageController);

    ProfilePageController.$inject = ['$scope', '$window', 'UserService']
    function ProfilePageController($scope, $window, UserService) {
      var vm = this;
      vm.updateData = updateData;
      vm.changeAvatar = changeAvatar;
      vm.savePassword = savePassword;

      activate();

      function activate() {
        UserService.get({}, function(responce) {
          vm.username = responce.user.name;
          vm.email = responce.user.email;
          vm.avatar = responce.user.avatar;
        });
      }

      function updateData(validate) {
        vm.messageDone = null;
        vm.messageError = null;

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

      function changeAvatar(image) {
        var reader;
        vm.messageError = null;
        vm.messageDone = null;


        if (image.type.localeCompare("image/jpeg") !== 0 && image.type.localeCompare("image/png") !== 0) {
          vm.messageError = 'Image file format must be jpeg or png!';
        }

        reader = new FileReader();
        reader.onload = function (event) {
          UserService.avatar({}, { avatar: event.target.result }, function (response) {
            vm.messageDone = 'Avatar has been updated';
            vm.avatar = response.avatar;
            $scope.$emit('reloadUserData');
          });
        }
        reader.readAsDataURL(image);
      }

      function savePassword(validation) {
        vm.submitted = true;
        vm.errorConfirmPass = null;
        vm.messagePass = null;
        vm.messagePassDone = null;
        var body = {};
        if(validation) {
          if (vm.newPass === vm.newPassConfirm) {
            body = {
              oldPass: vm.oldPass,
              newPass: vm.newPassConfirm
            }

            UserService.save({}, body, function (response) {
              vm.messagePassDone = response.message;
            }, function (error) {
              vm.messagePass = error.data.message;
            });
          } else {
            vm.errorConfirmPass = true;
          }
        }
      }
    }

})();
