var app = angular.module('app', []);
app.controller('controller', function ($scope, $http, $timeout) {
    $scope.data = [];
    $scope.getData = function () {
        $http.get('https://btbk.hndedu.com/api/NewsCategory/GetAll').then(function (response) {
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

    $scope.onSave = function (data) {
        if (data.id > 0){$http.put('https://btbk.hndedu.com/api/NewsCategory/Update', data).then(function (response) {
            alert('Update Success!');
            $scope.currentProductCategory = {
                id: 0,
                name: "",
                type: ""
            }
            $scope.getData();
        })
    }
    if (data.id == 0){$http.post('https://btbk.hndedu.com/api/NewsCategory/Create', data).then(function (response) {
            alert('Add Success!');
            $scope.currentProductCategory = {
                id: 0,
                name: "",
                type: ""
            }
            $scope.getData();
        })
    }
    };

    $scope.onDelete = function (id) {
        var checker = window.confirm('ARE YOU SURE TO DELETE?');
        if (checker) {
            $http.delete('https://btbk.hndedu.com/api/NewsCategory/Delete?id=' + id).then(function (response) {
                alert('DELETE SUCCESS!');
                $scope.getData();
            })
        }
    }
    $scope.onEdit = function (data) {
        $scope.currentProductCategory = data;
    }
})