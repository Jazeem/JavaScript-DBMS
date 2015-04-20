var JDBMS = angular.module('JDBMS',[]);

JDBMS.controller('MainCtrl',function($scope, $http){
	$http.get('database.json').success(function(data) {
    $scope.data = data;
    $scope.displayFlag = true;
  	});
	$scope.displayTable = function(table){
		$scope.selectedTable = table;
	}
	$scope.shouldDisplay = function(row){
		var obj = JSON.parse($scope.constraintText);
		var retval = true;
		for (var i = obj.length - 1; i >= 0; i--) {
			if(obj[i][1] === 'equals'){
				if(!(row[obj[i][0]] === obj[i][2]))
					retval = false;				
			}
			else if(obj[i][1] === 'greater'){
				if(!(row[obj[i][0]] > obj[i][2]))
					retval = false;				
			}
			else{
				if(!(row[obj[i][0]] < obj[i][2]))
					retval = false;				
			}		
		}
		return retval;
		
	}
	$scope.applyConstraint = function(constraint){
		$scope.constraintText = constraint;
	}
});