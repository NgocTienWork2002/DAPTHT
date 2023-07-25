function Tab(evt, cityName) {
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabLogin");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
