$(window).load(function () {
    var submitButton = $('.submit-box input').eq(0);
    submitButton.mouseenter(function () {
        $(this).toggleClass('submit-active', true);
    });
    submitButton.mouseleave(function () {
        $(this).toggleClass('submit-active', false);
    });
    submitButton.click(function (event) {
        event.preventDefault();
        $.post('./api/sign_out', {}, function (json) {
            window.location.replace('./');
        });
    });
});
