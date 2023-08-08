// <------------------------> Search <---------------------------->
function Search() {
    $.post(
        "http://localhost:3000/management/searchbill",
        {
            month: $("#month").val(),
        },
        (data, status) => {
            result = ``;
            for (let i = 0; i < data.length; i++) {
                result += `<tr class="content-table">
        <td class="px-[20px] py-[20px] text-center">${data[i].maHD}</td>
        <td class="px-[20px] py-[20px] text-center">${data[i].userName}</td>
        <td class="px-[20px] py-[20px] text-center">$${data[i].tongTien}</td>
        <td class="px-[20px] py-[20px] text-center">
          <div>
          <i class="fa-regular fa-eye icon "></i>
          </div>
        </td>
      </tr>`;
            }
            $("#content-bill").html(result);
        }
    );
}
// <------------------------> Product <---------------------------->
function getProduct() {
    $.get("http://localhost:3000/management/getproduct", function (data, status) {
        let result = "";
        for (let i = 0; i < data.length; i++) {
            result += `
      <tr class="content-table">
                <td class="px-[20px] py-[20px] text-center">${data[i].maSP}</td>
                <td class="px-[20px] py-[20px] text-center">
                  <div class="flex justify-center items-center">
                    <img
                      src="${data[i].hinhAnh}"
                      alt=""
                      class="w-[100px] h-[100px] rounded-3xl"
                    />
                  </div>
                </td>
                <td class="px-[20px] py-[20px] text-center">${data[i].tenSP}</td>
                <td class="px-[20px] py-[20px] text-center">$${data[i].giaTien}</td>
                <td class="px-[20px] py-[20px] text-center">
                  <div>
                    <i class="fa-regular fa-pen-to-square icon text-[blue]" onclick="upLoadProduct(${data[i].maSP},'${data[i].tenSP}',
                      ${data[i].giaTien},
                     '${data[i].hinhAnh}',
                      '${data[i].moTa}'
                    )"></i>
                    <i class="fa-solid fa-trash icon text-[red]" onclick="Delete(${data[i].maSP})"></i>
                  </div>
                </td>
              </tr>
      `;
        }
        $("#content-Product").html(result);
    });
}
function upLoadProduct(idSP, tenSP, giaTien, hinhAnh, moTa) {
    $("#idSP").val(idSP);
    $("#Name").val(tenSP);
    $("#Price").val(giaTien);
    $("#Image").val(hinhAnh);
    $("#Description").val(moTa);
}
function Update() {
    if ($("#Name").val() == "" || $("#Price").val() == "" || $("#Image").val() == "" || $("#Description").val() == "") {
        alert("Lack of information");
    } else {
        $.post(
            "http://localhost:3000/management/update",
            {
                id: $("#idSP").val(),
                name: $("#Name").val(),
                price: $("#Price").val(),
                image: $("#Image").val(),
                description: $("#Description").val(),
            },
            (data, status) => {
                getProduct();
                alert(data.message);
            }
        );
    }
}
function Insert() {
    if ($("#Name").val() == "" || $("#Price").val() == "" || $("#Image").val() == "" || $("#Description").val() == "") {
        alert("Lack of information");
    } else {
        $.post(
            "http://localhost:3000/management/insert",
            {
                name: $("#Name").val(),
                price: $("#Price").val(),
                image: $("#Image").val(),
                description: $("#Description").val(),
            },
            (data, status) => {
                $("#Name").val(null);
                $("#Image").val(null);
                $("#Price").val(null);
                $("#Description").val(null);
                getProduct();
                alert(data.message);
            }
        );
    }
}
function Delete(id) {
    if (confirm("Do you delete this product ?") == true) {
        $.post(
            "/management/delete",
            {
                id: id,
            },
            (data, status) => {
                alert(data.message);
            }
        );
    } else {
        return;
    }
}
$(document).ready(function () {
    getProduct();
    getServices();
});

function Tab(namePage) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(namePage).style.display = "block";
}

// <-----------------------> Services <------------------------------>
function getServices() {
    $.get("http://localhost:3000/management/getservices", function (data, status) {
        let result = "";
        for (let i = 0; i < data.length; i++) {
            result += `
      <tr class="content-table">
                <td class="px-[20px] py-[20px] text-center">${data[i].maDV}</td>
                <td class="px-[20px] py-[20px] text-center">${data[i].tenDV}</td>
                <td class="px-[20px] py-[20px] text-center">$${data[i].giaDV}</td>
                <td class="px-[20px] py-[20px] text-center">${data[i].moTa}</td>
                <td class="px-[20px] py-[20px] text-center">
                  <div>
                    <i class="fa-regular fa-pen-to-square icon text-[blue]" onclick="upLoadServices(${data[i].maDV},'${data[i].tenDV}',${data[i].giaDV},'${data[i].moTa}')"></i>
                    <i class="fa-solid fa-trash icon text-[red]" onclick="deleteServices(${data[i].maDV})"></i>
                  </div>
                </td>
              </tr>
      `;
        }
        $("#content-Services").html(result);
    });
}
function upLoadServices(id, tenDV, giaDV, moTa) {
    $("#idDV").val(id);
    $("#tenDV").val(tenDV);
    $("#giaDV").val(giaDV);
    $("#motaDV").val(moTa);
}
function updateServices() {
    if ($("#idDV").val() == "" || $("#tenDV").val() == "" || $("#giaDV").val() == "" || $("#motaDV").val() == "") {
        alert("Lack of information");
    } else {
        $.post(
            "http://localhost:3000/management/updateservices",
            {
                id: $("#idDV").val(),
                name: $("#tenDV").val(),
                price: $("#giaDV").val(),
                description: $("#motaDV").val(),
            },
            (data, status) => {
                getServices();
                alert(data.message);
            }
        );
    }
}
function insertServices() {
    if ($("#tenDV").val() == "" || $("#giaDV").val() == "" || $("#motaDV").val() == "") {
        alert("Lack of information");
    } else {
        $.post(
            "http://localhost:3000/management/insertservices",
            {
                id: $("#idDV").val(),
                name: $("#tenDV").val(),
                price: $("#giaDV").val(),
                description: $("#motaDV").val(),
            },
            (data, status) => {
                $("#Name").val(null);
                $("#Image").val(null);
                $("#Price").val(null);
                $("#Description").val(null);
                getServices();
                alert(data.message);
            }
        );
    }
}
function deleteServices(id) {
    if (confirm("Do you delete this services ?") == true) {
        $.post(
            "/management/deleteservices",
            {
                id: id,
            },
            (data, status) => {
                alert(data.message);
            }
        );
    } else {
        return;
    }
}
