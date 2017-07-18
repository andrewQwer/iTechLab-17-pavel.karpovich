(function(){
	var GetData = function(){
		var dataDisplay = new DateDisplayFormatter("19072017").Parse();
	};

	document.querySelector("#getResult").addEventListener("click", GetData);
}());