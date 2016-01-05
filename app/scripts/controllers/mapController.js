(function (angular) {

  var app =  angular.module("app");

  app.controller("MapController", ["$scope", "$rootScope", "ComplaintsService", "$log", function ($scope, $rootScope, ComplaintsService, $log) {

    $scope.marker_events = {
      click :  function (marker, event, model, args) {
        ComplaintsService.getComplaint({latitude: marker.position.K, longitude : marker.position.G})
        .then(function (complaint) {
          marker.getMap().panTo({lat: marker.position.G, lng: marker.position.K});
          $rootScope.currentComplaint = complaint;
        }, function () {
          $log.log("Se ha producido un error al cargar la denuncia");
        });
        $scope.$apply();
      }
    };

    $scope.map_events = {
      click : function (map, event, args) {
        $scope.addComplainForm = true;
        map.panTo({lat: args[0].latLng.G, lng: args[0].latLng.K});
        $rootScope.newComplaint.latitude =  args[0].latLng.G;
        $rootScope.newComplaint.longitude =  args[0].latLng.K;
        $scope.$apply(function () {
          $log.log("caca");
        });
      }
    };

  }]);

})(angular);
