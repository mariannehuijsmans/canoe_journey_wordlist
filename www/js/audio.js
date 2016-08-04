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
        
        function playAudio(src) {
            // Create Media object from src
            
            if (ionic.Platform.isIOS()){
            my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();
                
            } else if (ionic.Platform.isIPad()){
                my_media = new Media(src, onSuccess, onError);

            // Play audio
            my_media.play();  
            } else if (ionic.Platform.isAndroid()){
                src = "/android_asset/www/" + src
                 my_media = new Media(src, onSuccess, onError);
            // Play audio
            my_media.play(); 
            }
            // Update my_media position every second
//            if (mediaTimer == null) {
//                mediaTimer = setInterval(function() {
//                    // get my_media position
//                    my_media.getCurrentPosition(
//                        // success callback
//                        function(position) {
//                            if (position > -1) {
//                                setAudioPosition((position) + " sec");
//                            }
//                        },
//                        // error callback
//                        function(e) {
//                            console.log("Error getting pos=" + e);
//                            setAudioPosition("Error: " + e);
//                        }
//                    );
//                }, 1000);
//            }
        }
        
//        //Toggle Button
//        function toggleAudio(src) {
//            my_media = new Media(src, onSuccess, onError, onChange);
//            console.log(status);
//                if(status === "3") {
//                $("#audioIcon").removeClass('ion-ios-play');
//                $("#audioIcon").addClass('ion-ios-pause');
//                my_media.play();
//                } else if(status === "2") {
//                $("#audioIcon").removeClass('ion-ios-pause');
//                $("#audioIcon").addClass('ion-ios-play');
//                my_media.pause();
//    }
//    }// End Toggle

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
