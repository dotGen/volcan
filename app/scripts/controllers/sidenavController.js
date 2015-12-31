(function (angular) {

  var app =  angular.module("app");

  app.controller("SideNavController", ["$scope", "$mdSidenav", function ($scope, $mdSidenav) {
    $scope.open = true;
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  }]);

})(angular);
