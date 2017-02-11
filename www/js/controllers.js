angular.module('sideMenuApp.controllers', [])

    .controller('MenuController', function ($scope, $location, MenuService, locaslStorage) {
        var vm = $scope;
        // "MenuService" is a service returning mock data (services.js)
        locaslStorage.removeAll();
        vm.list = MenuService.all();
        vm.goTo = function (page) {
            vm.sideMenuController.toggleLeft();
            $location.url('/' + page);
        };


    })

    .controller('DictionaryController', function ($scope, $http, $rootScope, JsonService, $timeout, locaslStorage, $location,$cordovaToast,$window) {
        var vm = $scope;
        vm.navTitle = "Dictionary";
        vm.MainObj={};
        vm.MainObj.deviceHeight=$window.innerHeight-200+"px";
        var urlParams = $location.search();
        vm.search = null;
        vm.searching = null;
        if (urlParams.item) {
            vm.MainObj.search = urlParams.item;
            vm.searching = urlParams.item;
        }
        vm.color = '';
        vm.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function (e) {
                vm.sideMenuController.toggleLeft();
            }
        }];
        vm.changeColor = function () {
            vm.color = 'energized';
            var length=Object.keys(vm.MainObj.selectedItem).length>0
            if(length>0){
                var temp=locaslStorage.getAll(3);
                if(temp.indexOf(vm.MainObj.selectedItem)==-1)
                    locaslStorage.addFav(vm.MainObj.selectedItem);
                else{
                    $cordovaToast.showShortCenter("Already added");
                    vm.color = '';
                    return;
                }
            }else{
                $cordovaToast.showShortCenter("Please select item");
            }
            $timeout(function () {
                vm.color = '';
                if(length>0)
                    $cordovaToast.showShortCenter("Item added to favorite");
            }, 300);
        }
        vm.MainObj.selectedItem = {};
        vm.hideResult = false;
        if (angular.isUndefined($rootScope.Json)) {
            JsonService.getList().then(function (data) {
                vm.sortBy = 'word';
                data = _.sortBy(data, vm.sortBy);
                $rootScope.Json = data[0]
            })
        }
        vm.gotoSelectedItem = function (item) {
            item.splitValues = item.synonyms.split('|');
            if(item.splitValues.length==1){
                if(item.splitValues[0]=="")
                    item.splitValues[0]="No record found";
            }
            vm.MainObj.selectedItem = item;
            vm.MainObj.search = item.word;
            locaslStorage.add(item);
            vm.hideResult = true;
        }

        vm.splitValueClick = function (item) {
            vm.hideResult = false;
            vm.MainObj.search = item;
            vm.searching = item;
        }
        vm.onchangeSearch = function (search) {
            vm.searching = search;
            vm.hideResult = false;
        }

        vm.rightButtons = [];
    })

    .controller('FavorisController', function ($scope, locaslStorage, $location) {
        var vm = $scope;
        vm.navTitle = "favorite";
        vm.favitems = locaslStorage.getAll(3);
        vm.GoToDictionary = function (item) {
            $location.url('/dictionary').search({ item: item.word });
        }
        vm.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function (e) {
                vm.sideMenuController.toggleLeft();
            }
        }];


        vm.rightButtons = [];
    })

    .controller('HistoriqueController', function ($scope, locaslStorage, $location) {
        var vm = $scope;
        vm.navTitle = "Historique";
        vm.historyitem = locaslStorage.getAll(2);
        vm.GoToDictionary = function (item) {
            $location.url('/dictionary').search({ item: item.word });
        }
        vm.leftButtons = [{
            type: 'button-icon icon ion-navicon',
            tap: function (e) {
                vm.sideMenuController.toggleLeft();
            }
        }];

        vm.rightButtons = [];
    });
