(function (angular) {

  var app =  angular.module("app");

  app.controller("AppController", ["$scope", "AuthenticationService", "$mdSidenav", "GravatarService", "ComplaintsService", function ( $scope, AuthenticationService, $mdSidenav, GravatarService, ComplaintsService) {

    $scope.showSearch = false;

    $scope.user = AuthenticationService.getCurrentUser();

    $scope.complaints = ComplaintsService.getAllComplaints();

    $scope.currentComplaint = {};

    $scope.user.avatar = GravatarService.getAvatar($scope.user.email);

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
