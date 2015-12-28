(function (angular) {

  var app =  angular.module("app");

  app.service("AuthenticationService", ["$http", "$localStorage", "$log",  function ($http, $localStorage, $log) {

    this.signin = function (user_form) {
        $http.post('/signin', user_form)
        .then(function (res) {
          $localStorage.token = res.data.token;
          $log.log("Success to singin : token : "+ $localStorage.token);
        }, function () {
          $log.log("Failed to signin");
        });
    };

    this.signup = function (user_form) {
      $http.post('/signup', user_form)
      .then(function (res) {
        $localStorage.token = res.data.token;
        $log.log("Success to singup : token : "+ $localStorage.token);
      }, function () {
        $log.log("Failed to signup");
      });
    };

  }]);

})(angular);
