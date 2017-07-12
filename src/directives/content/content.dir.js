app.directive('content', [
    // deps 
    'frameSrvc', 
    'pictureSrvc',
    'pictureStates', 

    // code 
    function(frameSrvc, pictureSrvc, pictureStates){
        return {
            scope: {}, 
            templateUrl: 'directives/content/content.dir.html',
            link: function(scope, elem, attrs){
                scope.getFrame = function(){
                    return frameSrvc.getSelectedIndex();
                }
                scope.getSource = function(){

                    return frameSrvc.getFrameContent();

                }

                scope.$watch(function(){
                    return frameSrvc.getSelectedIndex();
                }, function(){
                    elem[0].querySelector('.image').setAttribute('src', frameSrvc.getFrameContent())
                })

                scope.$watch(function(){
                    return pictureSrvc.getState()
                }, function(state){
                    elem[0].querySelector('.content').classList.toggle('flash-red', state == pictureStates.preparingCalibration)
                })
                // frameSrvc.getFrameContent(-1)
            }
        }
    }
])