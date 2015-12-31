(function (angular) {

  var app =  angular.module("app");

  app.controller("AppController", ["$scope", "AuthenticationService", function ($scope, AuthenticationService) {

    $scope.user = AuthenticationService.getCurrentUser();

    $scope.isLogin = function () {
        return $scope.user.name != undefined;
    };

  }]);

})(angular);
