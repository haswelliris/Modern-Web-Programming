/*
    Modern Web Programming
    Homework 5
    maze.js
    js for maze.html
    Made by Haswell
    Copyright By Haswell © 2016 All Rights Reserved.
    School of Data and Computer Science
    Sun Yat-sen University
    2016-10-16
*/
function gameover() {
    var walls2 = document.getElementsByClassName("wall");
    while (walls2.length) {
        walls2[0].className = "wall_gameover";
    }
}
function startgame() {
    var walls2 = document.getElementsByClassName("wall_gameover");
    while (walls2.length) {
        walls2[0].className = "wall";
    }
    document.getElementById("maze").style.cursor = "pointer";
}
window.onload = function () {
    //alert("菜鸡的作业，评论请勿手下留情，万分感谢您提出的宝贵意见");
    var hint = document.getElementById("hint");
    var start_flag = false;
    var check_flag = false;
    //Game Over
    var walls = document.getElementsByClassName("wall");
    Array.prototype.forEach.call(walls, function (a) {
        a.onmouseover = function () {
            document.getElementById("maze").style.cursor = "default";
            if (start_flag) {
                start_flag = false;
                //gameover();
                hint.className="warning";
                hint.textContent = "You Lose";
                //just a div
                a.className = "wall_gameover";
            }
        }
    });
    //wall reset
    document.getElementById("maze").onmouseleave = function () {
        var walls2 = document.getElementsByClassName("wall_gameover");
        while (walls2.length) {
            walls2[0].className = "wall";
        }
    }
    //start game
    document.getElementById("start").onmouseover = function () {
        start_flag = true;
        check_flag = false;
        startgame();
        hint.className = "normal";
        hint.textContent = "Game begin!";
    }
    //end game
    document.getElementById("end").onmouseover = function () {
        document.getElementById("maze").style.cursor = "default";
        if (start_flag) {
            if (check_flag) {
                hint.className = "warning";
                hint.textContent = "You Win";
                check_flag = false;
            } else {
                hint.className = "warning";
                hint.textContent = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
                //gameover();
            }
            start_flag = false;
        }
    }
    //cheat check
    document.getElementById("check").onmouseover = function () {
        check_flag = true;
    }
}