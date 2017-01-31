var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', 'MainSvc', function ($scope, MainSvc) {
	
	function init(){
		MainSvc.GetStudent()
		.then(function(response){
			$scope.students = response.data;
		});
	}

	$scope.NewStudent = function(student_id, firstname, lastname, info){
		MainSvc.AddStudent(student_id, firstname, lastname, info)
		.then(function(response){
			console.log(response);
			angular.element('#myModal').modal('hide');
			init();
		});
	}

	$scope.DeleteStudent = function(student_id){
		MainSvc.DeleteStudent(student_id)
		.then(function(response){
			console.log(response);
			init();
		})
	} 

	$scope.UpdateStudent = function(student_id, firstname, lastname, info){
		MainSvc.UpdateStudent(student_id, firstname, lastname, info)
		.then(function(response){
			console.log(response);
			angular.element('.updateModal').modal('hide');
			init();
		});
	}

	init();
}]);

app.service('MainSvc', ['$http', function ($http) {
	
	var main = this;

	main.GetStudent = function(){
		return $http.get("http://localhost:8080/api/bears");
	}

	main.AddStudent = function(student_id, firstname, lastname, info){
		return $http.post("http://localhost:8080/api/bears", {
			student_id: student_id,
			firstname: firstname,
			lastname: lastname,
			info: info
		});
	}

	main.DeleteStudent = function(student_id){
		return $http.delete("http://localhost:8080/api/bears/" + student_id);
	}

	main.UpdateStudent = function(student_id, firstname, lastname, info){
		return $http.put("http://localhost:8080/api/bears/" + student_id, {
			firstname: firstname,
			lastname: lastname,
			info: info
		});
	}

}]);
