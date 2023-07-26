function handle() {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 48) {
            $(".header__navbar").css({
                position: "fixed",
                top: "0px",
                width: "100%",
                "z-index": "99",
                "background-color": "#ffffff",
                "box-shadow": "0 0 3px rgba(0, 0, 0, 0.2)",
            });
            $(".header__banner").css("margin-top", "97px");
        } else {
            $(".header__navbar").css({
                position: "relative",
            });
            $(".header__banner").css("margin-top", "0px");
        }
    });
}

handle();
