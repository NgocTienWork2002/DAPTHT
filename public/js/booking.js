let serviceList = [];
$(document).ready(function () {
    function setDateToday() {
        let date = moment().format("YYYY-MM-DD");
        console.log(date);
        $("#dateInput").attr("min", date.toString());
    }
    setDateToday();
});

const renderService = (data) => {
    for (let i = 0; i < data.length; i++) {
        let html = $(`
            <option value="${data[i].maDV}">${data[i].tenDV}</option>
        `);
        $("#Select").append(html);
    }
};

const getService = () => {
    $.get("/booking/service")
        .then((res) => {
            serviceList = res.data;
            renderService(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

const handleBooking = (event) => {
    event.preventDefault();
    const formData = {
        fullName: $("#userNameInput").val(),
        phone: $("#phoneInput").val(),
        date: $("#dateInput").val(),
        time: $("#timeInput").val(),
        id: $("#Select").val(),
        tongtien: $("#priceInput").val(),
        userName: JSON.parse(localStorage.getItem("profile")).userName,
    };
    console.log(formData);
    $.post("/booking", { formData })
        .then((res) => {
            console.log(res);
            alert(res.message);
            window.location.href = "/booking";
        })
        .catch((err) => {
            console.log(err);
        });
};

const handleOnchange = (event) => {
    let id = event.target.value;
    const serviceFind = serviceList.find((service) => service.maDV == id);
    $("#priceInput").val(serviceFind.giaDV);
};

getService();
