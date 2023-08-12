var app = angular.module('app', []);
app.controller('controller', function($scope,$http){
    $scope.data = [];
    $scope.getData = function(){
        $http.get('data/customer_profile.json').then(function(response){
            $scope.data = response.data;
        })
    }
})