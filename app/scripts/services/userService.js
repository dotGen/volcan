(function (angular) {

  var app = angular.module("app");

  app.factory("UserService", [ "$http", "AuthenticationService", function ($http, AuthenticationService) {

    var user = AuthenticationService.getCurrentUser();

    user.updateUser = function (id, user) {
        $http.put(''+id, user)
        .then(function (res) {
            return res.data;
        }, function (err) {

        });
    };

    return user;

  }]);
})(angular);
