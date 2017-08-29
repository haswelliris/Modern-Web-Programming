function s5OnClick(event, callback) {
    //not disabled or calculated
    if (!$(this).hasClass("disabled") && $(this).children(".number:hidden").length) {
        callback = arguments[1] ? arguments[1] : infoBar;
        //waiting...
        $(this).children(".number").text("...").show();
        //disabled others
        $(this).siblings().addClass("disabled");
        //console.log(this);
        var thisButton = this;
        $.get('/' + this.id, function (data) {
            //console.log(thisButton);
            if (!$(thisButton).hasClass("disabled") && !$(thisButton).children(".number:hidden").length) {
                $(thisButton).children(".number").text(data);
                $(thisButton).addClass("disabled");
                //disabled this bottun
                $(thisButton).siblings(":has(.number:hidden)").removeClass("disabled");
                //enabled other
                callback.call(thisButton);
            }
        });
    }
}

function s5InforBar(event, callback) {
    if (!$(this).hasClass("disabled")) {
        var total = 0;
        $(".number").each(function () {
            total += parseInt($(this).text());
        });
        $(".info").text(total);
        //console.log(total);
        $(this).addClass("disabled");
        if ($.isFunction(callback))
            callback.call(this);
    }
}

function infoBar() {
    if (!$(".button:not(.disabled),.button:has(.number:hidden)").length) {
        $("#info-bar").removeClass("disabled");
        //console.log("enabled infobar");
    }
}

//construct random list
function suiji(origin) {
    var randomList = [];
    while (origin.length) {
        var now = Math.floor(Math.random() * origin.length);
        randomList.push(origin[now]);
        origin.splice(now, 1);
    }
    return randomList;
}

//show the message
function show(theMessage) {
    $("#message").text(theMessage);
}

function handlerCore(probability, currentSum, thisButton, succeedMessage, failedMessage, callback) {
    $(thisButton).trigger('click', function () {
        if (Math.random() < probability) {
            infoBar();
            callback(null, succeedMessage, currentSum + parseInt($(thisButton).children(".number").text()));
        } else {
            $(thisButton).children(".number").hide();
            $(thisButton).removeClass("disabled");
            callback({ message: failedMessage, currentSum: currentSum }, null, null);
        }
    });
}

function aHandler(currentSum, callback) {
    handlerCore(0.5, currentSum, $("#A"), "A:这是一个天大的秘密", "A:这不是一个天大的秘密", callback);
}

function bHandler(currentSum, callback) {
    handlerCore(0.5, currentSum, $("#B"), "B:我不知道", "B:我知道", callback);
}

function cHandler(currentSum, callback) {
    handlerCore(0.5, currentSum, $("#C"), "C:你不知道", "C:你知道", callback);
}

function dHandler(currentSum, callback) {
    handlerCore(0.5, currentSum, $("#D"), "D:他不知道", "D:他知道", callback);
}

function eHandler(currentSum, callback) {
    handlerCore(0.5, currentSum, $("#E"), "E:才怪", "E:才不怪", callback);
}

window.onload = function () {
    $("#button").on("mouseenter", function () {
        //init
        $(".number").hide();
        $(".button").removeClass("disabled");
        $(".info").text("");
        $("#info-bar").addClass("disabled");
        $("#message").text("");
    });
    $(".button").click(s5OnClick);
    $("#info-bar").click(s5InforBar);
    //whenever click icon procedure will start
    $(".icon").click(function () {
        console.log("s5");
        $("#button").trigger("mouseenter");
        //get random list
        var order = "";
        var oneByOneCallBack = [];
        var handlers = suiji([aHandler, bHandler, cHandler, dHandler, eHandler]);
        //show the random string
        handlers.forEach(function (bt) {
            //console.log(bt);
            //fucntion {abcde
            order += bt.toString()[9].toUpperCase();
        });
        //show(order);
        $("#message").text(order);
        //show that string
        for (var i = 0; i < handlers.length; ++i) {
            (function (i) {
                console.log(i);
                oneByOneCallBack[i] = function (currentSum) {
                    handlers[i](currentSum, function (err, message, currentSum) {
                        if (err) {
                            show(err.message);
                            oneByOneCallBack[i](err.currentSum);
                        } else {
                            show(message);
                            oneByOneCallBack[i + 1](currentSum);
                        }
                    });
                };
            })(i);
        }
        oneByOneCallBack[handlers.length] = function () {
            console.log(handlers.length);
            $("#info-bar").trigger('click', function () {
                show("大气泡：楼主异步调用战斗力感人，目测不超过" + $(".info").text());
            });
        };
        oneByOneCallBack[0](0);
        console.log("end s5");
    });
}