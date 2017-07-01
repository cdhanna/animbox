var x = 0;

app.directive('frames', [
    // deps 

    // code 
    function(){
        return {
            templateUrl: 'directives/frames/frames.dir.html',
            link: function(scope, elem, attrs){
                
                scope.getFrames = function(){
                    x = [];
                    for (var i = 0 ; i < 300 ; i ++){
                        x.push(i)
                    }
                    return x
                }


                setInterval(function(){
                    left = x*19 + 'px';
                    elem[0].querySelector('.frame-selector').style['left'] = left
                })

            }
        }
    }
])