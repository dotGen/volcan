//Testing mapController

describe("MapController", function () {

  var scope, controller;

  beforeEach(function () {
    angular.mock.module("app");
  });

  beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller("mapController", {
        $scope : scope
      });
  }));

  it("should declare empty marker array ", function () {
    expect(scope.markers.length).toBe(0);
  });

});
