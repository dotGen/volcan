(function (angular) {

  var app =  angular.module("app");

  app.controller("RegisterController", ["$scope", "AuthenticationService", function ($scope, AuthenticationService) {

    $scope.new_user = {};

    $scope.submit = function () {
        AuthenticationService.signup($scope.new_user);
        $scope.new_user = {};
    };

  }]);

})(angular);
