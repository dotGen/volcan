(function (angular) {

  var app =  angular.module("app");

  app.controller("AppController", ["$scope", "AuthenticationService", "$mdSidenav", "GravatarService", "ComplaintsService", "$log", function ( $scope, AuthenticationService, $mdSidenav, GravatarService, ComplaintsService, $log) {

    $scope.showSearch = false;

    $scope.user = AuthenticationService.getCurrentUser();
    $scope.user.avatar = GravatarService.getAvatar($scope.user.email);

    ComplaintsService.getAllComplaints().then(function (complaints) {
      $scope.complaints = complaints;
      $log.log(complaints[0]);
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
