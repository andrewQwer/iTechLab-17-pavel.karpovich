(function() {
  var _from;
  var _to;
  var _number;

  var GetFrom = function() {
    var options = document.getElementsByName("from");
    var value;
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) value = options[i].value;
    }
    _from = value;
  };

  var GetTo = function() {
    var options = document.getElementsByName("to");
    var value;
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) value = options[i].value;
    }
    _to = value;
  };

  var SwitchConverter = function() {
    var result;
    if (_from == 10 && _to == 2)
      result = new BinaryConvert().FromDecimalToBinary(_number);
    else if (_from == 2 && _to == 10) {
      CheckBinaryNumber(_number);
      result = new BinaryConvert().FromBinaryToDecimal(_number);
    } else if(_from == 10 && _to == 8) {
      result = new BinaryConvert().FromDecimalToOctal(_number);
    } else if(_from == 8 && _to == 10) {
      result = new BinaryConvert().FromOctalToDecimal(_number);
    } else if(_from == 8 && _to == 2) {
      result = new BinaryConvert().FromOctalToBinary(_number);
    } else if(_from == 2 && _to == 8) {
      CheckBinaryNumber(_number);
      result = new BinaryConvert().FromBinaryToOctal(_number);
    } else if(_from == 10 && _to == 16) {
      result = new BinaryConvert().FromDecimalToHexadecimal(_number);
    }
    return result;
  };

  var OutputResult = function(result) {
    if (isNaN(result)) {
      var temp = "";
      for (var i = 0; i < result.length; i++) {
        temp += result[i];
      }
      result = temp;
    }

    document.querySelector("#result").innerHTML = "Result = " + result;
  };

  var Convert = function() {
    try {
      _number = document.querySelector("#inputNumber").value;
      CheckInputNumber(_number);
      GetFrom();
      GetTo();
      CheckFromAndTo(_from, _to);
      var result = SwitchConverter();
      OutputResult(result);
    } catch (error) {
      alert("Error! " + error);
      return;
    }
  };

  document.querySelector("#convertNumber").addEventListener("click", Convert);
})();
