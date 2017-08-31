(function() {
  var _inputData;
  var _inputFormat;
  var _outputFormat;

  var CheckInputs = function() {
    _inputData = document.querySelector("#inputDate").value;
    _inputFormat = document.querySelector("#inputFormat").value;
    _outputFormat = document.querySelector("#outputFormat").value;
    //CheckInputDate();
    if (_inputFormat != "") {
      //CheckInputFormat(_inputFormat);
      CheckInputDateFormat(_inputData, _inputFormat);
    }
    if (_outputFormat != "") {
      //CheckOutputFormat(_outputFormat);
    }
  };

  var OutputDate = function(result) {
    document.querySelector("#result").innerHTML =
      "Input date: " + _inputData + "<br>" + result;
  };

  var GetData = function() {
    try {
      CheckInputs();
      var dataDisplay = "Output date: " + new DateDisplayFormatter(
        _inputData,
        _inputFormat,
        _outputFormat
      ).Parse();
      OutputDate(dataDisplay);
    } catch (error) {
      alert("Error! " + error);
      return;
    }
  };

  var GetDataWithFullMonth = function() {
    try {
      CheckInputs();
      var dataDisplay = "Output date: " + new DateDisplayFormatter(
        _inputData,
        _inputFormat,
        "dd MMMM yyyy"
      ).Parse();
      OutputDate(dataDisplay);
    } catch (error) {
      alert("Error! " + error);
      return;
    }
  }

  var GetDayAgo = function() {
    try {
      CheckInputs();
      var dataDisplay =
        "Day ago: " +
        new DateDisplayFormatter(
          _inputData,
          _inputFormat,
          _outputFormat
        ).DayAgo();
      OutputDate(dataDisplay);
    } catch (error) {
      alert("Error! " + error);
      return;
    }
  };

  var GetMonthAgo = function() {
    try {
      CheckInputs();
      var dataDisplay =
        "Month ago: " +
        new DateDisplayFormatter(
          _inputData,
          _inputFormat,
          _outputFormat
        ).MonthAgo();
      OutputDate(dataDisplay);
    } catch (error) {
      alert("Error! " + error);
      return;
    }
  };

  var GetYearAgo = function() {
    try {
      CheckInputs();
      var dataDisplay =
        "Year ago: " +
        new DateDisplayFormatter(
          _inputData,
          _inputFormat,
          _outputFormat
        ).YearAgo();
      OutputDate(dataDisplay);
    } catch (error) {
      alert("Error! " + error);
      return;
    }
  };

  document.querySelector("#getResult").addEventListener("click", GetData);
  document.querySelector("#dayResultWithFullMonth").addEventListener("click", GetDataWithFullMonth);
  document.querySelector("#dayAgo").addEventListener("click", GetDayAgo);
  document.querySelector("#monthAgo").addEventListener("click", GetMonthAgo);
  document.querySelector("#yearAgo").addEventListener("click", GetYearAgo);
})();
