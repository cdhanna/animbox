var x = 0;

app.directive('frames', [
    // deps 
    'frameSrvc', 
    'onionSrvc',
    'windowSrvc',
    '$window',
    '$timeout',
    // code 
    function(frameSrvc, onionSrvc, windowSrvc, $window, $timeout){
        return {
            templateUrl: 'directives/frames/frames.dir.html',
            link: function(scope, elem, attrs){
                
                var targetScroll = 0;
                var window = windowSrvc.createWindow()
                var boxPadding = 4;
                var frameWidth = frameSrvc.getFrameWidth();


                $window.onresize = function(){
                    $timeout(function(){

                    })
                }

                scope.getFrames = function(){

                    var x = [];
                    window.width = getContainer().getBoundingClientRect().width - boxPadding;
                    
                    

                    var padding = window.padding * frameWidth;
                    var firstIndex = Math.ceil( (window.left - padding) / frameWidth );
                    var paddingMod = Math.min(0, firstIndex) * frameWidth;
                    firstIndex = Math.max(0, firstIndex);
                    var lastIndex = Math.min(frameSrvc.getFrameCount(), firstIndex + Math.floor( (window.width + ((padding*2)+paddingMod)) / frameWidth ));

                    for (var i = firstIndex ; i < lastIndex ; i ++){
                        x.push(i);
                    }
                    return x;

                }

                scope.getFrameStyle = function(frameIndex){
                    var style = {};

                    var left = boxPadding + frameIndex * frameWidth - window.left

                    style.left = left + 'px';

                    return style;
                }

                scope.$watch( function(){ 
                    return frameSrvc.getSelectedIndex();
                }, updateSelected);

                scope.$watch( function(){
                    return onionSrvc.getLeftIndex();
                }, function(){
                    updateLeftOnion();
                    updateLineOnion();
                })

                scope.$watch( function(){
                    return onionSrvc.getRightIndex();
                }, function(){
                    updateRightOnion();
                    updateLineOnion();
                })

                scope.$watch( function(){
                    return window.left;
                }, function(){
                    updateSelected();
                    updateLeftOnion();
                    updateRightOnion();
                    updateLineOnion();
                })


                function updateSelected(){
                    var index = frameSrvc.getSelectedIndex();
                    var left = getLeftPx(index);

                    var container = elem[0].querySelector('.frames-container');
                    var bbox = container.getBoundingClientRect();

                    var padding = window.padding * frameWidth;
                    var firstIndex = Math.ceil( (window.left - padding) / frameWidth );
                    var paddingMod = Math.min(0, firstIndex) * frameWidth;                    
                    var lastIndex = Math.max(0, firstIndex) + Math.floor( (window.width + ((padding*2)+paddingMod)) / frameWidth );

                    var rightPad = Math.min(6, Math.max(2, onionSrvc.getRightIndex() - index + 1));
                    var rightTipping = lastIndex - (window.padding + rightPad)
                    if (index > rightTipping ) {
                        windowSrvc.changeLeft(frameWidth/2, window.name);
                    }
                    
                    var leftPad = Math.min(6, Math.max(2, index - onionSrvc.getLeftIndex()));
                    var leftTipping = firstIndex + window.padding + leftPad;
                    if (index < leftTipping){
                        windowSrvc.changeLeft(-frameWidth/2, window.name)
                    }
                    
                    elem[0].querySelector('.frame-selector').style['left'] = left; 
                }

                function updateLeftOnion(){
                    var leftIndex = onionSrvc.getLeftIndex();
                    var left = getLeftPx(leftIndex, 2);
                    // var top = '0px';
                    var rotated = false;
                    if (Number(left.replace('px','')) < 4){
                        left = '1px';
                        // top = '6px';
                        rotated = true;
                    }
                    var onion = elem[0].querySelector('.left-arrow');
                    onion.style['left'] = left; 
                    onion.classList.toggle('rotate-left', rotated)
                }

                function updateRightOnion(){
                    var rightIndex = onionSrvc.getRightIndex();
                    var left = getLeftPx(rightIndex, 2);
                    var rotated = false;
                    if (Number(left.replace('px', '') >= window.width - 8)){
                        left = window.width - 10 + 'px';
                        rotated = true;
                    }
                    var onion = elem[0].querySelector('.right-arrow')
                    onion.style['left'] = left; 
                    onion.classList.toggle('rotate-right', rotated)
                    
                }

                function updateLineOnion(){
                    var leftIndex = onionSrvc.getLeftIndex();
                    var rightIndex = onionSrvc.getRightIndex();
                    
                    var left = getLeftPx(leftIndex, 8);
                    var right = getLeftPx(rightIndex, 5);
                    var leftRotate = false;
                    var rightRotate = false;
                    if (Number(right.replace('px', '') > window.width - 4)){
                        right = window.width - 10 + 'px';
                        rightRotate = true;
                    }
                    if (Number(left.replace('px','')) < 4){
                        left = '5px';
                        leftRotate = true;
                    }
                    var onion = elem[0].querySelector('.arrow-line');
                    
                    //console.log(leftIndex, rightIndex)
                    onion.classList.toggle('hide', rightIndex == leftIndex)
                    
                    
                    onion.style['left'] = left; 
                    onion.style['width'] = (right.replace('px', '') - left.replace('px', '') ) + 'px'
                    onion.classList.toggle('rotate-left', leftRotate)
                    onion.classList.toggle('rotate-right', rightRotate)
                }

                function getLeftPx(index, offset){
                    if (offset == undefined) offset = 0;
                    var left = (offset + 2 + (index * frameWidth)) - window.left;
                    return left + 'px';
                }

                var container = undefined;
                function getContainer(){
                    if (container == undefined){
                        container = elem[0].querySelector('.frames-container');
                    }
                    return container;
                }
            }
        }
    }
])