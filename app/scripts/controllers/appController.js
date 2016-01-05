(function (angular) {

  var app =  angular.module("app");

  app.controller("AppController", ["$scope", "AuthenticationService", "$mdSidenav", "GravatarService", "ComplaintsService", "$log", function ( $scope, AuthenticationService, $mdSidenav, GravatarService, ComplaintsService, $log) {

    $scope.showSearch = false;
    $scope.addComplainForm = false;

    $scope.user = AuthenticationService.getCurrentUser();
    $scope.user.avatar = GravatarService.getAvatar($scope.user.email);

    $scope.newComplaint = {};

    ComplaintsService.getAllComplaints().then(function (complaints) {
      $scope.complaints = complaints;
    }, function (err) {
      $log.log("Error al cargar las denuncias");
    });

    $scope.addComplaint = function () {
        ComplaintsService.addComplaint($scope.newComplaint)
        .then(function (addedComplaint) {
          $log.log("Denuncia añadida");
          $scope.complaints.push(addedComplaint);
          $scope.addComplainForm = false;
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
