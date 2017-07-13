/**
 * Created by pavel.karpovich on 7/13/2017.
 */

(function () {
    var user = function (user, pass) {
        var _user = user;
        var _pass = pass;

        this.getInfo = function () {
            document.write("Object User [user: " + _user + ", pass: " + _pass + "]");
        };
    }

    var admin = function (user, pass, role) {
        //user.call(this, user, pass);
        var _role = role;


        this.getInfo = function () {
            document.write("role: " + _role)
        }

        this.reg = function (str) {
            var regex = /^\+\d{3} \d{2} \d{2}-\d{3}-\d{2}$/;
            if (regex.test(str)) {
                console.log(str + " - OK!")
            } else {
                console.log(str + " - NO!")
            }
        }
    }

    user.prototype.surname = function () {
        console.log(this.user);
    }

    var user1 = new user("taller", "123456789");

    user1.getInfo();
    var user2 = new user("liza", "98766544321");
    user2.getInfo();
    user2.surname();
    var ad = new admin("taller", "1334", "role");
    ad.reg("+375 29 57-211-78");
    ad.reg("+375 29 57 211-78");
    var inc = 0;

    function getTime(event) {
        document.getElementById("time").innerHTML = new Date().toTimeString();
        inc+=50;
        console.log(inc);
        document.querySelector("#time").style.color = "rgb(255, " + inc + ", 255)";
        event.target.style.background = "black";
        console.log(event.timeStamp);
    }


    document.getElementById("time").addEventListener("click", getTime);
})();
