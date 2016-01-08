(function (angular) {

  var app = angular.module("app");

  app.factory("UserService", [ "$http", "$log", "AuthenticationService", function ($http, $log, AuthenticationService) {

    var user = {
      model : AuthenticationService.getEncryptedUserFromToken()
    };

    return {

      getUser : function () {
        return user;
      },

      updateUser : function (updated_user) {
        user.model = updated_user;
      }

    };

  }]);
})(angular);
