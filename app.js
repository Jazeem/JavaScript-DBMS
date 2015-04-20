var JDBMS = angular.module('JDBMS',[]);


JDBMS.controller('MainCtrl',function($scope, $http){
	$http.get('database.json').success(function(data) {
    $scope.data = data;
    $scope.tupleToInsert;
  	});
	$scope.displayTable = function(table){
		$scope.selectedTable = table;
	}
	$scope.insertTuple = function(){
		var obj = JSON.parse($scope.tupleToInsert);
		$scope.selectedTable.data.push(obj);
	}
});