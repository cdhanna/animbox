app.service('windowSrvc', [
    // deps 
    'frameSrvc', 

    // code 
    function(frameSrvc){
        var self = this;
        var DEFAULT_NAME = 'default';
        var windows = {};
        var rollingId = 0;

        self.createWindow = function(name){
            if (name == undefined){
                name = 'unnamed' + rollingId;
                rollingId ++;
            }
            if (windows[name] != undefined){
                console.error('window by the name ' + name + ' already exists!');
                return undefined;
            }

            var window = new Window();
            window.name = name;

            windows[name] = window;
            return window;
        }

        self.readWindow = function(name){

        }

        self.changeLeft = function(change, name){
            var window = getWindow(name);
            if (window){
                window.left = Math.max(0, window.left + change);

                var max = Math.max(0,  frameSrvc.getFrameWidth() * frameSrvc.getFrameCount() - window.width)
                window.left = Math.min(window.left, max)

            }
        }

        function getWindow(name){
            if (name == undefined){
                name = DEFAULT_NAME;
            }
            var window = windows[name];
            if (window == undefined){
                console.error('window name does not exist . ' , name);
            }
            return window;
        }
        // self.getWindow = function(name){
        //     console.log(name, windows)
        //     if (name == undefined){
        //         name = DEFAULT_NAME;
        //     }
        //     var window = windows[name];
        //     if (window == undefined){
        //         console.error('window name does not exist. name is ' + name);
        //     }
        //     console.log('got window', window)
        //     return window;
        // }
        



        self.createWindow(DEFAULT_NAME);

        return self;
    }
])