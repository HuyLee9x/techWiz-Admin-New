var app = angular.module('app', []);
app.controller('controller', function ($scope, $http, $timeout) {
    $scope.data = [];
    $scope.getData = function () {
        $http.get('https://btbk.hndedu.com/api/User/GetAllUser').then(function (response) {
            $scope.data = response.data;
            $timeout(() => {
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
        if (data.id > 0) {
            $http.put('https://btbk.hndedu.com/api/User/GetAllUser', data).then(function (response) {
                alert('Update Success!');
                $scope.currentProductCategory = {
                    id: 0,
                    name: "",
                    type: ""
                }
                $scope.getData();
            })
        }
        if (data.id == 0) {
            $http.post('https://btbk.hndedu.com/api/User/GetAllUser', data).then(function (response) {
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
            $http.delete('https://btbk.hndedu.com/api/User/Delete?userid=' + id).then(function (response) {
                alert('DELETE SUCCESS!');
                $scope.getData();
            })
        }
    }

    $scope.saveEditedRole = function (d) {
        alert("Hello");
        
        d.role = "Admin";
        
        // Đóng modal
        $('#editModal').modal('hide');
    };

})