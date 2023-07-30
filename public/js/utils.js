function handleScroll() {
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

const handleLogout = () => {
    localStorage.removeItem("profile");
    window.location.href = "/login";
};

const handleGetName = () => {
    const profile = localStorage.getItem("profile");
    if (profile) {
        const { userName } = JSON.parse(profile);
        let html = $(`
            <span class='user__name-span'>Hello ${userName}!</span>
            <button class='buttonLogout' onclick="handleLogout()">Logout</button>
        `);
        $("#isAuthenticated").append(html);
    } else {
        let html = $(`<a href="/login">Login</a>`);
        $("#isAuthenticated").append(html);
    }
};

const disableButton = () => {
    let profile = localStorage.getItem("profile");
    if (profile) {
        const { vaiTro } = JSON.parse(profile);
        console.log(vaiTro);
        if (vaiTro === "admin") {
            $("#btnAddToCart").attr("disabled", true);
            $("#btn-checkout").attr("disabled", true);
        }
    }
};

disableButton();
handleGetName();
handleScroll();
