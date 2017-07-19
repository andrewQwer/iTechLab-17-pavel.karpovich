function BinaryConvert() {
	this.FromDecimalToBinary = function(number) {
		var binaryNumber = [];
		number = parseInt(number);
		while(number != 0){
			binaryNumber.push(number % 2 == 0 ? 0 : 1);
			number = Math.floor(number / 2);
		}
		return binaryNumber.reverse();
	}

	this.FromBinaryToDecimal = function(number) {
		var result = 0;
		for(var i = 0; i < number.length; i++) {
			result += (number.reverse()[i] != "0") ? Math.pow(2,i) : 0;
		}
		return result;
	}
}