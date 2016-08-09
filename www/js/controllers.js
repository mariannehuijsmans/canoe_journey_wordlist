angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicModal, $rootScope, $cordovaMedia, $ionicSlideBoxDelegate, $localstorage, $cordovaEmailComposer, Language) {

    // module.js Variables
    $scope.scroll = Language.letters()    
    $scope.name = Language.name()
    $scope.optional = Language.optional()

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on('$ionicView.enter', function(e) {
    });


    // Tap Buttons

    $scope.onTapRandom = function () {
        $scope.random = getRandom10();
    }; 


    // Browse functions

    //Init & VARS

    $scope.allEntries = getAllEntries();


    var startIndex = 0;


    $scope.browseEntries = get10(sorted,0);

    $scope.selectedLetter = "0";


    // Letter select
    var firstWords = [];

    $scope.letterSelect = function () {
        var letterInd = parseInt(this.selectedLetter);
        console.log(letterInd + 100);
        for (var i = 0; i < sorted.length; i++) {
            if (sorted[i].firstWord === true && sorted[i].sorting_form[0].substring(0,3) === (letterInd + 100).toString()){
                startIndex = sorted.indexOf(sorted[i]);
                $scope.browseEntries = get10(sorted, startIndex);
                console.log(startIndex);
            }
        };
    };

    // Next Prev
    $scope.prev10 = function () {
        if ((startIndex - 10) > 0) {
            startIndex -= 10;
            $scope.browseEntries = get10(sorted, startIndex);
            //        console.log(startIndex);
        } else {
            startIndex = 0;
            $scope.browseEntries = get10(sorted, startIndex);
            //        console.log(startIndex);
        };   
    };


    $scope.next10 = function () {
        if ((startIndex +10) < sorted.length){
            startIndex += 10;
            $scope.browseEntries = get10(sorted, startIndex);
            console.log(startIndex);
        } else {
            startIndex = (sorted.length - 10)
            $scope.browseEntries = get10(sorted, startIndex);
        }
    };



    // Insert Word


    // Search function, uses ng-model to set input to variable, then decides whether to search in English or Gitksan based on the ID of the .input element

    $scope.searchWord = "";

    //    $scope.entries = response;


    // Changes ID of .input element based on selected option

    //Default choice set to English. ID of results div also set to English


//    $scope.gitClick = function() {
//        $(".input").attr('autocomplete', 'off');
//        $(".input").attr('autocorrect', 'off');
//        $(".input").attr('spellcheck', 'false');
//        $(".input").attr('id', 'gitSearch');
//        $('#gitButton').prop('checked', true);
//        $('#engButton').prop('checked', false);
//    }
//
//    $scope.engClick = function() {
//        $(".input").attr('autocomplete', 'on');
//        $(".input").attr('autocorrect', 'on');
//        $(".input").attr('spellcheck', 'true');
//        $(".input").attr('id', "engSearch")
//        $('#engButton').prop('checked', true);
//        $('#gitButton').prop('checked', false);
//    };
    
    $scope.getEnglish = function(searchWord) {
        var answers1 = []
        var t0 = performance.now();
        var re = new RegExp(searchWord, 'i')
        console.log(re)
        for(i=0; i<$scope.allEntries.length;i++) {
            if (answers1.length < 25) {
                if (re.test($scope.allEntries[i].definition[0])) {
                    answers1.push($scope.allEntries[i])
                }
            }
        }
        var t1 = performance.now();
        console.log("Call to getEnglish took " + (t1 - t0) + " milliseconds.")
        console.log(answers1)
        return(answers1)
    }



    $scope.getResult = function(searchWord) {
        //        var t0 = performance.now()
        var response = "";
        if ( $(".input").val() === "") {
            $("#results").hide
        } else {
            var answerEng = $scope.getEnglish(searchWord);
            var answerGit = searchGit(searchWord);
            console.log(answerEng.length)
            console.log(answerGit.length)
            var maybeMatches = [];
            var partMatches = [];
            var matches = [];
            for (var i=0; i< answerEng.length;i++){
                var entry = answerEng[i]
//                if(entry.distance === 0) {
                    entry.type = "eng";
                    matches.push(entry);
//                }
//
//                if(entry.distance <= 1 && entry.distance > 0) {
//                    entry.type = "eng";
//                    partMatches.push(entry);
//                }
//
//                if(entry.distance <= 2 && entry.distance > 1) {
//                    entry.type = "eng";
//                    maybeMatches.push(entry);
//                }
            }
            for (var i=0; i< answerGit.length;i++){
                var entry = answerGit[i][1]
                if(entry.distance === 0) {
                    entry.type = "git";
                    matches.push(entry);
                }

                if(entry.distance <= 1 && entry.distance > 0) {
                    entry.type = "git";
                    partMatches.push(entry);
                }

                if(entry.distance <= 2 && entry.distance > 1) {
                    entry.type = "git";
                    maybeMatches.push(entry);
                }
            }
        }
        $scope.matches = matches;
        $scope.partMatches = partMatches;
        $scope.maybeMatches = maybeMatches;
    };





    //Modals

    $ionicModal.fromTemplateUrl('./templates/wordModal.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.wordModal = modal;
    });

    $ionicModal.fromTemplateUrl('./templates/infoModal.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.infoModal = modal;
    });

    $ionicModal.fromTemplateUrl('./templates/searchInfoModal.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.searchInfoModal = modal;
    });

    $ionicModal.fromTemplateUrl('./templates/flashModal.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.flashModal = modal;
    });

    $scope.openModal = function(obj, type) {
        if (type === 'word') {
            $scope.dispObj = obj;
            $scope.wordModal.show();
        } else if (type === "info") {$scope.infoModal.show();
                                    } else if (type === "searchInfo") {$scope.searchInfoModal.show();
                                                                      } else if (type === "flashInfo") {$scope.flashModal.show();
                                                                                                       }
    };
    $scope.closeModal = function(type) {
        if (type === 'word') {
            $scope.wordModal.hide();
        } else if (type === "info") {$scope.infoModal.hide();
                                    } else if (type === "searchInfo") {$scope.searchInfoModal.hide();
                                                                      } else if (type === "flashInfo") {$scope.flashModal.hide();
                                                                                                       }
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        console.log("removed");
        // Execute action
    });



    // Toggle Advanced View

    $rootScope.custom = false;

    $scope.toggle = function() {
        $rootScope.custom = $rootScope.custom === false ? true: false;
    };


    // Toggle Favourite


    $scope.toggleFav = function(source, type, deck) {

        for (var i = 0; i < dataDict[source].data.length;i++) {
            if ( dataDict[source].data[i].entryID === $scope[type].entryID) {
                if ($scope[type].favourited){
                    for (var j = 0; j<$rootScope.favs.length; j++)
                        if ($scope[type].entryID === $rootScope.favs[j].entryID) {
                            dataDict[source].data[i].favourited = false;
                            var removeIndex = $rootScope.favs.indexOf($rootScope.favs[j]);
                            $rootScope.favs.splice(removeIndex, 1);   
                            break;
                        }
                } else {
                    dataDict[source].data[i].favourited = true;
                    $rootScope.favs.push(dataDict[source].data[i])
                    break;
                }
            } 
        }
        if (deck === "Bookmarks") {
            if ($scope.index > 0) {
                console.log("prev");
                $scope.showPrevCard();
            } else if ($scope.index === 0 && $scope.deck.length > 0){
                console.log("next");
                $scope.card = get1($scope.deck, $scope.index)[0];
            } else {
                console.log($scope.deck.length)
                console.log("erase");
                $scope.card = 0;
            }
        };
        $localstorage.setObject('favourites', $rootScope.favs)
    };


    // Remove Favourites

    $scope.removeFav = function(favourite, source) {
        for (var i = 0; i < dataDict[source].data.length;i++) {
            if ( dataDict[source].data[i].entryID === favourite.entryID) {
                for (var j = 0; j<$rootScope.favs.length; j++)
                    if (favourite.entryID === $rootScope.favs[j].entryID) {
                        dataDict[source].data[i].favourited = false;
                        var removeIndex = $rootScope.favs.indexOf($rootScope.favs[j]);
                        $rootScope.favs.splice(removeIndex, 1); 
                        break;}
            }
        } 
        $localstorage.setObject('favourites', $rootScope.favs)
    };

    // Audio
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is ready
    //
    function onDeviceReady() {
        //            playAudio("http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3");

    }

    // Audio player
    //
    var my_media = null;
    var mediaTimer = null;

    // Play audio
    //

    $scope.playAudio = function (src) {
        // Create Media object from src
        console.log(src);

        if (ionic.Platform.platform() == "win32"){
            srcURL = "audio/" + src
            if (src != undefined ){
                var audio = new Audio(srcURL);
                audio.play();
            } else {
                alert("sorry, there is no audio for this file")
            }
        }
        
        if (ionic.Platform.isIOS()){
            src = "audio/" + src
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();

        } else if (ionic.Platform.isIPad()){
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();  
        } else if (ionic.Platform.isAndroid()){
            src = "/android_asset/www/audio/" + src
            my_media = new Media(src, onSuccess, onError);
            // Play audio
            my_media.play(); 
        }

    }

    // Pause audio
    // 
    function pauseAudio() {
        if (my_media) {
            my_media.pause();
        }
    }

    // Stop audio
    // 
    function stopAudio() {
        if (my_media) {
            my_media.stop();
        }
        clearInterval(mediaTimer);
        mediaTimer = null;
    }

    // onSuccess Callback
    //
    function onSuccess() {
        console.log("playAudio():Audio Success");
    }

    // onError Callback 
    //
    function onError(error) {
        alert('Sorry, we don\'t have audio for this word yet');
    }

    // onChange Callback
    var status = "3";
    function onChange(code) {
        console.log(code);
        status = code;
        return status;
    }

    // Set audio position
    // 
    function setAudioPosition(position) {
        document.getElementById('audio_position').innerHTML = position;
    }

    // Flashcards
    // Constants

    $scope.selectedDeck;
    $scope.points = 0;


    // Settings
    $scope.flashStyle = "Passive";
    $scope.active = false; 
    $scope.passive = true;
    $scope.answerSide = false;
    $scope.statsBar = false;

    // Toggle Settings

    $scope.style = function(type){
        if (type === "Active") {
            $scope.passive = false;
            $scope.active = true;
        } else if (type === "Passive") {
            $scope.active = false;
            $scope.passive = true;
        };
    };


    $scope.seeAnswer = function(){
        $scope.answerSide = $scope.answerSide === false ? true: false;
    };

    // Flashcard functions

    // test
    $scope.test = test;

    for (var i = 0;i<dataDict.fm2014.data.length; i++) {
        if (dataDict.fm2014.data[i].theme === "test") {
            console.log(dataDict.fm2014.data[i])
            $scope.test.append(dataDict.fm2014.data[i]);
        }
    }

    $scope.setDeck = function(deck) {
        $scope.index = 0;
        $scope.statsBar = true;
        if( deck === "Bookmarks"){
            $scope.deck = $rootScope.favs
        } else if (deck === "Test"){
            $scope.deck = $scope.test;
        } else if (deck === "Random"){
            $scope.deck = getRandom10();
        }
        $scope.card = get1($scope.deck, $scope.index)[0];
    };
    $scope.showNextCard = function() {
        if ($scope.index + 1 < $scope.deck.length){
            $scope.index = $scope.index + 1;
            $scope.card = get1($scope.deck, $scope.index)[0];
        }
    };
    $scope.showPrevCard = function() {
        if ($scope.index > 0){
            $scope.index = $scope.index - 1;
            $scope.card = get1($scope.deck, $scope.index)[0];
        }
    };


    // Email
    $scope.sendEmail = function(entry) {
        if (window.plugins && window.plugins.cordovaEmailComposer) {

            var email = {
                to: 'aidanpine@shaw.ca',
                subject: 'Correction',
                body: entry,
                isHtml: true
            };

            $cordovaEmailComposer.open(email).then(null, function () {
                // user cancelled email
            });
        }
    }
}); // End of AppCtrl  