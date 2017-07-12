app.service('workspaceSrvc', [
    // deps 

    // code 
    function(){
        var self = this;

        // node deps 
        var fs = require('fs');

        var current = undefined;

        self.getCurrent = function(){
            return current;
        }

        self.loadProject = function(path){
            var project = JSON.parse(fs.readFileSync(path + '/.project', 'utf8'));

            current = new Workspace();
            current.project = project; 
            current.path = path;

        }

        self.loadProject(__dirname + '/../data/workspace1')

        return self;
    }
])