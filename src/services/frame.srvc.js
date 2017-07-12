var f = undefined;

app.service('frameSrvc', [
    // deps 
    'workspaceSrvc', 

    // code 
    function(workspaceSrvc){
        var self = this;
        f = self;

        var selectedIndex = 0;

        self.getFrameWidth = function(){
            return 19;
        }

        self.getSelectedIndex = function(){
            return selectedIndex;
        };

        self.getFrameCount = function(){
            return workspaceSrvc.getCurrent().project.frames.count;
        };

        self.nextFrame = function(){
            selectedIndex += 1;
            var max = self.getFrameCount();
            if (selectedIndex >= max ){
                selectedIndex = max - 1;
            }
        };

        self.prevFrame = function(){
            selectedIndex -= 1;
            if (selectedIndex < 0){
                selectedIndex = 0;
            }
        };

        self.getFrameContent = function(index){
            if (index < 0)
                throw Error('cannot get frame for negative index')
            
            if (index == undefined){
                index = selectedIndex;
            }
            index = index % 3;
            var filename = 'frame_' + pad(index + 1, 4) + '.bmp';
            var filepath =  workspaceSrvc.getCurrent().path + '/' + filename;
        
            return filepath;
        }

        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }

        return self;
    }
])