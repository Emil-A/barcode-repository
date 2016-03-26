var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function() {
	    $http.get('/grocerylist').success(function(response) {
	    	console.log("Got grocerylist stuff :)");
	    	$scope.grocerylist = response;
	    	$scope.food = "";
	    });
	};
	refresh();

    $http.get('/storage').success(function(response) {
    	console.log("Got storage stuff :)");
    	$scope.storage = response;
    });

    $scope.addFood = function() {
    	console.log($scope.food);
    	$http.post('/grocerylist', $scope.food).success(function(response) {
    		console.log(response);
    		refresh();
    	});
    };

    $scope.removeFood = function(id) {
    	console.log(id);
    	$http.delete('/grocerylist/' + id).success(function(response) {
    		refresh();
    	});
    }
}]);

