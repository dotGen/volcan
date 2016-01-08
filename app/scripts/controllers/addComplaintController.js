(function (angular) {

  var app =  angular.module("app");

  app.controller("AddComplaintController"
  , ["$scope", "ComplaintsService", "$log", function ($scope, ComplaintsService, $log) {

    $scope.new_complaint = {};
    $scope.addComplainForm = false;

    $scope.addComplaint = ComplaintsService.addComplaint($scope.new_complaint)
    .then(function (addedComplaint) {
      $scope.addComplainForm = false;
      $log.log("Denuncia añadida");
    }, function () {
      $log.log("Se ha producido un error al añadir la denuncia");
    });

  }]);

})(angular);
