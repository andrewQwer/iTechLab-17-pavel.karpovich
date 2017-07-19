var CheckInputValue = function (value, from) {
	var ext = /^[\w\d]+$/gi;
	if (!ext.test(value))
		throw "Please, check input value!";

	for (var i = 0; i < value.length; i++) {
		if (from < convertibleArray.indexOf(value[i]) + 1)
			throw "Please, check system number!";
	}
};