(function (angular) {

  var app =  angular.module("app");

  app.controller("LogoutController", ["$scope", "AuthenticationService", "$state", "UserService", function ($scope, AuthenticationService, $state, UserService) {

    $scope.submit = function () {
        AuthenticationService.signout(function () {
          $state.go("entrar");
        });
    };

  }]);

})(angular);
