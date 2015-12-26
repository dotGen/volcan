(function (angular) {
  angular.module("app").factory("UserService", [ "$http", function ($http) {

    return {

      createUser : function (user) {
        $http.post('', user)
        .then(function (res) {
            return res.data;
        }, function (err) {

        });
      },

      getAll : function () {
        $http.get('')
        .then(function (res) {
            return res.data;
        }, function (err) {

        });
      },

      getUserById : function (id) {
        $http.get(''+ id)
        .then(function (res) {
            return data.data;
        }, function (err) {

        });
      },


      getUserByUsername : function (username) {
        $http.get(''+ username)
          .then(function (res) {
            return res.data;
          }, function (err) {

          });
      },

      updateUser : function (id, user) {
        $http.put(''+id, user)
        .then(function (res) {
            return res.data;
        }, function (err) {

        });
      },

      deleteUser : function (id) {
        $http.delete(''+ id)
        .then(function (res) {
            return res.data;
        }, function (err) {

        });
      }

    };

  }]);
})(angular);
