(function (angular) {

  var app = angular.module("app");

  app.factory("ComplaintsService", [ "$http", function ($http) {

      return {

        getAllComplaints : function () {
          $http.get('/denuncias')
          .then(function (data) {
            return data;
          }, function (err) {
            return err;
          });
        }

      };
  }]);

})(angular);
