可排序网站
http://soj.sysu.edu.cn/courses.php
http://www.runoob.com/jquery/jquery-selectors.html
https://en.wikipedia.org/wiki/Intel
http://ark.intel.com/products/family/88392/6th-Generation-Intel-Core-i7-Processors#@Desktop
http://ark.intel.com/products/family/88392/6th-Generation-Intel-Core-i7-Processors#@All

神秘代码 一行版
function sort_compare(index, is_ascend) { return function (a, b) { var a_content = $(a).find("td:nth-child(" + index + ")").text(); var b_content = $(b).find("td:nth-child(" + index + ")").text(); var flag = is_ascend ? -1 : 1; if (a_content < b_content) { return 1 * flag; } else { if (a_content > b_content) { return -1 * flag; } else { return 0; } } } } function tosort(tbody, index) { return function () { $(this).siblings().removeClass("sort_ascend sort_descend"); var is_ascend = !$(this).hasClass("sort_ascend"); if (is_ascend) { $(this).removeClass("sort_descend sort_ascend").addClass("sort_ascend"); } else { $(this).removeClass("sort_descend sort_ascend").addClass("sort_descend"); } $(tbody).append($(tbody).find("tr").sort(sort_compare(index + 1, is_ascend))); } } $("table").each(function () { var tbody = $(this).children("tbody"); $(this).find("th").each(function (index) { $(this).click(tosort(tbody, index)); }); });

神秘代码 多行版
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