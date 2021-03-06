(function (angular) {

	var app =  angular.module("app");

	app.controller("MapController", ["$scope", "$mdDialog", "UserService","ComplaintsService", "CurrentComplaintFactory", "NewComplaintFactory", "$log", "geolocation", "uiGmapIsReady", function ($scope, $mdDialog, UserService, ComplaintsService, CurrentComplaintFactory, NewComplaintFactory, $log, geolocation,uiGmapIsReady) {

		$scope.mapOptions = {
			center : {
				latitude : 28.122461,
				longitude : -15.439805
			},
			zoom : 12
		};

		$scope.map = {};

		uiGmapIsReady.promise(1)
		.then(function(instances) {
			instances.forEach(function(inst) {
					$scope.map = inst.map;
					getCenter(function (position) {
						$scope.map.panTo(position);
					});
			});
		});

		function getCenter (callback) {
			geolocation.getLocation()
			.then(function(data){
					callback({lat:data.coords.latitude, lng:data.coords.longitude});
			}, function (err) {
					$log.log(err);
			});
		};

		$scope.$on('error', function (err) {
			$log.log(err);
		});

		ComplaintsService.getAllComplaints()
		.then(function (complaints) {
			$scope.complaints = complaints;
		}, function () {
			$log.log("Error al cargar las denuncias");
		});

		$scope.center = function () {
							$log.log("caca");
			getCenter(function (position) {
				$log.log(position);
				$scope.map.panTo(position);
			});
		};

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

				if (UserService.getUser().model.authenticate) {
					NewComplaintFactory.setEmpty();
					NewComplaintFactory.setVisible(true);
					NewComplaintFactory.setGpsPosition({latitude : args[0].latLng.G, longitude : args[0].latLng.K});
				} else {
					alert = $mdDialog.alert({
        		title: '¡Lo sentimos!',
        		textContent: 'Para poder añadir una denuncia se necesita registrarse',
        		ok: 'Cerrar'
      		});

      		$mdDialog.show( alert ).finally(function() {
          	alert = "Hola";
        	});
				}
			}
		};

	}]);

})(angular);
