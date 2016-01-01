(function (angular) {

  var app =  angular.module("app");

  app.controller("RegisterController", ["$scope", "AuthenticationService", "$state", function ($scope, AuthenticationService, $state) {

    $scope.new_user = {};

    $scope.submit = function () {
        AuthenticationService.signup($scope.new_user, function () {
          $state.go("principal");
        });
        $scope.new_user = {};
    };

    $scope.submit_anonym = function () {
        $state.go("principal");
    };

  }]);

})(angular);
