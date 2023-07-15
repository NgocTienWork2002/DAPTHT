function Close(){
    document.getElementById('Top-Search').style.display = 'none'
}
function Open(){
    document.getElementById('Top-Search').style.display = 'block'
}
$(window).scroll(function () {
    if ($(window).scrollTop() > 48) {
        $(".navbar-default").css({
            position: "fixed",
            top: "0px",
            width: "100%",
            "z-index": "99",
            "background-color": "#ffffff",
            "box-shadow": "0 0 3px rgba(0, 0, 0, 0.2)",
        });
        $(".page-title-section").css("margin-top", "97px");
    } else {
        $(".navbar-default").css({
            position: "relative",
        });
        $(".page-title-section").css("margin-top", "0px");
    }
});