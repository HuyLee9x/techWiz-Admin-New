var app = angular.module('app', []);
app.controller('controller', function ($scope, $http, $timeout) {
    $scope.data = [];
    $scope.getData = function () {
        $http.get('https://btbk.hndedu.com/api/News/GetAll').then(function (response) {
            $scope.data = response.data.dataRows;
            $timeout(()=>{
                $('#myTable').DataTable();
            })
        })
    }
    $scope.getData();

    $scope.currentProductCategory = {
        id: 0,
        name: "",
        type: ""
    }

    $scope.onDelete = function (id) {
        var checker = window.confirm('ARE YOU SURE TO DELETE?');
        if (checker) {
            $http.delete('https://btbk.hndedu.com/api/Order?id=' + id).then(function (response) {
                alert('DELETE SUCCESS!');
                $scope.getData();
            })
        }
    }
    $scope.onEdit2 = function(d) {
        d.status = "Cancel";
        var checker = window.confirm('ARE YOU SURE TO UPDATE?');
        console.log(JSON.stringify(d))
        if (checker) {
            $http.put('https://btbk.hndedu.com/api/Order',d).then(function (response) {
                alert('SUCCESS!');
                $scope.getData();
            })
        }
    };


})