//Jasmine tests

describe("Application Test", function () {

  describe("Map Controller", function () {

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

      it("should add a marker to the array", function () {
        scope.addMarker({coords: {latitude : 45, longitude : -73}, idKey : 0});
        expect(scope.markers.length).toBe(1);
      });

      it("should delete a marker from the array", function () {
        scope.addMarker({coords: {latitude : 45, longitude : -73}, idKey : 0});
        expect(scope.markers.length).toBe(1);
        scope.deleteMarker(0);
        expect(scope.markers.length).toBe(0);
      });

      it("should add some markers to the array", function () {
        scope.addMarker({coords: {latitude : 45, longitude : -73}, idKey : 0});
        scope.addMarker({coords: {latitude : 45, longitude : -73}, idKey : 1});
        scope.addMarker({coords: {latitude : 45, longitude : -73}, idKey : 2});
        scope.addMarker({coords: {latitude : 45, longitude : -73}, idKey : 3});
        expect(scope.markers.length).toBe(4);
      });

      it("should init a map variable", function () {
        expect(scope.map).toBeDefined();
        expect(scope.map.center.longitude).toBeDefined();
        expect(scope.map.center.latitude).toBeDefined();
        expect(scope.map.zoom).toBeDefined();
      });

  });

});
