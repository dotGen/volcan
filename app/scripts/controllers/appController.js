(function (angular) {

  var app =  angular.module("app");

  app.controller("AppController", ["$scope", "AuthenticationService", "$mdSidenav", "GravatarService", "ComplaintsService", "$log", function ( $scope, AuthenticationService, $mdSidenav, GravatarService, ComplaintsService, $log) {

    $scope.showSearch = false;
    $scope.addComplainForm = false;

    $scope.user = AuthenticationService.getCurrentUser();
    $scope.user.avatar = GravatarService.getAvatar($scope.user.email);


    ComplaintsService.getAllComplaints().then(function (complaints) {
      $scope.complaints = complaints;
    }, function (err) {
      $log.log("Error al cargar las denuncias");
    });

    $scope.marker_events = {
      click :  function (marker, event, model, args) {
        $scope.currentComplaint = {description : "latitude : "+marker.getPosition().G+" longitude: "+marker.getPosition().K};
        $scope.$apply();
      }
    };

    $scope.map_events = {

      click : function (map, event, args) {
        $scope.addComplainForm = true;
        $scope.$apply();
        $scope.newComplaint.latitude =  args[0].latLng.G;
        $scope.newComplaint.longitude =  args[0].latLng.K;
      }

    };

    $scope.addComplaint = function () {
        ComplaintsService.addComplaint($scope.newComplaint)
        .then(function (addedComplaint) {
          $log.log("Denuncia añadida");
        }, function () {
          $log.log("Se ha producido un error al añadir la denuncia");
        });
    };

    $scope.isLogin = function () {
        return $scope.user.authenticate == true;
    };

    $scope.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };

    $scope.isFocusOnComplaint = function () {
      return !_.isEmpty($scope.currentComplaint);
    };

  }]);

})(angular);
