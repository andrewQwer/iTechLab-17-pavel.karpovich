var CheckInputNumber = function (value) {
	var ext = /^\d+$/;
	number = value;
	if (!ext.test(number)) throw "Please, check input number !";
};

var CheckBinaryNumber = function (value) {
	var ext = /^[01]+$/;
	number = value;
	if (!ext.test(number)) throw "Please, check input binary number";
};

var CheckFromAndTo = function (from, to) {
	if (from === to) throw "Number systems must be different";
}