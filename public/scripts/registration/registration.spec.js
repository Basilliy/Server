describe('RegistrationPageController', function() {
  var scope;

  beforeEach(function(){
    module('trelloProject');

    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      var localInjections = {
        $scope: scope,
      };
      $controller('RegistrationPageController as vm', localInjections);
    });
  });

  it('should expose title', function() {
    expect(scope.vm.greeting).toEqual('Hello world');
  });
});
