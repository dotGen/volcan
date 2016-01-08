(function (angular) {

  var app =  angular.module("app");

  app.controller("AddComplaintController", ["$scope", "ComplaintsService", "NewComplaintFactory", "$log", function ($scope, ComplaintsService, NewComplaintFactory, $log) {

    $scope.newComplaint = NewComplaintFactory.getNewComplaint();

    $scope.addComplaint = function () {
      ComplaintsService.addComplaint($scope.newComplaint.complaint)
      .then(function (addedComplaint) {
        NewComplaintFactory.setVisible(false);
        NewComplaintFactory.setEmpty();
      }, function () {
        $log.log("Error al agregar la denuncia");
      });
    };

    $scope.hide = function () {
      NewComplaintFactory.setVisible(false);
    };

  }]);

})(angular);
