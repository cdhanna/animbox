app.directive('content', [
    // deps 
    'frameSrvc', 
    'pictureSrvc',
    'pictureStates', 
    'onionSrvc', 

    // code 
    function(frameSrvc, pictureSrvc, pictureStates, onionSrvc){
        return {
            scope: {}, 
            templateUrl: 'directives/content/content.dir.html',
            link: function(scope, elem, attrs){

                scope.model = {
                    frame: undefined,
                    onions: []
                };

                var canvas = elem[0].querySelector('canvas');
                var ctx = canvas.getContext('2d');


                scope.getFrame = function(){
                    return frameSrvc.getSelectedIndex();
                }
                scope.getSource = function(){
                    return frameSrvc.getFrameContent();
                }

                scope.$watch(function(){
                    return frameSrvc.getSelectedIndex();
                }, function(){
                    //elem[0].querySelector('.image').setAttribute('src', frameSrvc.getFrameContent())
                    updateContent();
                })

                scope.$watch(function(){
                    return onionSrvc.getLeftIndex() + ',' + onionSrvc.getRightIndex();
                }, function(){
                    updateContent();
                })

                scope.$watch(function(){
                    return pictureSrvc.getState()
                }, function(state){
                    elem[0].querySelector('.content').classList.toggle('flash-red', state == pictureStates.preparingCalibration)
                })
                
                scope.getOnionStyle = function(index){
                    var styles = [];

                    var frameIndex = index + onionSrvc.getLeftIndex();

                    var onionDistance = frameSrvc.getSelectedIndex() - frameIndex;
                   
                    if (onionDistance < 0){
                        styles.opacity = .1;
                    }
                    if (onionDistance > 0){
                        var max = frameSrvc.getSelectedIndex() - onionSrvc.getLeftIndex();
                        var ratio = onionDistance / max;
                        styles.opacity = .4 * (1-ratio);
                    }

                    return styles;
                }

                function updateContent(){

                    var start = onionSrvc.getLeftIndex();
                    var stop = onionSrvc.getRightIndex();

                    var frames = frameSrvc.getFrameContentRange(start, stop);

                    scope.model.frame = frameSrvc.getFrameContent();
                    scope.model.onions = frames;

                    //ctx.globalCompositeOperation = 'lighter';
                    canvas.width = 0;
                    canvas.width = 400;
                    canvas.height = 400;
                    
                    frames.forEach(function(frame, index){
                        
                        ctx.globalAlpha = .1;
                        loadImage(frame, (img) => {
                            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        });

                    });

                    console.log(frames);
                }

                function loadImage(path, cb){
                    var img = document.createElement('img');
                    img.onload = function(){
                        img.style.opacity=.1;
                        cb(img);
                    };
                    img.src = path;
                }

            }
        }
    }
])