function DateDisplayFormatter(date) {
	_inputDate = date;
	this.Parse = function() {
		var day = _inputDate.slice(0,2);
		var month = _inputDate.slice(3, 5);
		var year = _inputDate.slice(6,9);
		console.log(day + " " + month + " " + year);
		var inputDate = new Date("22-10-2018");
		console.log(inputDate);
	}
}