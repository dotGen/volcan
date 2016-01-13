(function (angular) {

  var app =  angular.module("app");

  app.controller("ProfileController", ["$scope", "UserService", function ($scope, UserService) {

    $scope.user = UserService.getUser();

  }]);

})(angular);
