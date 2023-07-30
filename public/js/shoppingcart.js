var CART;

const renderCartEmpty = () => {
    let dt = $(`
        <tr>
            <td></td>
            <td>There are no items in your cart</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        `);
    $("#listSP").append(dt);
    $("#btn-checkout").css("display", "none");
    $("#btn-check-coupon").css("display", "none");
    $("#btn-remove-all").css("display", "none");
};

const renderCart = (cart) => {
    for (let i = 0; i < cart.length; i++) {
        let dt = $(`
            <tr class="product-tr">
            <td class="product-td-img">
                <div class="product-img">
                    <img src="${cart[i].hinhAnh}" alt="productImage" />
                </div>
            </td>
            <td class="product-td-name">
                <div class="product-name">${cart[i].tenSP}</div>
            </td>
            <td class="product-td-price" id="item-price">$${cart[i].giaTien}</td>
            <td class="product-td-count">
                <div class="count-container">
                    <div class="btn-count">
                        <i class="fa-solid fa-circle-minus" onclick="minus(${cart[i].maSP})"></i>
                    </div>
                    <span class="product-count" id="count-id">${cart[i].soLuong}</span>
                    <div class="btn-count">
                        <i class="fa-solid fa-circle-plus" onclick="plus(${cart[i].maSP})"></i>
                    </div>
                    
                </div>
            </td>
            <td class="product-td-price"><span id="total-price">$${cart[i].thanhTien}</span></td>
            <td class="product-td-delete"><i class="fa-solid fa-trash-can" onclick="reMove(${cart[i].maSP})"></i></td>
            </tr>
        `);
        $("#listSP").append(dt);
    }
};

const callApi = (cart) => {
    $.post("/shoppingcart/cart", { cart: JSON.parse(cart) })
        .then((res) => {
            $("#listSP").empty();
            renderCart(res.data.cart);
            CART = res.data;
            $("#cart-total-price").html("$" + res.data.totalAmount);
            $("#total-bill").html("$" + res.data.totalAmount);
        })
        .catch((err) => {
            console.log(err);
        });
};

const getCart = () => {
    let cart = localStorage.getItem("cart");
    if (cart !== null) {
        callApi(cart);
    } else {
        renderCartEmpty();
    }
};

// Xóa sản phẩm
function reMove(id) {
    id = parseInt(id);
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart.splice(i, 1);
        }
    }
    if (cart.length == 0) {
        localStorage.removeItem("cart");
    } else {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    window.location.reload();
}

// Xóa tất cả giỏ hàng
const removeAll = () => {
    localStorage.removeItem("cart");
    window.location.replace("/shoppingcart");
};

// Tăng số lượng sản phẩm
function plus(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newCart = cart.map((item) => {
        if (item.id == id) {
            if (item.quantity < 10) {
                return {
                    ...item,
                    quantity: Number(item.quantity) + 1,
                };
            }
            return item;
        }
        return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    callApi(JSON.stringify(newCart));
}

// Giảm số lượng sản phẩm
function minus(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newCart = cart.map((item) => {
        if (item.id == id) {
            if (item.quantity > 1) {
                return {
                    ...item,
                    quantity: Number(item.quantity) - 1,
                };
            }
            return item;
        }
        return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    callApi(JSON.stringify(newCart));
}

function loadModal(isMode) {
    const showModal = document.getElementById("myModal");
    if (isMode) {
        showModal.style.display = "flex";
    } else {
        showModal.style.display = "none";
    }
}

const checkOut = () => {
    const profile = localStorage.getItem("profile");
    if (!profile) {
        window.location.href = "/login";
    } else {
        const userName = JSON.parse(profile).userName;
        let date = moment().format("YYYY-MM-DD");
        let bill = {
            userName,
            ...CART,
            date,
        };
        loadModal(true);
        setTimeout(() => {
            loadModal(false);
            $.post("/shoppingcart/checkout", { bill })
                .then((res) => {
                    alert(res.message);
                    localStorage.removeItem("cart");
                    window.location.href = "/shop";
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 3000);
    }
};

getCart();
