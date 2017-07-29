class DateTime {
	static GetDate(dateTime) {
		let day = dateTime.getDate();
		let month = dateTime.getMonth() + 1;
		let year = dateTime.getFullYear();
		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;
		return `${year}-${month}-${day}`;
	}

	static GetTime(dateTime) {
		let hour = dateTime.getHours();
		let min = dateTime.getMinutes();
		hour = hour < 10 ? `0${hour}` : hour;
		min = min < 10 ? `0${min}` : min;
		return `${hour}:${min}`;
	}

	static GetFullDate(dateTime) {
		return `${this.GetDate(dateTime)} ${this.GetTime(dateTime)}`;
	}

	static CompareDate(date1, date2) {
		date2 = new Date(date2);
		let result = 1;
		result = date1.getMinutes() >= date2.getMinutes() ? 1 : -1;
		result = date1.getHours() >= date2.getHours() ? 1 : -1;
		result = date1.getDay() >= date2.getDay() ? 1 : -1;
		result = date1.getMonth() >= date2.getMonth() ? 1 : -1;
		result = date1.getFullYear() >= date2.getFullYear() ? 1 : -1;
		return result;
	}
}

export default DateTime;
