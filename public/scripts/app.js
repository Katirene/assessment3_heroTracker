var myApp = angular.module("myApp", ['ngRoute']);
console.log('are we in app.js?');

myApp.config(['$routeProvider', function($routeProvider) {
    console.log('here');
    $routeProvider
        .when('/createHero', {
            templateUrl: '/views/templates/createHero.html',
            controller: 'CreateController'
        })
        .when('/heroListing', {
            templateUrl: '/views/templates/listPosts.html',
            controller: 'ListPostsController'
        })
        .otherwise({
            redirectTo: '/createPost'
        });
}]);