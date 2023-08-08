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

const handleProjected = () => {
    let profile = localStorage.getItem("profile");
    if (profile) {
        window.location.href = "/";
    }
};

handleProjected();

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

const validateInputSignUp = (userName, passWord, confirmPassword) => {
    let valid = true;
    if (userName === "") {
        document.getElementById("UNError").innerText = "Username không được để trống";
        valid = false;
    }
    // else if (!userName.match(/^\s*$/)) {
    //     document.getElementById("UNError").innerText = "Username không được khoảng cách";
    //     valid = false;
    // }
    if (passWord === "") {
        document.getElementById("PWError").innerText = "Password không được để trống";
        valid = false;
    } else if (passWord.length <= 6) {
        document.getElementById("PWError").innerText = "Password phải lớn hơn 6 ký tự";
        valid = false;
    }

    if (confirmPassword === "") {
        document.getElementById("confirmPWError").innerText = "Confirm password không được để trống";
        valid = false;
    } else if (confirmPassword !== passWord) {
        document.getElementById("confirmPWError").innerText = "Confirm password không khớp";

        valid = false;
    }
    return valid;
};

const signUp = () => {
    signU = $("#UserNameSignUp").val();
    signP = $("#PasswordSign").val();
    signCF = $("#PasswordConfSign").val();

    if (validateInputSignUp(signU, signP, signCF)) {
        $.post("/sign", { signU, signP })
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
