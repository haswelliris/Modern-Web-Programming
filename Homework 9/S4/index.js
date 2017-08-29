function s4OnClick(event, callback) {
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

function s4InforBar(event, callback) {
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

window.onload = function () {
    $("#button").on("mouseenter", function () {
        //init
        $(".number").hide();
        $(".button").removeClass("disabled");
        $(".info").text("");
        $("#info-bar").addClass("disabled");
        $("#message").text("");
    });
    $(".button").click(s4OnClick);
    $("#info-bar").click(s4InforBar);
    //whenever click icon procedure will start
    $(".icon").click(function () {
        console.log("s4");
        $("#button").trigger("mouseenter");
        //get random list
        var buttons = suiji($(".button"));
        var oneByOneCallBack = [];
        //show the random string
        var order = "";
        buttons.forEach(function (bt) {
            order += bt.id;
        });
        $("#message").text(order);
        //show that string
        for (var i = 0; i < buttons.length; ++i) {
            (function (i) {
                console.log(i);
                oneByOneCallBack[i] = function () {
                    $(buttons[i]).triggerHandler('click', function () {
                        infoBar();
                        console.log(this.id);
                        oneByOneCallBack[i + 1]();
                    });
                };
            })(i);
        }
        oneByOneCallBack[buttons.length] = function () {
            console.log(buttons.length);
            $("#info-bar").trigger('click');
        };
        oneByOneCallBack[0]();
        console.log("end s4");
    });
}