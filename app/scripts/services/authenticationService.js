(function (angular) {

  var app =  angular.module("app");

  app.factory("AuthenticationService", ["$http", "$localStorage", "$q", function ($http, $localStorage, $q) {

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
                throw 'Base64 decode error!';
        }
        return window.atob(output);
    }

    function encryptWithSHA512 (str) {
      return CryptoJS.SHA512(str).toString();
    }

    return {

      signin : function  (user_form) {
                    var deferred = $q.defer();
                    $http.post('/entrar', { email : user_form.email, password : encryptWithSHA512(user_form.password)})
                    .then(function (res) {
                        $localStorage.token = res.data.token;
                        deferred.resolve();
                    }, function (err) {
                      deferred.reject(err);
                    });
                    return deferred.promise;
                },

      signup : function  (user_form) {
                  var deferred = $q.defer();
                  $http.post('/registro', { email : user_form.email, name: user_form.name, password : encryptWithSHA512(user_form.password)})
                  .then(function (res) {
                      $localStorage.token = res.data.token;
                      deferred.resolve();
                  }, function (err) {
                    deferred.reject();
                  });
                  return deferred.promise;
                },

      signout : function (callback) {
                  $localStorage.$reset();
                  callback();
                },

      getCurrentUser : function  () {
                          if (typeof ($localStorage.token) !== 'undefined')  {
                            var user = JSON.parse(urlBase64Decode($localStorage.token.split('.')[1]));
                            user.authenticate = true;
                            return user;
                          } else {
                            return {authenticate : false, name : "Anónimo"};
                          }
                        }
    };

  }]);

})(angular);
