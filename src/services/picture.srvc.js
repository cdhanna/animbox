app.service('pictureSrvc', [
    // deps 
    '$timeout',

    'pictureStates',

    // code 
    function($timeout, pictureStates){
        var self = this;
        var state = pictureStates

        self.getState = function(){
            return state;
        }

        self.takePicture = function(){

            // multi-stage process.
            state = pictureStates.preparingCalibration;

            console.log("taking picture")

            $timeout(function(){
                state = pictureStates.idle;
            }, 500)

        }

        $timeout(function(){
            $timeout(function(){
            self.takePicture();

            })
        }, 1000)

        return self;
    }
])

app.constant('pictureStates', {
    preparingCalibration: 'preparing',
    takingCalibration: 'takingCalibration',
    preparingPicture: 'preparingPicture',
    takingPicture: 'takingPicture',
    idle: 'idle'

})