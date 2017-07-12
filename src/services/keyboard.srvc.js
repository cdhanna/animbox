app.service('keyboardSrvc', [
    // deps 
    'eventSrvc', 
    'inputNames', 

    // code 
    function(eventSrvc, inputNames){
        var self = this;

        var keyMappings = {};

        eventSrvc.get(inputNames.next, true).then(function(evt){
            keyMappings['ArrowRight'] = function(){
                evt.fire()
            };
        })

        eventSrvc.get(inputNames.prev, true).then(function(evt){
            keyMappings['ArrowLeft'] = function(){
                evt.fire()
            };
        })

        eventSrvc.get(inputNames.onionLeftGrow, true).then(function(evt){
            keyMappings['Numpad7'] = function(){
                evt.fire()
            };
        })

        eventSrvc.get(inputNames.onionLeftShrink, true).then(function(evt){
            keyMappings['Numpad9'] = function(){
                evt.fire()
            };
        })

        eventSrvc.get(inputNames.onionRightGrow, true).then(function(evt){
            keyMappings['Numpad6'] = function(){
                evt.fire()
            };
        })

        eventSrvc.get(inputNames.onionRightShrink, true).then(function(evt){
            keyMappings['Numpad4'] = function(){
                evt.fire()
            };
        })

        document.addEventListener('keydown', function(evt){
            // console.log('evt, ', evt)
            var mapped = keyMappings[evt.code];
            if (mapped){
                mapped();
            }
        })

        return self;
    }
])