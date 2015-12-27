(function (angular) {

  var app =  angular.module("app");

  app.controller("RegisterController", ["$scope", "AuthenticationService", function ($scope, AuthenticationService) {

    $scope.new_user = {};

    $scope.register = function () {

    };

  }]);

})(angular);
