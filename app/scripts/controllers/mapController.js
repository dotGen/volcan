(function (angular) {

  var app = angular.module("app");

  app.controller("MapController", ["$scope", function ($scope) {

      $scope.loaded=false;
      $scope.markers = [];
      $scope.map = {center : {longitude: -73 , latitude : 45}, zoom: 8};

  }]);

})(angular);
