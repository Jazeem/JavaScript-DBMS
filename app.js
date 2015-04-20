var JDBMS = angular.module('JDBMS',[]);


JDBMS.controller('MainCtrl',function($scope, $http){
	$http.get('database.json').success(function(data) {
    $scope.data = data;
  	});
	$scope.displayTable = function(table){
		$scope.selectedTable = table;
	}
});