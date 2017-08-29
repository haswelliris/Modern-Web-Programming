/*
    Modern Web Programming
    Homework 5
    whac-a-mole.js
    js for whac-a-mole.html
    Made by Haswell
    Copyright By Haswell © 2016 All Rights Reserved.
    School of Data and Computer Science
    Sun Yat-sen University
    2016-10-16
*/
window.onload = function () {
    //HTML init
    //alert("菜鸡的作业，评论请勿手下留情，万分感谢您提出的宝贵意见");
    var gamecontent = document.getElementById("game_content");
    for (var i = 0; i < 6 * 10; i++) {
        var mole = document.createElement("input");
        mole.className = "mole";
        mole.type = "radio";
        mole.tag = 0;
        mole.onclick = function () {
            this.checked = false;
            this.tag = 0;
            checkwrong();
            //console.log("default");
        };
        mole.checked = false;
        gamecontent.appendChild(mole);
        //console.log("init" + i);
    }
    //JS init
    var begin = false;
    var pause = false;
    function rungame() {
        //console.log("NEXT");
        var moles = document.getElementsByClassName("mole");
        var nextmole = Math.floor(Math.random() * moles.length);
        //console.log(nextmole);
        if (begin && !pause) {
            //console.log("send to next " + nextmole);
            moles[nextmole].onclick = function () {
                if (begin && pause == false) {
                    //console.log("right1");
                    checkright();
                    this.onclick = function () {
                        this.checked = false;
                        this.tag = 0;
                        checkwrong();
                        //console.log("checkwrong");
                    }
                    this.checked = false;
                    this.tag = 0;
                    rungame();
                } else {
                    //console.log("right2");
                    this.checked = true;
                    this.tag = 1;
                }
            }
            moles[nextmole].checked = true;
            moles[nextmole].tag = 1;
        }
    }
    var clock, time, timer, score;
    var gameinfo = document.getElementById("game-info");
    var nowtime = document.getElementById("time");
    var nowscore = document.getElementById("score");
    function checkright() {
        if (begin && !pause) {
            //console.log("score++ " + score);
            score++;
            nowscore.value = score;
            //console.log("score: " + score);
        }
    }
    function checkwrong() {
        if (begin && !pause) {
            //console.log("score-- " + score);
            score--;
            nowscore.value = score;
            //console.log("score: " + score);
        }
        //this.checked = false;
        //this.tag = 0;
        //console.log("thiswrong");
    }
    document.getElementById("start_button").onclick = function () {
        if (begin) {
            if (pause) {
                //continue;
                pause = false;
                gameinfo.value = "Playing";
                nowtime.value = time;
                clock = setInterval(function () {
                    if (time == 0) {
                        endgame();
                        return;
                    }
                    time--;
                    nowtime.value = time;
                }, 1000);
            } else {
                //pause
                pause = true;
                gameinfo.value = "Game Stop";
                clearInterval(clock);
            }
        } else {
            //begin the game
            begin = true;
            pause = false;
            gameinfo.value = "Playing";
            time = 30;
            score = 0;
            //console.log("start s "+score);
            //resetradio();
            nowtime.value = time;
            nowscore.value = score;
            rungame();
            clock = setInterval(function () {
                if (time == 0) {
                    endgame();
                    return;
                }
                time--;
                nowtime.value = time;
            }, 1000);
        }
    }
    function endgame() {
        if (begin) {
            clearInterval(clock);
            alert("Game Over.\nYour score is: " + score);
            gameinfo.value = "Game Over";
        }
        begin = false;
        pause = false;
        resetradio();
    }
    function resetradio() {
        var moless = document.getElementsByClassName("mole");
        Array.prototype.forEach.call(moless, function (a) {
            a.checked = false;
            a.tag = 0;
            a.onclick = function () {
                this.checked = false;
                this.tag = 0;
                checkwrong();
                //console.log("default");
            };
        });
    }
}