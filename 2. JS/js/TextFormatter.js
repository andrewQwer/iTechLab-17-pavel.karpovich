/**
 * Created by pavel.karpovich on 7/14/2017.
 */
(function() {
    function TextFormatter(input){
        var inputString = input;

        this.wordWrap = function() {
            var etc = /\b(\w+)/gi;
            return inputString.match(etc);
        }

        this.offersWrap = function() {
            var etc = /[\w\s\d]*[.?!]/gi;
            return inputString.match(etc);
        }

        this.symbolWrap = function() {
            var etc = /[\w\s\d]*[$!@#%&:]\s?/gi;
            return inputString.match(etc);
        }

        this.print = function() {
            var output = this.symbolWrap();
            output.forEach(function (element, index, array) {
                document.querySelector("#result").innerHTML += element + "<br>";
            })
        }
    }

    var click = function() {
        var text = new TextFormatter(document.querySelector("#input").value);
        text.print();
    };

    document.querySelector("#send").addEventListener("click", click);
})();

