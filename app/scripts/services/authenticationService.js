(function (angular) {

  var app =  angular.module("app");

  app.factory("AuthenticationService", ["$http", "$localStorage", "$log",  function ($http, $localStorage, $log) {

    function getUserFromToken () {
      if (typeof ($localStorage.token) !== 'undefined')  {
        var user = JSON.parse(urlBase64Decode($localStorage.token.split('.')[1]));
        user.authenticate = true;
        return user;
      } else {
        return {authenticate : false, name : "Anónimo"};
      }
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

    function signin (user_form, callback) {
        $http.post('/entrar', {email : user_form.email, password : encryptWithSHA512(user_form.password)}
        , {headers: {'Authorization': $localStorage.token}})
        .then(function (res) {
          if (res.data.success) {
            $localStorage.token = res.data.token;
            callback();
          }
        }, function () {
          $log.log("Failed to signin");
        });
    }

    function signup (user_form, callback) {
      $http.post('/registro', {email : user_form.email, name: user_form.name, password : encryptWithSHA512(user_form.password)}
      , { headers: {'Authorization': $localStorage.token}})
      .then(function (res) {
        if (res.data.success) {
          $localStorage.token = res.data.token;
          callback();
        }
      }, function () {
        $log.log("Failed to signup");
      });
    }

    function signout (callback) {
      $localStorage.$reset();
      callback();
    }

    function encryptWithSHA512 (str) {
      return CryptoJS.SHA512(str).toString();
    }


    return {
      signin : signin,
      signup : signup,
      signout : signout,
      getCurrentUser : getUserFromToken
    };

  }]);

})(angular);
