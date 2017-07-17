Array.prototype.swap = function (x, y) {
	var temp = this[y];
	this[y] = this[x];
	this[x] = temp;
};