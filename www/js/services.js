angular.module('sideMenuApp.services', [])

  /**
   * A simple example service that returns some data.
   */
  .factory('MenuService', function () {

    var menuItems = [
      { text: 'Dictionary', iconClass: 'icon ion-search', link: 'dictionary' },
      { text: 'Favoris', iconClass: 'icon ion-star', link: 'favoris' },
      { text: 'Historique', iconClass: 'icon ion-clock', link: 'historique' }
    ];

    return {
      all: function () {
        return menuItems;
      }
    }
  })

  .factory('JsonService', function ($http,$location) {
    var factory = {
      topAuthorsList: false,
      getList: function () {
        var file=null;
        //returning promise
        if($location.absUrl().indexOf("localhost")<=-1)
          file='appdata/words.json';
        else
          file='appdata/words.json'
        return $http.get(file)
          .then(function (response) {
            var data = response;
            factory.topAuthorsList = data;
            //returning data to resolving promise
            return data;
          }, function (error) {
            return 'There was an error getting data';
          });
      }
    };
    return factory;
  })
  .factory('locaslStorage', function ($localStorage) {
    $localStorage = $localStorage.$default({
      item: [],
      history:[],
      favroit:[]
    }); 
    var _getAll = function (dispitem) {
      switch(dispitem){
        case 1:return $localStorage.item;
        case 2:return $localStorage.history;
        case 3:return $localStorage.favroit;
      } 
    };
    var _add = function (thing) {
      $localStorage.item.push(thing);
      $localStorage.history.push(thing);
    }
    var _remove = function (thing) {
      $localStorage.item.splice($localStorage.item.indexOf(thing), 1);
    }
    var _removeAll = function(){
      $localStorage.item=[];
    }
    var _addFav=function(item){
      $localStorage.favroit.push(item);
    }
    return {
      getAll: _getAll,
      add: _add,
      remove: _remove,
      removeAll:_removeAll,
      addFav:_addFav,
    };
  })
  .filter('SearchFilter', function ($rootScope) {
    return function (input, search, optional2) {
      if (search == undefined) return "";
      if (search.length <= 1) return "";
      var output = _(input).filter(function (e) {
         if (e.word.toLowerCase().indexOf(search.toLowerCase())==0)
        //if(window._.startsWith(e.word.toLowerCase(),search.toLowerCase()))
          return e;
      });
      // var output = input.map(function (item, key) {
      //   if (item.word.startsWith(search)) { return item; }
      // })
      return output;

    }
  })