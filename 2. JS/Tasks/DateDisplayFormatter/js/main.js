(function() {
  var GetData = function() {
    var dataDisplay = new DateDisplayFormatter("15052011").YearAgo();
    console.log(dataDisplay);
  };

  document.querySelector("#getResult").addEventListener("click", GetData);
})();
