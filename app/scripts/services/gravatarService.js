(function (angular) {

  var app = angular.module("app");

  app.factory("GravatarService", ["$http", function ($http) {

    var url = "http://www.gravatar.com/avatar/";

    return {
        getAvatar : function (email) {
            return url+CryptoJS.MD5(email)+"?s=150&d=mm";
        }
    };

  }]);

})(angular);
