(function (angular) {

  var app =  angular.module("app");

  app.controller("LoginController", ["$scope", "AuthenticationService", function ($scope, AuthenticationService) {

    $scope.user = {};

    $scope.submit = function () {
        AuthenticationService.signin({email : $scope.user.email, password : $scope.user.password});
        $scope.user = {};
    };

  }]);

})(angular);
