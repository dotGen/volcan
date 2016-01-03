(function (angular) {

  var app = angular.module("app");

  app.factory("ComplaintsService", [ "$http", "$q", function ($http, $q) {

      return {

        getAllComplaints : function () {

          var deferred = $q.defer()

          $http.get('/denuncias')
          .then(function (data) {
            return deferred.resolve(data.data);
          }, function (err) {
            return deferred.reject(err);
          });

          return deferred.promise;
        }

      };
  }]);

})(angular);
