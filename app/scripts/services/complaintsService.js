(function (angular) {

  var app = angular.module("app");

  app.factory("ComplaintsService", [ "$http", "$q", "$log", "$localStorage", function ($http, $q, $log, $localStorage) {

      var complaints = {
        list : []
      };

      complaints.getAllComplaints = function () {
        var deferred = $q.defer();

        $http.get('/denuncias')
        .then(function (data) {
          complaints.list = data.data;
          deferred.resolve(data.data);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      };

      complaints.addComplaint = function (complaint) {
        var deferred = $q.defer();

        $http.post('/denuncias/denunciar', complaint, {headers: {
    'x-access-token': $localStorage.token}
    })
        .then(function (data) {
          complaints.list.push(data.data);
          deferred.resolve(data.data);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      };

      complaints.getComplaint = function (position) {
        var deferred = $q.defer();

        $http.get('/denuncias/'+position.latitude+','+position.longitude)
        .then(function (data) {
            deferred.resolve(data.data);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
      };

      return complaints;

  }]);

})(angular);
