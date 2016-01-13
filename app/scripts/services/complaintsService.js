(function (angular) {

  var app = angular.module("app");

  app.factory("ComplaintsService", [ "$http", "$q", "$log", "$localStorage", "Upload", "$timeout",function ($http, $q, $log, $localStorage, Upload, $timeout) {

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

          Upload.upload({
            url: '/denuncias/denunciar',
            data: {
              'photo': complaint.photo,
              'audio': complaint.audio,
              'latitude' : complaint.latitude,
              'longitude' : complaint.longitude,
              'description' : complaint.description
            },
            headers : {
              'x-access-token' : $localStorage.token,
              'Content-Type' : undefined
            }
          }).then(function (response) {
              $timeout(function () {
                complaints.list.push(response.data);
                deferred.resolve(response.data);
              });
          }, function (response) {
              deferred.reject(response);
              $log.log("Error al subir la denuncia");
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
