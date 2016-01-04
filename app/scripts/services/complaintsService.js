(function (angular) {

  var app = angular.module("app");

  app.factory("ComplaintsService", [ "$http", "$q", function ($http, $q) {

      return {

        getAllComplaints : function () {

          var deferred = $q.defer();

          $http.get('/denuncias')
          .then(function (data) {
            deferred.resolve(data.data);
          }, function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        },

        addComplaint : function (complaint) {
          var deferred = $q.defer();
          $http.post('/denuncias/añadir', complaint)
          .then(function (data) {
            deferred.resolve(data.data);
          }, function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        }

      };
  }]);

})(angular);
