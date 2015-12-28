(function (angular) {

  var app =  angular.module("app");

  app.controller("RegisterController", ["$scope", "AuthenticationService", function ($scope, AuthenticationService) {

    $scope.new_user = {};

    $scope.submit = function () {
        AuthenticationService.signin({ email : $scope.new_user.email, password : $scope.new_user.password});
        $scope.new_user = {};
    };

  }]);

})(angular);
