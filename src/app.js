var app = angular.module('animbox', []) 

app.controller('mainCtrl', [
    // deps 
    '$scope', 
    'frameSrvc', 
    'onionSrvc',
    'workspaceSrvc', 
    'windowSrvc',
    'eventSrvc',
    'keyboardSrvc',
    'inputSrvc',
    '$timeout',
    // code 
    function($scope, frameSrvc, onionSrvc, workspaceSrvc, windowSrvc, eventSrvc, keyboardSrvc, inputSrvc, $timeout){


        $scope.title = 'Animator'
        $scope.getName = function(){
            return workspaceSrvc.getCurrent().project.name;
        }

        $scope.nextFrame = function(){
            frameSrvc.nextFrame();
        }
        $scope.prevFrame = function(){
            frameSrvc.prevFrame();
        }

        $scope.onionLeft= function(change){
            onionSrvc.changeLeft(change);
        }
        $scope.onionRight = function(change){
            onionSrvc.changeRight(change);
        }

        var leftInterval = undefined;

        $scope.windowLeftStart = function(change){
            windowSrvc.changeLeft(change * 60, 'unnamed0')
            leftInterval = setInterval(function(){
                $timeout(function(){
                    // windowSrvc.getWindow('unnamed0').left += change;
                })
            }, 1)
        }

        $scope.windowLeftStop = function(){
            clearInterval(leftInterval)
        }


    }
])