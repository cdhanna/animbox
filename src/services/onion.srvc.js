app.service('onionSrvc', [
    // deps 
    'frameSrvc',

    // code 
    function(frameSrvc){
        var self = this;

        var model = {
            active: false,
            leftOffset: 1,
            rightOffset: 0
        }


        self.isActive = function(){
            return model.active;
        }

        self.getLeftIndex = function(){
            var leftIndex =  frameSrvc.getSelectedIndex() - model.leftOffset;
            if (leftIndex < 0){
                leftIndex = 0;
            }
            return leftIndex;
        }

        self.getRightIndex = function(){
            var rightIndex = frameSrvc.getSelectedIndex() + model.rightOffset;
            if (rightIndex >= frameSrvc.getFrameCount()){
                rightIndex = frameSrvc.getFrameCount() - 1;
            }
            return rightIndex;
        }

        self.changeLeft = function(amount){
            model.leftOffset += amount;
            if (model.leftOffset < 1){
                model.leftOffset = 1;
            }
        }

        self.changeRight = function(amount){
            model.rightOffset += amount;
            if (model.rightOffset < 0){
                model.rightOffset = 0;
            }
        }

        return self;
    }
])