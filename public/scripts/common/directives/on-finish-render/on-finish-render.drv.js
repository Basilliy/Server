(function() {

'use strict';

  angular
    .module('trelloProject')
    .directive('onFinishRender', onFinishRender)

    onFinishRender.$inject = ['$timeout'];
    function onFinishRender($timeout) {
      var directive = {
        restrict: 'A',
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attrs) {
        if (scope.$last === true) {
          $timeout(function () {
            scope.$emit('ngRepeatFinished');
          });
        }
      }
    }

}());
