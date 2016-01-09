(function (angular) {

  var app =  angular.module("app");

  app.controller("AddComplaintController", ["$scope", "ComplaintsService", "NewComplaintFactory", "$log", "$mdToast", function ($scope, ComplaintsService, NewComplaintFactory, $log, $mdToast) {

    $scope.newComplaint = NewComplaintFactory.getNewComplaint();

    $scope.addComplaint = function () {
      ComplaintsService.addComplaint($scope.newComplaint.complaint)
      .then(function (addedComplaint) {
        NewComplaintFactory.setVisible(false);
        NewComplaintFactory.setEmpty();

        $mdToast.show(
          $mdToast.simple()
            .textContent('¡Denuncia añadida con éxito!')
            .hideDelay(3000)
        );

      }, function () {
        $log.log("Error al agregar la denuncia");
      });
    };

    $scope.hide = function () {
      NewComplaintFactory.setVisible(false);
    };

  }]);

})(angular);
