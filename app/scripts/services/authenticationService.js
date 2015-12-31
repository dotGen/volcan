(function (angular) {

  var app =  angular.module("app");

  app.factory("AuthenticationService", ["$http", "$localStorage", "$log", function ($http, $localStorage, $log) {

    function getUserFromToken () {
      return (typeof ($localStorage.token) !== 'undefined') ? JSON.parse(urlBase64Decode(token.split('.')[1])) : {};
    }

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function signin (user_form) {
        $http.post('/entrar', {email : user_form.email, password : encryptWithSHA512(user_form.password)}
        , {headers: {'Authorization': $localStorage.token}})
        .then(function (res) {
          $localStorage.token = res.data.token;
          $log.log("Success to singin : token : "+ $localStorage.token);
        }, function () {
          $log.log("Failed to signin");
        });
    }

    function signup (user_form) {
      $http.post('/registro', {email : user_form.email, name: user_form.name, password : encryptWithSHA512(user_form.password)}
      , { headers: {'Authorization': $localStorage.token}})
      .then(function (res) {
        $localStorage.token = res.data.token;
        $log.log("Success to signup : token : "+ $localStorage.token);
      }, function () {
        $log.log("Failed to signup");
      });
    }

    function signout (callback) {
      $localStorage.removeItem(token);
      $log.log("Success signout");
      callback();
    }

    function encryptWithSHA512 (str) {
      return CryptoJS.SHA512(str);
    }


    return {
      signin : signin,
      signup : signup,
      signout : signout,
      getCurrentUser : getUserFromToken
    };

  }]);

})(angular);
