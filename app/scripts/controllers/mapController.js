(function (angular) {

  angular.module("app").controller("mapController", ["$scope", function ($scope) {

    $scope.markers = [];
    $scope.map = {center : {longitude: -73 , latitude : 45}, zoom: 8}

  }]);

})(angular);
