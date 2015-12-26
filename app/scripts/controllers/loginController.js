(function (angular) {
  var app =  angular.module("app");

  app.controller("LoginController", ["$scope", "AuthenticationService", function ($scope, AuthenticationService) {

    var user;

    $scope.login = function (username, password) {
        AuthenticationService.authenticate(username, password);
    };

  }]);

})(angular);
