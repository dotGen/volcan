(function (angular) {

  var app =  angular.module("app");

  app.controller("AppController", ["$scope", "UserService", "$mdSidenav", "GravatarService", "ComplaintsService", "$log", function ( $scope, UserService, $mdSidenav, GravatarService, ComplaintsService, $log) {

    $scope.user = UserService;

    $scope.complaints = ComplaintsService.getAllComplaints()
    .then(function (complaints) {
      $log.log("Denuncias cargadas");
      $scope.complaints = complaints;
    }, function (err) {
      $log.log("Error al cargar las denuncias");
    });

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
