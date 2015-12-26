(function (angular) {
  var app =  angular.module("app");

  app.service("AuthenticationService", ["UserService", function (UserService) {

    this.authenticate = function (username, password) {
        UserService.getUserByUsername(username).then(function (user) {
            if (user != null && password == user.password) {
              console.log("Correcto");
            } else {
              console.log("Incorrecto");
            }
        });
    };

  }]);

})(angular);
