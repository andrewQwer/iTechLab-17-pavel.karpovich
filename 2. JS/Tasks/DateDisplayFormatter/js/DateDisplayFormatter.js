function DateDisplayFormatter(date) {
	var _inputDate = date;
	var _day;
	this.Parse = function () {
		_day = parseInt(_inputDate.slice(0, 2));
		_month = parseInt(_inputDate.slice(2, 4));
		_year = parseInt(_inputDate.slice(4, 9));
		var inputDate = new Date(_year, _month, _day);
		console.log(inputDate.format("dd-MM-yyyy"));
	};
}