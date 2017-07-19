Array.prototype.swap = function (x, y) { 
  var temp = this[y]; 
  this[y] = this[x]; 
  this[x] = temp; 
};

Array.prototype.peek = function () { 
  return this[0]; 
};