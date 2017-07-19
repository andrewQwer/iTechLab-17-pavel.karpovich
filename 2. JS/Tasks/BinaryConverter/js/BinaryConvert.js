var convertibleArray = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

function BinaryConvert() {
  var ToAny = function (original, system) {
    original = parseInt(original);
    system = parseInt(system);
    var convertibleNumber = [];
    while (original != 0) {
      convertibleNumber.push(convertibleArray[original % system]);
      original = Math.floor(original / system);
    }
    return convertibleNumber.reverse();
  };

  var ToDecimal = function (original, system) {
    system = parseInt(system);
    var decimal = 0;
    for (var i = 0; i < original.length; i++) {
      decimal += Math.pow(system, i) * convertibleArray.indexOf(original.reverse()[i]);
    }
    return decimal;
  };

  this.Convert = function (number, from, to) {
    return ToAny(ToDecimal(number, from), to);
  };
}