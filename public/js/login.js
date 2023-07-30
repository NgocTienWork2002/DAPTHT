function Tab(evt, cityName) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabLogin");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

const validateInput = (userName, passWord) => {
    let valid = true;
    if (userName === "") {
        document.getElementById("userNameError").innerText = "Username không được để trống";
        valid = false;
    }
    if (passWord === "") {
        document.getElementById("passWordError").innerText = "Password không được để trống";
        valid = false;
    }
    return valid;
};

const handleFocus = (idInput) => {
    document.getElementById(idInput).innerText = "";
};

const login = () => {
    userName = $("#userNameInput").val();
    passWord = $("#passWordInput").val();
    if (validateInput(userName, passWord)) {
        $.post("/login", { userName, passWord })
            .then((res) => {
                alert(res.message);
                const profile = res.data;
                localStorage.setItem("profile", JSON.stringify(profile));
                if (profile.vaiTro === "user") {
                    window.location.href = "/";
                } else {
                    window.location.href = "/management";
                }
            })
            .catch((err) => {
                alert(err.responseJSON.message);
            });
    }
};

const register = () => {
    userName = $("#userNameInput").val();
    passWord = $("#passWordInput").val();
    if (validateInput(userName, passWord)) {
        $.post("/login", { userName, passWord })
            .then((res) => {
                alert(res.message);
                const profile = res.data;
                localStorage.setItem("profile", JSON.stringify(profile));
                if (profile.vaiTro === "user") {
                    window.location.href = "/";
                } else {
                    window.location.href = "/management";
                }
            })
            .catch((err) => {
                alert(err.responseJSON.message);
            });
    }
};
