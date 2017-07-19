var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

Date.prototype.format = function(format) {
  dataFormatRegex = {
    "y{4}": this.getFullYear(),
    "M{4}": month[this.getMonth()],
    "M{2}": this.getMonth() + 1,  // month start with zero
    "d{2}": this.getDate()
  };

  for (var regex in dataFormatRegex) {
    if(/(y+)/.test(format))
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    if (new RegExp("(" + regex + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 || RegExp.$1 == "MMMM"
          ? dataFormatRegex[regex]
          : ("00" + dataFormatRegex[regex]).substr(
              ("" + dataFormatRegex[regex]).length
            )
      );
    }
  }
  return format;
};
