(function() {

'use strict';

  angular
    .module('trelloProject')
    .directive('changeBackground', changeBackground)

    changeBackground.$inject = ['$stateParams', 'UserService'];
    function changeBackground($stateParams, UserService) {
      var directive = {
        restrict: 'A',
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attrs) {
        var user = $stateParams.username;
        element.bind('click', clickHandler);

        function clickHandler(event) {
          UserService.background({ background: event.target.className, user: user }, function (response) {
            document.body.className = event.target.className;
          });
        }
      }
    }

}());
