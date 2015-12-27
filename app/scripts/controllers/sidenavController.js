(function (angular) {
  var app = angular.module('app');
    app.controller('SideNavController', function($scope, $mdSidenav) {
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  });
})(angular);
