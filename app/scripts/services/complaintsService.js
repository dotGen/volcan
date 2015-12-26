(function (angular) {
  angular.module("app").factory("ComplaintsService", [ "$http", function ($http) {

      return {

        createComplaint : function (complaint) {
            $http.post('', complaint)
            .then(function (data) {

            }, function (err) {

            });
        },

        getAllComplaints : function () {
          $http.get('')
          .then(function (data) {

          }, function (err) {

          });
        },

        deleteComplaint : function (id) {
          $http.delete(''+ id)
          .then(function (data) {

          }, function (err) {

          });
        },

        updateComplaint : function (id, complaint) {
          $http.put(''+ id, complaint)
          .then(function (data) {

          }, function (err) {

          });
        }

      };
  }]);

})(angular);
