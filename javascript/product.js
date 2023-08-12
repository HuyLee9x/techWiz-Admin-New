var app = angular.module('app', ['ngFileUpload']);
app.directive('simpleMde', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            var options = {
                element: element[0],
                spellChecker: false,
                status: false
            };

            var simplemde = new SimpleMDE(options);

            // Cập nhật view khi model thay đổi
            ngModel.$render = function () {
                simplemde.value(ngModel.$viewValue || '');
            };

            // Cập nhật model khi view thay đổi
            simplemde.codemirror.on("change", function () {
                scope.$apply(function () {
                    ngModel.$setViewValue(simplemde.value());
                });
            });
        }
    };
});
app.controller('controller', function ($scope, $http, $timeout, Upload) {
    $scope.imgBB_API = "d8087645042101303dfd93ce58f3281c";
    $scope.data = [];
    $scope.getData = function () {
        $http.get('https://btbk.hndedu.com/api/Product/GetAll').then(function (response) {
            $scope.data = response.data.dataRows;
        })
    }
    $scope.getData();

    $scope.currentProduct = {
        id: 0,
        name: "",
        price: 0,
        quantity: 0,
        description: "",
        image: ""
    }

    $scope.onSave = function (data) {
        if (data.id > 0) {
            $http.put('https://btbk.hndedu.com/api/Product/Update', data).then(function (response) {
                alert('Update Success!');
                $scope.currentProduct = {
                    id: 0,
                    name: "",
                    price: 0,
                    quantity: 0,
                    description: "",
                    image: ""
                }
                $timeout(() => {
                    $('#editModal').modal('hide');
                    $('.modal-backdrop').remove();
                    $('body').removeClass('modal-open');
                    $scope.getData();
                })
            })
        }
        if (data.id == 0) {
            $http.post('https://btbk.hndedu.com/api/Product/Create', data).then(function (response) {

                alert('Add Success!');
                $scope.currentProduct = {
                    id: 0,
                    name: "",
                    price: 0,
                    quantity: 0,
                    description: "",
                    image: ""
                }
                $timeout(() => {
                    $('#editModal').modal('hide');
                    $('.modal-backdrop').remove();
                    $('body').removeClass('modal-open');
                    $scope.getData();
                })

            })
        }

    }
    $scope.onUpdate = function (data) {

        $scope.currentProduct = data;
    }
    $scope.onDelete = function (id) {
        var checker = window.confirm('ARE YOU SURE TO DELETE?');
        if (checker) {
            $http.delete('https://btbk.hndedu.com/api/Product/Delete?id=' + id).then(function (response) {
                alert('DELETE SUCCESS!');
                $scope.getData();
            })
        }

    }
    $scope.handleFileChange = function (event) {
        alert('AN')
        console.log(event);
        var files = event.target.files;
        if (files && files.length > 0) {
            var file = files[0];
            console.log(file.name);

            // Thực hiện các thao tác khác với file nếu cần
        }
    };
    $scope.upload = function (file) {
        if (file) {
            Upload.upload({
                url: `https://api.imgbb.com/1/upload?key=${$scope.imgBB_API}`,
                data: { image: file }
            }).then(function(resp) {
                $scope.currentProduct.image = resp.data.data.url;
            }, function(resp) {
                console.log('Lỗi:', resp.status);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('Tiến trình: ' + progressPercentage + '%');
            });    

            
        }
        
    };

})