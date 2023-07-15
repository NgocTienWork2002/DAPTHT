$(window).scroll(function () {
    if ($(window).scrollTop() > 48) {
        $(".navbar").css({
            position: "fixed",
            top: "0px",
            width: "100%",
            "z-index": "99",
            "background-color": "#ffffff",
            "box-shadow": "0 0 3px rgba(0, 0, 0, 0.2)",
        });
        $(".banner").css("margin-top", "97px");
    } else {
        $(".navbar").css({
            position: "relative",
        });
        $(".banner").css("margin-top", "0px");
    }
});
