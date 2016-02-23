(function() {
  'use strict';

  angular
    .module('trelloProject')
    .controller('MainPageController', MainPageController);

    function MainPageController() {
      var vm = this;
      vm.showDropdown = false;
      vm.closeDropdown = closeDropdown;

      function closeDropdown() {
        vm.showDropdown = false;
      }
    }

})();
