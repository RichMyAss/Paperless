'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'ngAnimate',
  'firebase'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sidebar', {templateUrl: 'partials/sidebar.html', controller: 'sidebar'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);

