function Window(){
    var self = this;

    self.name = undefined;

    self.left = 0;
    self.width = 0;
    self.padding = 5;

    self.getRight = function(){
        return self.left + self.width;
    }
}