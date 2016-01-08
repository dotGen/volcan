(function (angular) {

  var app =  angular.module("app");

  app.controller("MapController", ["$scope", "ComplaintsService", "CurrentComplaintFactory", "NewComplaintFactory", "$log", function ($scope, ComplaintsService, CurrentComplaintFactory, NewComplaintFactory, $log) {

    ComplaintsService.getAllComplaints()
    .then(function (complaints) {
      $scope.complaints = complaints;
    }, function () {
      $log.log("Error al cargar las denuncias");
    });

    $scope.marker_events = {
      click :  function (marker, event, model, args) {
        ComplaintsService.getComplaint({latitude: marker.position.K, longitude : marker.position.G})
        .then(function (complaint) {

          CurrentComplaintFactory.setVisible(true);
          CurrentComplaintFactory.updateCurrentComplaint(complaint);

          marker.getMap().panTo({lat: marker.position.G, lng: marker.position.K});

        }, function () {
          $log.log("Se ha producido un error al cargar la denuncia");
        });

      }
    };

    $scope.map_events = {
      click : function (map, event, args) {

        map.panTo({lat: args[0].latLng.G, lng: args[0].latLng.K});

        CurrentComplaintFactory.setVisible(false);

        NewComplaintFactory.setEmpty();

        NewComplaintFactory.setVisible(true);

        //NewComplaintFactory.setAuthor({author : });
        NewComplaintFactory.setGpsPosition({latitude : args[0].latLng.G, longitude : args[0].latLng.K});

      }
    };

  }]);

})(angular);
