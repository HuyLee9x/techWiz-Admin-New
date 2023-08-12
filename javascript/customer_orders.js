var app = angular.module('app', []);
app.controller('controller', function($scope,$http){
    $scope.data = [];
    $scope.getData = function(){
        $http.get('https://btbk.hndedu.com/api/Order').then(function(response){
            $scope.data = response.data.dataRows;
        })
    }
    $scope.getData();
})