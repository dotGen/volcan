(function (angular) {

  var app =  angular.module("app");

  app.controller("CurrentComplaintController", ["$scope","CurrentComplaintFactory", "$log", function ($scope, CurrentComplaintFactory, $log) {

    $scope.currentComplaint = CurrentComplaintFactory.getCurrentComplaint();

    $scope.hide = function () {
      CurrentComplaintFactory.setVisible(false);
    };

  }]);

})(angular);
