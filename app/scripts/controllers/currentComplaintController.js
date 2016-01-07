(function (angular) {

  var app =  angular.module("app");

  app.controller("CurrentComplaintController",
  ["$scope","ComplaintsService", "$log", function ($scope, ComplaintsService, $log) {

    $scope.currentComplaint = ComplaintsService;

  }]);

})(angular);
