function DateDisplayFormatter(date, inputFormat, outputFormat) {
  var _inputDate = date + "";
  var _day = "";
  var _month = "";
  var _year = "";
  var _date = Date();

  var Constructor = function() {
    _inputFormat = (inputFormat == "") ? "ddMMyyyy" : inputFormat;
    _outputFormat = (outputFormat == "") ? "dd-MM-yyyy" : outputFormat;
    ParseDateFromFormat();
  };

  var CheckDate = function(day, month) {
    day = parseInt(day);
    month = parseInt(month);
    if(day > 31 || day < 1)
      throw "Day must be between 1 and 31";
    if(month > 12 || month < 1)
      throw "Month must be between 1 and 12";
  }

  var ParseDateFromFormat = function() {
    for (var i = 0; i < _inputFormat.length; i++) {
      switch (_inputFormat[i]) {
        case "y":
          _year += _inputDate[i];
          break;
        case "M":
          _month += _inputDate[i];
          break;
        case "d":
          _day += _inputDate[i];
          break;
      }
    }
    _month = parseInt(_month) - 1; // because, month start with zero
    CheckDate(_day, _month);
    _date = new Date(_year, _month, _day);
  };

  this.DayAgo = function() {
    return Math.floor((new Date().getTime() - _date) / (1000 * 60 * 60 * 24));
  };

  this.MonthAgo = function() {
    return Math.floor(
      (new Date().getTime() - _date) / (1000 * 60 * 60 * 24 * 30)
    );
  };

  this.YearAgo = function() {
    return Math.floor(
      (new Date().getTime() - _date) / (1000 * 60 * 60 * 24 * 30 * 12)
    );
  };

  this.Parse = function() {
    return _date.format(_outputFormat);
  };

  Constructor();
}
