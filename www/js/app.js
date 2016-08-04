// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var app = angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'ngCordova', 'ionic.utils', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
 
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  
  .state('app.random', {
      url: '/random',
      views: {
          'menuContent': {
              templateUrl: 'templates/random.html'
          }
      }
  })
 .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('app.favourites', {
      url: '/favourites',
      views: {
        'menuContent': {
          templateUrl: 'templates/favourites.html'
        }
      }
    })
    .state('app.flashcards', {
      url: '/flashcards',
      views: {
        'menuContent': {
          templateUrl: 'templates/flashcards.html'
        }
      }
    })
  .state('app.aboutus', {
      url: '/aboutus',
      views: {
        'menuContent': {
          templateUrl: 'templates/aboutUs.html'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});

//app.run(function($ionicPlatform, $rootScope) {
//        $ionicPlatform.ready(function() {
//            if(window.Connection) {
//                if(navigator.connection.type == Connection.WIFI || navigator.connection.type == Connection.ETHERNET) {
//                  console.log("connected");
//                   $.ajax({
//                       url: "http://gitdict.nfshost.com/cache/dict_cached.js",
//                       type: "GET",
//                       dataType: "script",
//                       success: 
//                       function ( data, textStatus, jqxhr ) {
//                        console.log(data);
//                        console.log(textStatus);
//                        console.log(jqxhr);
//                        console.log("finished load");
//                    },
//                       async: false});
//                }
////                    .then(function(result) {
////                        if(!result) {
////                            ionic.Platform.exitApp();
////                        }
////                    });
//                } else if (window.navigator.onLine){
//console.log("connected on computer");
//                     $.ajax({
//                       url: "http://gitdict.nfshost.com/test/cache/dict_cached.js",
//                       type: "GET",
//                       dataType: "script",
////                       cache: true,
//                       success: 
//                       function ( data, textStatus, jqxhr ) {
//                        console.log(data);
//                        console.log(textStatus);
//                        console.log(jqxhr);
//                        console.log("finished load");
//                        waldayu.orthographizeEntries(dataDict);
//                           
//                        var entryID = function() {
//    console.log(dataDict.fm2014.data.length + dataDict.git_2013.data.length);
//    for (var i = 0; i<dataDict.fm2014.data.length;i++) { 
//    dataDict.fm2014.data[i].entryID= parseInt("999" + i);
//}
//
//for (var i = 0; i<dataDict.git_2013.data.length;i++) {
//    dataDict.git_2013.data[i].entryID = parseInt("1" + i);
//}
//};
//                        entryID();
//                    },
//                       async: false});
//                } else {
//                    console.log("nope");
//                };
//            });
//    });

//app.run(function ($state,$rootScope) {
//    $rootScope.$state = $state;
//})

app.run(function($localstorage, $rootScope) {
  $rootScope.favs = JSON.parse(localStorage["favourites"] || '[]');
    for (var i= 0; i<$rootScope.favs.length; i++) {
        for (var source in dataDict) {
            for (var j=0; j<dataDict[source].data.length; j++) {
                if (dataDict[source].data[j].entryID === $rootScope.favs[i].entryID) {
                    dataDict[source].data[j].favourited = true;
                }
            }
        }
}
    
});


var localStore = angular.module('ionic.utils', [])

localStore.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

