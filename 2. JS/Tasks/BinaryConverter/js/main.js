(function () {
  var _from;
  var _to;
  var _number;

  var OutputResult = function (result) {
      var temp = "";
      for (var i = 0; i < result.length; i++) {
        temp += result[i];
      }
    document.querySelector("#result").innerHTML = "Result = " + temp;
  };

  var Convert = function () {
    try {
      _number = document.querySelector("#inputNumber").value.toUpperCase();
      _from = document.querySelector("#from").value;
      _to = document.querySelector("#to").value;
      CheckInputValue(_number, _from);
      var result = new BinaryConvert().Convert(_number, _from, _to);
      OutputResult(result);
    } catch (error) {
      alert("Error! " + error);
      return;
    }
  };

  document.querySelector("#convertNumber").addEventListener("click", Convert);

  document.querySelector("#from").addEventListener("mousemove", function (event) {
      document.querySelector("#fromValue").innerHTML = event.target.value;
    });

  document.querySelector("#to").addEventListener("mousemove", function (event) {
      document.querySelector("#toValue").innerHTML = event.target.value;
    });
})();