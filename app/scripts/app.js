(function (angular) {

  var app = angular.module("app", ["ngStorage","ngMaterial", "uiGmapgoogle-maps", "ui.router", "ngMessages"]);

  //Angular Google Maps configuration

  app.config(function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDJU4E6--Sj1P8hECcGSFMA_QasX5q9OgA',
      v: '3.20',
      libraries: 'weather, geometry, visualization'
    });
  });

  //Angular UI Router

  app.config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("principal");

      $stateProvider
        .state('entrar', {
          url: "/entrar",
          templateUrl: "views/entrar.html"
        })
        .state('registro', {
          url: "/registro",
          templateUrl: "views/registro.html"
        })
        .state('reenvio', {
          url : "/reenvio",
          templateUrl: "views/reenvio.html"

        })
        .state('principal', {
          url : "/",
          templateUrl : "views/principal.html"
        });

  });

})(angular);
