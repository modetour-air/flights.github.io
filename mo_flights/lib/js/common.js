$(document).ready(function () {
    // 공통팝업 열기
    $(".pop_btn").click(function () {
        $($.attr(this, "href")).show();
        $("html,body").css({ overflow: "hidden" });
        return false;
    });
    // 공통팝업 닫기
    $(".pop_top .icon_x").click(function () {
        $(this).closest(".pop_cont").toggle();
        $("html,body").removeAttr("style");
        return false;
    });

    // 셀렉트 박스
    $(".select_layer").click(function () {
        $(this).toggleClass("on").next(".select_option").slideToggle();
        return false;
    });
});
