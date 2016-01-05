(function (angular) {

  var app = angular.module("app");

  app.factory("ComplaintsService", [ "$http", "$q", "$log", function ($http, $q, $log) {

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

          $http.post('/denuncias/denunciar', complaint)
          .then(function (data) {
            deferred.resolve(data.data);
          }, function (err) {
            deferred.reject(err);
          });

          return deferred.promise;
        },

        getComplaint : function (position) {
          var deferred = $q.defer();

          $http.get('/denuncias/'+position.latitude+','+position.longitude)
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
