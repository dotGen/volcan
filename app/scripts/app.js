(function (angular) {

  var app = angular.module("app", ['ngMaterial', "uiGmapgoogle-maps", "ui.router"]);

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

      $urlRouterProvider.otherwise("map");

      $stateProvider
        .state('login', {
          url: "/login",
          templateUrl: "views/login.html"
        })
        .state('register', {
          url: "/register",
          templateUrl: "views/register.html"
        })
        .state('map', {
          url : "/map",
          templateUrl : "views/map.html"
        });

  });

})(angular);
