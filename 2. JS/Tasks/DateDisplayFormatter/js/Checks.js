var CheckInputDateFormat = function(inputData, inputFormat) {
  var ext = new RegExp(inputFormat.replace(/[dMy]/gi, "\\d"));
  if (!ext.test(inputData)) throw "Date and format input must coincide!";
};

var CheckInputDate = function(inputData) {
  var ext = /^[\d-\s\\]+$/gi;
  if (!ext.test(inputData)) throw "Please, check input date!";
};

var CheckInputFormat = function(inputFormat) {
  var ext = /^[dMy-\s\\]+$/gi;
  if (!ext.test(inputFormat)) throw "Please, check input format";
};

var CheckOutputFormat = function(outputFormat) {
  var ext = /^[dMy-\s\\]+$/gi;
  if (!ext.test(outputFormat)) throw "Please, check output format";
};
