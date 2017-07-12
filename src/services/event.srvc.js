app.service('eventSrvc', [
    // deps 
    '$timeout',

    // code 
    function($timeout){
        var self = this; 

        var eventSetups = {};
        var triggers = {};
        var waiters = {};

        self.setup = function(eventName){
            if (eventSetups[eventName] != undefined){
                console.error('event was already setup', eventName);
                return;
            }

            var setup = new EventSetup(eventName);
            eventSetups[eventName] = setup;

            if (waiters[eventName]){
                $timeout(function(){
                    waiters[eventName].forEach(function(waiter){
                        waiter();
                    })
                })
            }

            return setup;
        }

        self.get = function(eventName, wait){
            if (wait == undefined){
                wait = true;
            }

            if (wait == true){
                return new Promise(function(success){
                    if (waiters[eventName] == undefined){
                        waiters[eventName] = [];
                    }
                    var table = waiters[eventName];
                    table.push(function(){
                        var setup = eventSetups[eventName];
                        var hook = new EventHook(setup);
                        success(hook)
                    });
                })
            } else {
                var setup = eventSetups[eventName];
                if (setup == undefined){
                    console.error('no event was setup for ', eventName);
                    return;
                }

                var hook = new EventHook(setup);
                return hook;
            }
        }

        /*

        eventSrvc.setup('next', {
            count: {
                required: false,
                default: 2
            }
        })

        ...

        var evt_next = eventSrvc.getEventTemplate('next')

        ...

        evt_next.fire({
            count: 1
        })

        */

        function EventHook(setup){
            var e = this;

            e.name = setup.name; 
            e.args = {};
            Object.keys(setup.args).forEach(function(key){
                var arg = setup.args[key];
                e.args[key] = {
                    default: arg.default,
                    required: arg.required
                }
            });

            e.fire = function(args){
                // match up args 
                var errors = false;
                if (args == undefined){
                    args = {};
                }
                Object.keys(setup.args).forEach(function(key){
                    var arg = setup.args[key];
                    var passed = args[key];

                    if (passed == undefined && arg.required == true){
                        console.error('event ', setup.name, ' was fired without required arg', key)
                        errors = true;
                    }
                    if (passed == undefined && arg.required == false){
                        args[key] = arg.default;
                    }
                })
                if (errors == false){
                    $timeout(function(){
                        var table = triggers[setup.name];
                        if (table != undefined){
                            table.forEach(function(trigger){
                                trigger(args);
                            })
                        }
                    })
                }
            };

            e.on = function(trigger){
                var table = triggers[setup.name];
                if (table == undefined){
                    table = [];
                    triggers[setup.name] = table;
                }
                table.push(trigger);
            }

            return e;
        }

        function EventSetup(name){
            var e = this;

            e.name = name;
            e.args = {};

            e.arg = function(name, options){
                if (options != undefined){
                    e.args[name] = {
                        required: options.required == true,
                        default: options.default
                    }
                } else {
                    e.args[name] = {
                        required: false,
                        default: undefined
                    }
                }
                return e;
            }

            e.on = function(trigger){
                var table = triggers[name];
                if (table == undefined){
                    table = [];
                    triggers[name] = table;
                }
                table.push(trigger);
            }
            

            return e;
        }

    }
])