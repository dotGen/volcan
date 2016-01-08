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

      $urlRouterProvider.otherwise("/principal/mapa");

      $stateProvider
        .state('entrar', {
          url: "/entrar",
          controller : "LoginController",
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
          abstract : true,
          url : '/principal',
          templateUrl : 'views/principal.html'
        })
        .state('principal.mapa', {
          url :  "/mapa",
          templateUrl : "views/principal.mapa.html"
        })
        .state('principal.perfil', {
          url: "/perfil",
          templateUrl : "views/principal.perfil.html"
        });

  });

})(angular);
