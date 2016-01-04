(function (angular) {

  var app =  angular.module("app");

  app.controller("LoginController", ["$scope", "AuthenticationService", "$state", "$log", function ($scope, AuthenticationService, $state, $log) {

    $scope.user = {};
    $scope.errors = [];

    $scope.submit = function () {
        AuthenticationService.signin({email : $scope.user.email, password : $scope.user.password}).then(function () {
          $state.go("principal.mapa");
        }, function (err) {
          $log.log(err);
        });
    };

  }]);

})(angular);
