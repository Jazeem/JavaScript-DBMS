var JDBMS = angular.module('JDBMS',[]);

JDBMS.controller('MainCtrl',function($scope, $http){
	$http.get('database.json').success(function(data) {
    $scope.data = data;

    $scope.tupleToInsert;

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
	$scope.insertTuple = function(){
		var obj = JSON.parse($scope.tupleToInsert);
		$scope.selectedTable.data.push(obj);
		console.log($scope.selectedTable);
	}

	$scope.addTable = function(){
		var queryFinal = '{'+$scope.tableQuery+',"data": []}';
		//console.log(queryFinal);
		var obj = JSON.parse(queryFinal);
		$scope.data.push(obj);
		$scope.tableQuery='';
	}

	$scope.dropTable = function(){
		var tableName = $scope.selectedTable.name;
		for (var i = $scope.data.length - 1; i >= 0; i--) {
			if($scope.data[i] == $scope.selectedTable)
				break;
		}
		$scope.data.splice(i, 1);
		var i, j;
		for (i = $scope.data.length - 1; i >= 0; i--) {
			for (j = $scope.data[i].schema.length - 1; j >= 0; j--) {
				if($scope.data[i].schema[j].hasOwnProperty('foreign_key') && $scope.data[i].schema[j].foreign_key === tableName)
					break;
			}
			if(j >= 0){
				$scope.data[i].schema.splice(j, 1);
				for (var k = 0; k < $scope.data[i].data.length; k++) {
					$scope.data[i].data[k].splice(j, 1);	
				}
			}			
		}
		$scope.selectedTable = '';
	}
});