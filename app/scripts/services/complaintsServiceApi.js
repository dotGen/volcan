(function (angular) {
  angular.module("app").service("ComplaintsServiceApi", function () {

      this.createComplaint = function (complaint) {
          //HTTP POST para insertar complaint.
      };

      this.getAllComplaints = function () {
          //HTTP GET para obtener todos los complaints.
      };

      this.deleteComplaint = function (id) {
          //HTTP DELETE para eliminar un complaint con id.
      };

      this.updateComplaint = function (id, complaint) {
          //HTTP PUT para modificar una denuncia.
      };
  });
})(angular);
