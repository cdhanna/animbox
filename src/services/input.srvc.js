app.service('inputSrvc', [
    // deps 
    'eventSrvc', 
    'frameSrvc',
    'onionSrvc', 

    'inputNames',
    // code 
    function(eventSrvc, frameSrvc, onionSrvc,
        inputNames){

        var self = this; 


        eventSrvc.setup(inputNames.next)
            .arg('count')
            .on(function(args){
                frameSrvc.nextFrame();
            });

        eventSrvc.setup(inputNames.prev)
            .arg('count')
            .on(function(args){
                frameSrvc.prevFrame();
            })

        eventSrvc.setup(inputNames.onionLeftGrow)
            .on(function(args){
                onionSrvc.changeLeft(1)
            })
        eventSrvc.setup(inputNames.onionLeftShrink)
            .on(function(args){
                onionSrvc.changeLeft(-1)
            })

        eventSrvc.setup(inputNames.onionRightGrow)
            .on(function(args){
                onionSrvc.changeRight(1)
            })
        eventSrvc.setup(inputNames.onionRightShrink)
            .on(function(args){
                onionSrvc.changeRight(-1)
            })  

        return self;
    }
])

app
    .constant('inputNames', {
        next: 'next',
        prev: 'prev',
        onionLeftGrow: 'onionLeftGrow',
        onionLeftShrink: 'onionLeftShrink',
        onionRightGrow: 'onionRightGrow',
        onionRightShrink: 'onionRightShrink'
    })