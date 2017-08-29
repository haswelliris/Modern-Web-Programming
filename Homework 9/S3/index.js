function s3OnClick(event, callback) {
    //not disabled or calculated
    if (!$(this).hasClass("disabled") && $(this).children(".number:hidden").length) {
        callback = arguments[1] ? arguments[1] : infoBar;
        //waiting...
        $(this).children(".number").text("...").show();
        //disabled others
        //$(this).siblings().addClass("disabled");
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

function s3InforBar(event, callback) {
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

window.onload = function () {
    $("#button").on("mouseenter", function () {
        $(".number").hide();
        $(".button").removeClass("disabled");
        $(".info").text("");
        $("#info-bar").addClass("disabled");
    });
    $(".button").click(s3OnClick);
    $("#info-bar").click(s3InforBar);
    //whenever click icon procedure will start
    $(".icon").click(function () {
        console.log("s3");
        $("#button").trigger("mouseenter");
        var buttons = $(".button"), oneByOneCallBack = [];
        for (var i = 0; i < buttons.length; ++i) {
            console.log(i);
            $(buttons[i]).triggerHandler('click', function () {
                infoBar();
                console.log(i);
                $("#info-bar").trigger('click');
            });
        }
        console.log("end s3");
    });
}