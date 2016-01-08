(function (angular) {

  var app =  angular.module("app");

  app.controller("RegisterController", ["$scope", "AuthenticationService", "$state", "$log", function ($scope, AuthenticationService, $state, $log) {

    $scope.new_user = {};

    $scope.submit = function () {
        AuthenticationService.signup($scope.new_user)
        .then(function (registeredUser) {
          UserService.updateUser({name : registeredUser.name , email : registeredUser.email , authenticate : true});
          $state.go("principal.mapa");
        }, function (err) {
          $log.log(err);
        });

    };

    $scope.submit_anonym = function () {
        $state.go("principal.mapa");
    };

  }]);

})(angular);
