(function (angular) {

  var app =  angular.module("app");

  app.controller("LogoutController", ["$scope", "AuthenticationService", "$state", function ($scope, AuthenticationService, $state) {

    $scope.submit = function () {
        AuthenticationService.signout(function () {
          $state.go("entrar");
        });
    };

  }]);

})(angular);
