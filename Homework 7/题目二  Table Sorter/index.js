function sort_compare(index, is_ascend) {
    return function (a, b) {
        var a_content = $(a).find("td:nth-child(" + index + ")").text();
        var b_content = $(b).find("td:nth-child(" + index + ")").text();
        var flag = is_ascend ? -1 : 1;
        if (a_content < b_content) {
            return 1 * flag;
        } else {
            if (a_content > b_content) {
                return -1 * flag;
            } else {
                return 0;
            }
        }
    }
}

function tosort(tbody, index) {
    return function () {
        //remove previous sort
        $(this).siblings().removeClass("sort_ascend sort_descend");
        //determind ascending or descending
        var is_ascend = !$(this).hasClass("sort_ascend");
        //set sort target
        if (is_ascend) {
            $(this).removeClass("sort_descend sort_ascend").addClass("sort_ascend");
        } else {
            $(this).removeClass("sort_descend sort_ascend").addClass("sort_descend");
        }
        //sort content
        $(tbody).append($(tbody).find("tr").sort(sort_compare(index + 1, is_ascend)));
    }
}

window.onload = function () {
    $("table").each(function () {
        var tbody = $(this).children("tbody");
        $(this).find("th").each(function (index) {
            $(this).click(tosort(tbody, index));
        });
    })
}

/*
…Ò√ÿ¥˙¬Î
function sort_compare(index, is_ascend) { return function (a, b) { var a_content = $(a).find("td:nth-child(" + index + ")").text(); var b_content = $(b).find("td:nth-child(" + index + ")").text(); var flag = is_ascend ? -1 : 1; if (a_content < b_content) { return 1 * flag; } else { if (a_content > b_content) { return -1 * flag; } else { return 0; } } } } function tosort(tbody, index) { return function () { $(this).siblings().removeClass("sort_ascend sort_descend"); var is_ascend = !$(this).hasClass("sort_ascend"); if (is_ascend) { $(this).removeClass("sort_descend sort_ascend").addClass("sort_ascend"); } else { $(this).removeClass("sort_descend sort_ascend").addClass("sort_descend"); } $(tbody).append($(tbody).find("tr").sort(sort_compare(index + 1, is_ascend))); } } $("table").each(function () { var tbody = $(this).children("tbody"); $(this).find("th").each(function (index) { $(this).click(tosort(tbody, index)); }); });
function sort_compare(index, is_ascend) {
    return function (a, b) {
        var a_content = $(a).find("td:nth-child(" + index + ")").text();
        var b_content = $(b).find("td:nth-child(" + index + ")").text();
        var flag = is_ascend ? -1 : 1;
        if (a_content < b_content) {
            return 1 * flag;
        } else {
            if (a_content > b_content) {
                return -1 * flag;
            } else {
                return 0;
            }
        }
    }
}

function tosort(tbody, index) {
    return function () {
        $(this).siblings().removeClass("sort_ascend sort_descend");
        var is_ascend = !$(this).hasClass("sort_ascend");
        if (is_ascend) {
            $(this).removeClass("sort_descend sort_ascend").addClass("sort_ascend");
        } else {
            $(this).removeClass("sort_descend sort_ascend").addClass("sort_descend");
        }
        $(tbody).append($(tbody).find("tr").sort(sort_compare(index + 1, is_ascend)));
    }
}

$("table").each(function () {
    var tbody = $(this).children("tbody");
    $(this).find("th").each(function (index) {
        $(this).click(tosort(tbody, index));
    });
});
*/