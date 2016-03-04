myApp.controller('CreateController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'inside Create Controller';
    console.log('cc');
    $scope.createdHero;
    $scope.alias = '';
    $scope.first_name = '';
    $scope.last_name = '';
    $scope.city = '';
    $scope.primary_power = '';
    $scope.added = false;
    $scope.addedPower = false;
    $scope.superpower = '';


    $scope.addsuperPower = function() {
        console.log($scope.superpower);
        var data = {superpower: $scope.superpower};
        $http.put('/updateHero/' + id, data).then(function(response) {
            console.log('response sent', response.data);
            $scope.updated = true;
        });
        $scope.addedPower = true;
    };



    $scope.addHeroPost = function() {
        var heroPost = {
            alias: $scope.alias,
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            city: $scope.city,
            primary_power: $scope.primary_power
        };

        $http.post('/addHero', heroPost).then(function(response) {
            $scope.createdHero = response.data;
            $scope.alias = '';
            $scope.first_name = '';
            $scope.last_name = '';
            $scope.city = '';
            $scope.primary_power = '';
        });
        $scope.added = true;
    };

}]);

//Assessment Note!
//Most of this controller is complete.  I was stuck on modeling the superpower from the <li> listings of each power .  Spent perhaps the final 20 minutes trying to figure out how to do that.