function openTab(evt, divName) {
    var tabcontent = document.getElementsByClassName("grid__content-right");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    var tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(divName).style.display = "block";
    evt.currentTarget.className += " active";
}

function loadModal() {
    const showModal = document.getElementById("myModal");
    const btnCancel = document.getElementById("btnCancel");
    const btnOk = document.getElementById("btnOk");
    showModal.style.display = "flex";
    btnCancel.onclick = function () {
        showModal.style.display = "none";
    };
    btnOk.onclick = function () {
        checkPassword();
    };
}

function logOut() {
    localStorage.removeItem("UserName");
    document.cookie = "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.replace("/login");
}

function changePassword() {
    let storage = JSON.parse(localStorage.getItem("UserName"));
    $.post(
        "http://localhost:3000/user/changePassword",
        {
            passWord: $("#afterPass").val(),
            newPass: $("#newPass").val(),
            tenTK: storage.tenTK,
        },
        function (data, status) {
            if (data == "success") {
                alert("Change password successfully");
                window.location.reload();
            } else {
                alert("Password change failed");
            }
        }
    );
}

function checkPassword() {
    var passWord = $("#afterPass").val().replace(/ /g, "");
    var newPass = $("#newPass").val().replace(/ /g, "");
    if (passWord == "" || newPass == "") {
        $("#afterPass").css("border-color", "red");
        $("#newPass").css("border-color", "red");
    } else {
        changePassword();
    }
}

function onchangeAfterPass() {
    var passWord = $("#afterPass").val();
    if (passWord == "") {
        $("#afterPass").css("border-color", "red");
    } else {
        $("#afterPass").css("border-color", "#ab8e66");
    }
}

function onchangeNewPass() {
    var newPass = $("#newPass").val();
    if (newPass == "") {
        $("#newPass").css("border-color", "red");
    } else {
        $("#newPass").css("border-color", "#ab8e66");
    }
}

function updateInfoUser() {
    const { userName } = JSON.parse(localStorage.getItem("profile"));
    $.post("/profile/update", {
        userName,
        fullName: $("#fullName").val(),
        phone: $("#phone").val(),
        address: $("#address").val(),
        gender: $("input[name=gender]:checked").val(),
        date: $("#date").val(),
    })
        .then((res) => {
            alert(res.message);
            localStorage.setItem("profile", JSON.stringify(res.data));
            window.location.href = "/profile";
        })
        .catch((err) => {
            console.log(err);
        });
}

function loadDetailBill(id) {
    $.post(
        "http://localhost:3000/user/getDetailBills",
        {
            MaHD: id,
        },
        function (data, status) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                var dt = $(`
                    <tr class="modal__bill-trbody">
                        <td class="modal__bill-td"><img src="/images/${data[i].HinhSP}" alt="item" class="modal__bill-img" /></td>
                        <td class="modal__bill-td">${data[i].TenSP}</td>
                        <td class="modal__bill-td">x${data[i].SL}</td>
                        <td class="modal__bill-td">$${data[i].ThanhTien}</td>
                    </tr> 
                `);
                $("#listDetailBill").append(dt);
            }
            $("#date-create").html(moment(data[0].NgayDat).format("DD-MM-YYYY"));
            if (data[0].MaKM == null) {
                $("#coupon-id").html("No code");
            } else {
                $("#coupon-id").html(data[0].MaKM);
            }
            $("#total-bill-detail").html(data[0].TongTien);
            $("#maHoaDon").html("#" + data[0].MaHD);
        }
    );
}

function loadModalBill(id) {
    const showModal = document.getElementById("myModal-bill");
    const btnExit = document.getElementById("btnExit");
    showModal.style.display = "flex";
    btnExit.onclick = () => {
        showModal.style.display = "none";
        $(".modal__bill-trbody").remove();
    };
    loadDetailBill(id);
}

const hanldeProjected = () => {
    let profile = localStorage.getItem("profile");
    if (profile) {
        const { vaiTro } = JSON.parse(profile);
        if (vaiTro == "admin") {
            window.location.href = "/";
        }
    } else {
        window.location.href = "/login";
    }
};
hanldeProjected();

$(document).ready(function () {
    document.getElementById("defaultOpen").click();

    $("#checkboxid").on("change", function () {
        if ($(this).prop("checked")) {
            $(".modal-input").attr("type", "text");
        } else {
            $(".modal-input").attr("type", "password");
        }
    });

    function loadInfoCustomer() {
        let profile = localStorage.getItem("profile");
        if (profile) {
            let { userName } = JSON.parse(profile);
            $.post("/profile/info", { userName })
                .then((res) => {
                    let data = res.data;
                    $("#userName").html(data.userName);
                    $("#fullName").val(data.hoTen);
                    $("#fullNameDisplay").html(data.hoTen);
                    $("#phone").val(data.soDienThoai);
                    $("#address").val(data.diaChi);
                    if (data.gioiTinh == "1") {
                        $("#male-radio").attr("checked", "checked");
                    } else {
                        $("#female-radio").attr("checked", "checked");
                    }
                    let birthday = moment(data.ngaySinh).format("YYYY-MM-DD");
                    $("#date").val(birthday);
                    $("#userNameModal").html(data.userName);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    loadInfoCustomer();

    function setMax() {
        let date = moment().format("YYYY-MM-DD");
        $("#date").attr("max", date);
    }
    setMax();

    // function loadBills() {
    //     let storage = JSON.parse(localStorage.getItem("UserName"));
    //     $.post(
    //         "http://localhost:3000/user/getBills",
    //         {
    //             tenTK: storage.tenTK,
    //         },
    //         function (data, status) {
    //             if (data.length == 0 || data == undefined) {
    //                 var dt = $(`
    //                     <tr>
    //                         <td>No orders</td>
    //                         <td></td>
    //                         <td></td>
    //                         <td></td>
    //                         <td></td>
    //                     </tr>
    //                     `);
    //                 $("#listBills").append(dt);
    //             } else {
    //                 for (let i = 0; i < data.length; i++) {
    //                     var dt = $(`
    //                         <tr>
    //                             <td>${data[i].MaHD}</td>
    //                             <td>${moment(data[i].NgayDat).format("DD-MM-YYYY")}</td>
    //                             <td>${data[i].SoSanPham}</td>
    //                             <td><span>$</span>${data[i].TongTien}</td>
    //                             <td>
    //                                 <button onclick="loadModalBill(${data[i].MaHD})" class="btn-detail-bill">View Detail</button>
    //                             </td>
    //                         </tr>
    //                     `);
    //                     $("#listBills").append(dt);
    //                 }
    //             }
    //         }
    //     );
    // }
    // loadBills();
});
