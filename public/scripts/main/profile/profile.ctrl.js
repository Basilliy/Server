(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('ProfilePageController', ProfilePageController);

    ProfilePageController.$inject = ['ListService']
    function ProfilePageController(ListService) {
      var vm = this;

      ListService.get(function(responce) {
        vm.username = responce.name;
        vm.email = responce.email;
        vm.avatar = responce.avatar;
      });

    }

})();
