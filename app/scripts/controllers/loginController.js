(function (angular) {

  var app =  angular.module("app");

  app.controller("LoginController", ["$scope", "AuthenticationService", "$state", "$log", "UserService", function ($scope, AuthenticationService, $state, $log, UserService) {

    $scope.user = UserService.getUser();

    $scope.submit = function () {
        AuthenticationService.signin({email : $scope.user.model.email, password : $scope.user.model.password})
        .then(function (loggedUser) {
          UserService.updateUser({name : loggedUser.name , email : loggedUser.email , authenticate : true});
          $state.go("principal.mapa");
        }, function (err) {
          $log.log(err);
        });
    };

  }]);

})(angular);
