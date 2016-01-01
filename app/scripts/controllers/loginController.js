(function (angular) {

  var app =  angular.module("app");

  app.controller("LoginController", ["$scope", "AuthenticationService", "$state", function ($scope, AuthenticationService, $state) {

    $scope.user = {};

    $scope.submit = function () {
        AuthenticationService.signin({email : $scope.user.email, password : $scope.user.password}, function () {
          $state.go("principal");
        });
        $scope.user = {};
    };

  }]);

})(angular);
