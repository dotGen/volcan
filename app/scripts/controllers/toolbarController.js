(function (angular) {

  var app =  angular.module("app");

  app.controller("ToolbarController", ["$scope", "$mdSidenav", "UserService", function ($scope, $mdSidenav, UserService) {

    $scope.user =  UserService.getUser();

    $scope.openLeftMenu = function () {
        $mdSidenav('left').toggle();
    };

  }]);

})(angular);
