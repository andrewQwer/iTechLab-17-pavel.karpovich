function BinaryConvert() {
  var hexadecimalArray = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];

  this.FromDecimalToBinary = function(number) {
    var binaryNumber = [];
    number = parseInt(number);
    while (number != 0) {
      binaryNumber.push(number % 2 == 0 ? 0 : 1);
      number = Math.floor(number / 2);
    }
    return binaryNumber.reverse();
  };

  this.FromBinaryToDecimal = function(number) {
    var result = 0;
    for (var i = 0; i < number.length; i++) {
      result += number.reverse()[i] != "0" ? Math.pow(2, i) : 0;
    }
    return result;
  };

  this.FromDecimalToOctal = function(number) {
    var octalNumber = [];
    number = parseInt(number);
    while (number != 0) {
      octalNumber.push(Math.abs(Math.floor(number / 8) * 8 - number));
      number = Math.floor(number / 8);
    }
    return octalNumber.reverse();
  };

  this.FromOctalToDecimal = function(number) {
    var result = 0;
    for (var i = 0; i < number.length; i++) {
      result += number.reverse()[i] * Math.pow(8, i);
    }
    return result;
  };

  this.FromOctalToBinary = function(number) {
    return this.FromDecimalToBinary(this.FromOctalToDecimal(number));
  };

  this.FromBinaryToOctal = function(number) {
    return this.FromDecimalToOctal(this.FromBinaryToDecimal(number));
  };

  this.FromDecimalToHexadecimal = function(number) {
    var hexadecimalNumber = [];
    while (number != 0) {
      hexadecimalNumber.push(
        hexadecimalArray[Math.abs(Math.floor(number / 16) * 16 - number)]
      );
      number = Math.floor(number / 16);
    }
    return hexadecimalNumber.reverse();
  };
}
