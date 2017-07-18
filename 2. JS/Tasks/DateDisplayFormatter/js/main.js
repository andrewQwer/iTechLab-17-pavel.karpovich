(function(){
	var GetData = function(){
		var dataDisplay = new DateDisplayFormatter("22022017").Parse();
	};

	document.querySelector("#getResult").addEventListener("click", GetData);
}());