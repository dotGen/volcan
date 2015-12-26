(function (angular) {

  var app =  angular.module("app");

  app.controller("RegisterController", ["$scope", "AuthenticationService", function ($scope, AuthenticationService) {

    var new_user = {};

    $scope.register = function () {
        console.log("asdasd");
    };

  }]);

})(angular);
