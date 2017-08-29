/*
    Modern Web Programming
    Homework 4
    index.js
    css for index.html
    Made by Haswell
    Copyright By Haswell © 2016 All Rights Reserved.
    School of Data and Computer Science
    Sun Yat-sen University
    2016-10-04
*/
var CA = 0, CL = 0, show = "0";

var main = [];
function clearCA() {
    CA = 0;
    main = [];
}
function pretoshow() {
    //console.log("pre");
    if (main.length == 0) {
        //console.log("p0");
        return "0";
    } else {
       // console.log("p1");
        var nowshow = "";
        Array.prototype.forEach.call(main, function (a) {
            nowshow += String(a);
        });
        //console.log(nowshow);
        return nowshow;
    }
}
function toshow() {
    //console.log("toshow");
    document.getElementById("showcontent").value = pretoshow();
}
function lastrecord() {
    document.getElementById("lastcontent").value = pretoshow();
}
function lastrecordsqr() {
    document.getElementById("lastcontent").value = "("+pretoshow()+")^2";
}
function lastrecordsqrt() {
    document.getElementById("lastcontent").value = "√(" + pretoshow() + ")";
}
function toCalculate(nt) {
    if(main.length==0&&nt=="/") {
        main.push("0");
    }
    if(nt=="/") {
        if(main.length>0) {
            if(main[main.length-1]=="/") {
                return;
            }
        }
    }
    main.push(nt);
    toshow();
}
function delete1() {
    //console.log("d");
    if (CA > 0) {
        CA = 0;
        //console.log("d0");
        main = [];
        toshow();
        return;
    }
    if (main.length == 0) {
        //console.log("d1");
        toshow();
        return;
    } else {
        //console.log("d2");
        main.pop();
        toshow();
    }
}
function clearall() {
    CA = 0;
    while (main.length != 0) {
        main.pop();
    }
    document.getElementById("lastcontent").value = "";
    toshow();
}
function toanswer() {
    var anstr = "";
    Array.prototype.forEach.call(main, function (a) {
        anstr += String(a);
    });
    var ranstr = "";
    for(var i=0;i<anstr.length;i++) {
        switch (anstr[i]) {
            case "π": ranstr += String("Math.PI"); break;
            case "e":ranstr += String("Math.E"); break;
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
        //main.length = 0;
        toshow();
        alert("运算错误！请检查表达式是否正确！");
        return;
    }
    var temp = String(ans);
    if(temp=="NaN" || temp=="Infinity"||temp=="undefined") {
        //console.log("Error! Wrong input!");
        main = [];
        //main.length = 0;
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
//console.log("init!");
var normalb = document.getElementsByClassName("numb");
Array.prototype.forEach.call(normalb, function (numb) {
    numb.onclick = function () {
        if (CA > 0) {
            clearCA();
        }
        toCalculate(numb.innerText);
    }
});
//console.log("init numb completed!");
var normalb2 = document.getElementsByClassName("numb2");
Array.prototype.forEach.call(normalb2, function (numb2) {
    numb2.onclick = function () {
        if (CA > 0) {
            clearCA();
        }
        toCalculate(numb2.innerText);
    }
});
//console.log("init numb2 completed!");
document.getElementById("delet").onclick = function () {
    delete1();
};
//console.log("init delet completed!");
document.getElementById("c").onclick = function () {
    clearall();
};
document.getElementById("sqr").onclick = function () {
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
};
//console.log("init sqr completed");
document.getElementById("sqrt").onclick = function () {
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
};
//console.log("init sqrt completed");
var toolb = document.getElementsByClassName("tool");
Array.prototype.forEach.call(toolb, function (tool) {
    tool.onclick = function () {
        CA = 0;
        toCalculate(tool.innerText);
    }
});
//console.log("init tool completed!");
document.getElementById("equa").onclick = function () {
    CA = 1;
    if (main.length == 0) {
        lastrecord();
        getanswer("0");
    } else {
        lastrecord();
        getanswer(toanswer());
    }
};
//console.log("init equal completed!")

