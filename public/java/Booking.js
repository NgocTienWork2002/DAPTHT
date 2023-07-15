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
        $(".page-title-section").css("margin-top", "97px");
    } else {
        $(".navbar").css({
            position: "relative",
        });
        $(".page-title-section").css("margin-top", "0px");
    }
});
function ModalHien(){
    if($('#input').val() == ''){
        document.getElementById('input').style.border = 'red solid 3px'
    }
    else{
        document.getElementById('id01').style.display='block'
    }
}
function HienThiPrice(){
    content = `Đặt cọc : 300.000 VND`
    document.getElementById('Money').innerText = content
}
function Alert(){
    if($('#STK').val() == ''){
        document.getElementById('STK').style.border = 'red solid 1px'
    }
    else{
        document.getElementById('id01').style.display='none'
        swal("Thanh toán thành công!", "Hẹn gặp bạn tại trung tâm của chúng tôi!", "success");
    }
}