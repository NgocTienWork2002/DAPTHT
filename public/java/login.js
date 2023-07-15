function btnCancel(){
    openPage('Home')
}
// Đăng ký ................

$(document).ready(()=>{
  document.getElementById('Home').style.display = "block";
})
// Bật 2 tab .............
function openPage(pageName) {
  if (pageName == 'Home'){
    document.getElementById(pageName).style.display = "block";
    document.getElementById('News').style.display = "none";
  }
  else if(pageName == 'News'){
    document.getElementById(pageName).style.display = "block";
    document.getElementById('Home').style.display = "none";
  }
}
// Đăng nhập ............
function login(){
  var User = $('.User').val()
  if(User == 'Khang123' & $('#Role').val() == 'Cus'){
    setTimeout(window.location.replace('../html/index.html'),4000)
  }
  else{
    window.location.replace('../html/manage.html')
  }
}
function SigUp(){
  swal("success!","Đăng Kí Thành Công");
  openPage('Home')
}