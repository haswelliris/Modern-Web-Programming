var CA = 0, main = [];
function clearCA() {
    CA = 0;
    main = [];
}
function pretoshow() {
    if (main.length == 0) {
        return "0";
    } else {
        var nowshow = "";
        Array.prototype.forEach.call(main, function (a) {
            nowshow += String(a);
        });
        return nowshow;
    }
}
function toshow() {
    //console.log("toshow");
    $("#showcontent").val(pretoshow());
}
function lastrecord() {
    $("#lastcontent").val(pretoshow());
}
function lastrecordsqr() {
    $("#lastcontent").val("(" + pretoshow() + ")^2");
}
function lastrecordsqrt() {
    $("#lastcontent").val("√(" + pretoshow() + ")");
}
function toCalculate(nt) {
    if (main.length == 0 && nt == "/") {
        main.push("0");
    }
    if (nt == "/") {
        if (main.length > 0) {
            if (main[main.length - 1] == "/") {
                return;
            }
        }
    }
    main.push(nt);
    toshow();
}
function delete1() {
    if (CA > 0) {
        CA = 0;
        main = [];
        toshow();
        return;
    }
    if (main.length == 0) {
        toshow();
    } else {
        main.pop();
        toshow();
    }
}
function clearall() {
    CA = 0;
    while (main.length != 0) { main.pop(); }
    document.getElementById("lastcontent").value = "";
    toshow();
}
function toanswer() {
    var anstr = "";
    Array.prototype.forEach.call(main, function (a) {
        anstr += String(a);
    });
    var ranstr = "";
    for (var i = 0; i < anstr.length; i++) {
        switch (anstr[i]) {
            case "π": ranstr += String("Math.PI"); break;
            case "e": ranstr += String("Math.E"); break;
            default: ranstr += String(anstr[i]); break;
        }
    }
    return ranstr;
}
function getanswer(anstr) {
    //console.log("calculating...");
    try {
        var ans = eval(anstr);
    }
    catch (err) {
        // console.log("Error! Wrong input!");
        main = [];
        toshow();
        alert("运算错误！请检查表达式是否正确！");
        return;
    }
    var temp = String(ans);
    if (temp == "NaN" || temp == "Infinity" || temp == "undefined") {
        //console.log("Error! Wrong input!");
        main = [];
        toshow();
        alert("运算错误！请检查表达式是否正确！");
        return;
    }
    //console.log("calculated!");
    main = [];
    Array.prototype.forEach.call(temp, function (a) {
        main.push(a);
    });
    toshow();
}

window.onload = function () {
    //console.log("init!");
    $(".numb").each(function () {
        $(this).click(function () {
            if (CA > 0) {
                clearCA();
            }
            toCalculate($(this).text());
        });
    });
    //console.log("init numb completed!");

    $(".numb2").each(function () {
        $(this).click(function () {
            if (CA > 0) {
                clearCA();
            }
            toCalculate($(this).text());
        });
    });
    //console.log("init numb2 completed!");

    $("#delet").click(function () {
        delete1();
    });
    //console.log("init delet completed!");

    $("#c").click(function () {
        clearall();
    });
    $("#sqr").click(function () {
        CA = 1;
        if (main.length == 0) {
            main.push("0");
            lastrecordsqr();
            var ans = "Math.pow(" + toanswer() + ",2)";
            getanswer(ans);
        } else {
            lastrecordsqr();
            var ans = "Math.pow(" + toanswer() + ",2)";
            getanswer(ans);
        }
    });
    //console.log("init sqr completed");

    $("#sqrt").click(function () {
        CA = 1;
        if (main.length == 0) {
            main.push("0");
            lastrecordsqrt();
            var ans = "Math.sqrt(" + toanswer() + ")";
            getanswer(ans);
        } else {
            lastrecordsqrt();
            var ans = "Math.sqrt(" + toanswer() + ")";
            getanswer(ans);
        }
    });
    //console.log("init sqrt completed");

    $(".tool").each(function () {
        $(this).click(function () {
            CA = 0;
            toCalculate($(this).text());
        });
    });
    //console.log("init tool completed!");

    $("#equa").click(function () {
        CA = 1;
        if (main.length == 0) {
            lastrecord();
            getanswer("0");
        } else {
            lastrecord();
            getanswer(toanswer());
        }
    });
    //console.log("init equal completed!")
}